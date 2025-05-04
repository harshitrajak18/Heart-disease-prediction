from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import joblib
import numpy as np
from django.conf import settings
import os

# Load the model once at server start
model_path = os.path.join(settings.BASE_DIR, 'prediction', 'ml model', 'naive_bayes_model.pkl')
model = joblib.load(model_path)

class HeartRiskPrediction(APIView):
    def post(self, request):
        try:
            data = request.data

            # Required fields based on your new schema
            required_fields = [
                'age',          # Age in years
                'sex',          # 1 = male, 0 = female
                'cp',           # Chest pain type (0–3)
                'trestbps',     # Resting blood pressure (mm Hg)
                'chol',         # Serum cholesterol (mg/dl)
                'fbs',          # Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
                'restecg',      # Resting ECG result (0–2)
                'thalach',      # Maximum heart rate achieved
                'exang',        # Exercise-induced angina (1 = yes; 0 = no)
                'oldpeak' ,      # ST depression induced by exercise relative to rest
                'slope',
                'ca',
                'thal'
            ]

            # Check for missing fields
            missing = [field for field in required_fields if field not in data]
            if missing:
                return Response({"error": f"Missing fields: {', '.join(missing)}"},
                                status=status.HTTP_400_BAD_REQUEST)

            # Prepare input data for model prediction
            input_data = [
                float(data['age']),
                int(data['sex']),
                int(data['cp']),
                float(data['trestbps']),
                float(data['chol']),
                int(data['fbs']),
                int(data['restecg']),
                float(data['thalach']),
                int(data['exang']),
                float(data['oldpeak']),
                int(data['slope']),
                int(data['ca']),
                int(data['thal'])
            ]

            # Make prediction
            prediction = model.predict([input_data])
            return Response({"heart_attack_risk": int(prediction[0])})

        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
