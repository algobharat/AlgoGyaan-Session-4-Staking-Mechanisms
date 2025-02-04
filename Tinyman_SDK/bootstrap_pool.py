# This sample is provided for demonstration purposes only.
# It is not intended for production use.
# This example does not constitute trading advice.
from pprint import pprint
from urllib.parse import quote_plus

from common import get_account, get_assets
from utils import get_algod
from tinyman.v2.client import TinymanV2TestnetClient



def boostrap_Pool():

    try :
        
        account = get_account()
        algod = get_algod()
        client = TinymanV2TestnetClient(algod_client=algod, user_address=account["address"])

        # Fetch assets
        ASSET_A_ID, ASSET_B_ID = get_assets()["ids"]
        ASSET_A = client.fetch_asset(ASSET_A_ID)
        ASSET_B = client.fetch_asset(ASSET_B_ID)

        # Fetch the pool
        pool = client.fetch_pool(ASSET_A_ID, ASSET_B_ID)
        print(pool)

        # Get transaction group
        txn_group = pool.prepare_bootstrap_transactions()

        # Sign
        txn_group.sign_with_private_key(account["address"], account["private_key"])

        # Submit transactions to the network and wait for confirmation
        txn_info = client.submit(txn_group, wait=True)

        print("Transaction Info")
        pprint(txn_info)

        print(
            f"Check the transaction group on Algoexplorer: https://testnet.algoexplorer.io/tx/group/{quote_plus(txn_group.id)}"
        )

        return {"Created Pool" : str(pool)}

    except Exception as e :
        return {"Error" : str(e)}