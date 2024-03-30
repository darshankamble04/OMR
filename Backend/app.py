# app.py

from flask import Flask, request, jsonify
import cv2  # For image processing
import numpy as np  # For numerical operations
import os
import omr_processing
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained machine learning model
model = cv2.ml.KNearest_create()
model.load('path_to_model_file')  # Update with the path to your model file

# Define function to process uploaded image
def process_image(image_path):
        omrpath = os.listdir("static/omr_sheets/")
        answerpath = os.listdir("static/answer/")

        if (len(omrpath)!=0 and len(answerpath)!=0):
            filepath = "static/result/ans.csv"
            csv_file = os.listdir("static/answer/")
            csv_path = "static/answer/" + str(csv_file[0])
            df = pd.read_csv(csv_path)
            qno = df.qno.to_list()
            q=len(qno)
            print(omr_processing.omr_calculation_1(image_path))
          
 


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'answerSheet' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['answerSheet']

    # Save the uploaded file temporarily
    upload_dir = 'uploads'
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    file.save(file_path)

    # Process the uploaded file
    result = omr_processing.omr_calculation_1(file_path)
    print(result)
    # Return the result
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)