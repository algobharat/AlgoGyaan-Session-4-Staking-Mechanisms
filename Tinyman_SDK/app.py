from flask import Flask , request , jsonify
from flask_cors import CORS
import os

import generate_account 
import create_assets
import bootstrap_pool 
import add_initial_liquidity
import remove_liquidity

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def index():
    return "Server is Running !!!"


@app.route("/generate_Account" , methods = ['GET'])
def generate_Account():
    try:
        response = generate_account.generate_Account()
        return jsonify(response)
    except Exception as e:
        return {"Error" : e}

@app.route("/create_Asset" , methods = ['GET'])
def create_Asset():
    try:
        response = create_assets.create_Asset()
        return jsonify(response)
    except Exception as e:
        return {"Error" : e}


@app.route("/bootstrap_Pool" , methods = ['GET'])
def boostrap_Pool():
    try:
        response = bootstrap_pool.boostrap_Pool()
        return jsonify(response)
    except Exception as e:
        return {"Error" : e}
    


@app.route("/add_Liquidity" , methods = ['GET'])
def add_Liquidity():
    try:
        response = add_initial_liquidity.add_Liquidity()
        return jsonify(response)
    except Exception as e:
        return {"Error" : e}


@app.route("/remove_Liquidity" , methods = ['GET'])
def remove_Liquidity():
    try:
        response = remove_liquidity.remove_Liquidity()

        # After step 5 remove the accounts and asset file
        os.remove("account.json")
        os.remove("assets.json")

        return jsonify(response)
    except Exception as e:
        return {"Error" : e}


if __name__ == "__main__":

    app.run(host="0.0.0.0" , port=7777 , debug=True)