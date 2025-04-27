from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

# Create a Flask application instance
app = Flask(
    __name__,
    static_folder=os.path.join(os.getcwd(), "build"),
    template_folder=os.path.join(os.getcwd(), "build")
)
CORS(app)  # Enable CORS for all routes

# Weather API Key
WEATHER_API_KEY = "879ea4417af041b9a62210435250204"

@app.route('/api/weather', methods=['GET'])
def get_weather():
    location = request.args.get('location')  # Get location from query parameters
    days = request.args.get('days', default=7)  # Default to 7 days forecast

    # Check if location parameter is provided
    if not location:
        return jsonify({'error': 'location parameter is required'}), 400

    # Weather API URL
    weather_url = "http://api.weatherapi.com/v1/forecast.json"
    params = {
        'key': WEATHER_API_KEY,
        'q': location,
        'days': days,
        'alerts': 'yes'
    }
    try:
        # Make the API request
        response = requests.get(weather_url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        
        # Log the weather data for debugging purposes
        app.logger.debug(f"Weather data for {location}: {data}")
        
        return jsonify(data)  # Return the data to the client
    except requests.exceptions.HTTPError as http_err:
        app.logger.error(f"HTTP error occurred: {http_err}")  # Log the error
        return jsonify({'error': f"HTTP error occurred: {http_err}"}), response.status_code
    except Exception as err:
        app.logger.error(f"Other error occurred: {err}")  # Log general errors
        return jsonify({'error': f"Other error occurred: {err}"}), 500

# Serve React app (non-API routes)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # Serve static files for React app (index.html or other files)
    if path != "" and os.path.exists(os.path.join(app.template_folder, path)):
        return send_from_directory(app.template_folder, path)
    else:
        return send_from_directory(app.template_folder, 'index.html')

if __name__ == '__main__':
    app.logger.setLevel("DEBUG")  # Set log level to DEBUG for more detailed logging
    app.run(debug=True)  # Run the app in debug mode
