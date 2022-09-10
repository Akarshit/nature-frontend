import requests
from pymongo import MongoClient
from time import sleep
import pycurl
from io import BytesIO 
import json

start = 0
SIZE = 1000
total = 20000
DATABASE_NAME = "nature"

def fetch_data(URL):
    b_obj = BytesIO() 
    crl = pycurl.Curl() 
    crl.setopt(crl.URL, URL)
    crl.setopt(crl.WRITEDATA, b_obj)
    crl.perform() 
    crl.close()
    get_body = b_obj.getvalue()
    return json.loads(get_body.decode('utf8'))

client = MongoClient('mongodb://localhost:27017/')
db = client[DATABASE_NAME]
outings_collection = db.outings

while start < total:
    REC_SEARCH_URL = f"https://www.recreation.gov/api/search?exact=false&size={SIZE}&start={start}"
    data = fetch_data(REC_SEARCH_URL)
    for outing in data["results"]:
        outings_collection.insert_one(outing).inserted_id
    start = start + SIZE
    total = data["total"]
    print(f"Completed {start}/{total}")
    sleep(5)

print("All done")
