from flask import Flask, request, jsonify
import numpy as np
import joblib
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

modelPath = "../actfl_proficiency_classifier/trained_models/proficiency_classifier.joblib"
model = joblib.load(modelPath)

client = OpenAI(api_key=os.getenv("TOGETHER_API_KEY"), base_url=os.getenv("BASE_URL"))

@app.route("/", methods=["GET"])
def home():
    return jsonify("WELCOME"), 200

@app.route("/predict_prof", methods=["POST"])
def predict_prof():
    try:
        # Get data from request as JSON
        data = request.get_json()
        userText = data["text"]

        prediction = model.predict(userText)
        # Convert to List to be able to jsonify
        predictionList = prediction.tolist() if isinstance(prediction, np.ndarray) else prediction

        response = {
            "prediction": predictionList
        }
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generate_response", methods=["POST"])
def generate_response():
    try:
        data = request.get_json()
        messages = data["messages"]

        response = client.chat.completions.create(
            messages=messages,
            temperature=0,
            model="NousResearch/Nous-Hermes-2-Yi-34B"
        )

        responseJSON = {
            "role": response.choices[0].message.role,
            "content": response.choices[0].message.content
        }
            
        return jsonify(responseJSON), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()