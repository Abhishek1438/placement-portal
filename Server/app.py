from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Load the trained model
model = joblib.load('../model/placement_model.sav')  # Ensure this file exists in the same directory

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON input
        data = request.json
        df = pd.DataFrame([data])  # Convert input to a DataFrame
        
        # Prediction
        likelihood = model.predict(df)
        return jsonify({"placement_likelihood": likelihood[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)  # Use debug=False in production
