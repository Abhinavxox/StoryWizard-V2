from flask import Flask, jsonify, request
import openai
import os
from dotenv import load_dotenv
from pymongo import MongoClient

app = Flask(__name__)
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
mongodb_url = os.getenv('MONGODB_URL')
database_name = os.getenv('DATABASE_NAME')
mongodb_client = MongoClient(mongodb_url)
db = mongodb_client[database_name]

def createStory(topic):
    # completion = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "user", "content": f"hi"}
    #     ]
    # )
    # content = completion.choices[0].message.content
    # content = content.encode().decode('unicode_escape')
    # title = content.split('\n')[0]
    # title = title.replace('Title: ', '')
    # res = content[content.find('\n'):]
    # res = res.lstrip()
    
    # document = {'title': "Hello", 'response': "Some story about Hello"}
    # collection = db['Stories'] 
    # collection.insert_one(document)

    try:
        mongodb_client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)



@app.route('/', methods=['GET'])
def home():
    createStory('Lion')
    return jsonify({'message' : "Thankyou saved succesfully"})

if __name__ == '__main__':
    app.run(debug = True)