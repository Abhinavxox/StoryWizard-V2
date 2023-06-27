from flask import Flask, jsonify, request
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/', methods=['GET'])
def home():
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"hi"}
        ]
    )
    content = completion.choices[0].message.content
    content = content.encode().decode('unicode_escape')
    title = content.split('\n')[0]
    title = title.replace('Title: ', '')
    res = content[content.find('\n'):]
    res = res.lstrip()

    return jsonify({'title': title, 'response': res})

if __name__ == '__main__':
  
    app.run(debug = True)