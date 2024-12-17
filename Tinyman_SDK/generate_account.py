import json
import os
from algosdk.account import generate_account
from algosdk.mnemonic import from_private_key
from algokit_utils.account import get_account_from_mnemonic
from common import get_account_file_path
from algosdk import mnemonic , transaction , account
from algosdk.v2client.algod import AlgodClient




def generate_Account():
    try:
        account_file_path = get_account_file_path()

        try:
            size = os.path.getsize(account_file_path)
        except FileNotFoundError:
            size = 0
        else:
            if size > 0:
                raise Exception(f"The file({account_file_path}) is not empty")

        # private_key, address = generate_account()
        # mnemonic = from_private_key(private_key)

        # Fund the account , more funds are required which will can be handled by manual transation only

        # fund_Account(Address=address)

        mnemonic = "sudden abstract capable divide reject need floor often shadow celery tragic core barrel swallow opera math polar pudding sell episode alone firm organ able issue"
        User_account = get_account_from_mnemonic(mnemonic=mnemonic)

        private_key = User_account.private_key
        address = User_account.address

        account_data = {
            "address": address,
            "private_key": private_key,
            "mnemonic": mnemonic,
        }

        with open(account_file_path, "w", encoding="utf-8") as f:
            json.dump(account_data, f, ensure_ascii=False, indent=4)

        print(f"Generated Account: {address}")
        # Fund the account
        print(
            f"Go to https://bank.testnet.algorand.network/?account={address} and fund your account."
        )

        return {
            "Account created" : account_data,
            "Fund Account" :f"Go to https://bank.testnet.algorand.network/?account={address} and fund your account."
        }
    
    except Exception as e :
        return {"Error" : str(e)}



def fund_Account(Address):
    algod_token = "a" * 64
    algod_address = "https://testnet-api.algonode.cloud"

    algod_client = AlgodClient(algod_token=algod_token , algod_address=algod_address)

    master_mnemonic = "toss transfer sure frozen real jungle mouse inch smoke derive floor alter ten eagle narrow perfect soap weapon payment chaos amateur height estate absent cabbage"
    master_private_key = mnemonic.to_private_key(mnemonic=master_mnemonic)
    master_wallet_address = account.address_from_private_key(master_private_key)

    params = algod_client.suggested_params()

    amount = 1000000  # Amount in microAlgos (1 Algo = 1,000,000 microAlgos)

    txn = transaction.PaymentTxn(sender=master_wallet_address , receiver=Address ,sp= params , amt= amount)

    signed_txn = txn.sign(master_private_key)

    txid = algod_client.send_transaction(signed_txn)

    transaction.wait_for_confirmation(algod_client= algod_client , txid= txid)


    print("Payment completed !!!" , txid)