import requests

url = "http://192.168.29.193:7777/"
step1 = "generate_Account"
step2 = "create_Asset"
step3 = "bootstrap_Pool"
step4 = "add_Liquidity"
step5 = "remove_Liquidity"


print("\n\n Step 1:-")
step1_response = requests.get(url= url+step1)
print(step1_response.json())


# print("\n\n Step 2:-")
# step2_response = requests.get(url= url+step2)
# print(step2_response.json())


# print("\n\n Step 3:-")
# step3_response = requests.get(url= url+step3)
# print(step3_response.json())

# print("\n\n Step 4:-")
# step4_response = requests.get(url= url+step4)
# print(step4_response.json())


# print("\n\n Step 5:-")
# step5_response = requests.get(url= url+step5)
# print(step5_response.json())