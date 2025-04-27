# CSI 3370 - Capstone Project (SmartWeather)

This project is a weather web application built using a Python Flask backend and a React frontend. The application allows users to search for a location and view current weather conditions, a 3-day forecast, and any active weather alerts with animated backgrounds based on the weather.

## Features
- Animated background that reflects the current weather
- Search by location (e.g., New York, NY or Tokyo, Japan)
- Displays current conditions, forecast, and weather alerts
- Clean and interactive UI using React
- Flask backend serving real-time weather data from WeatherAPI

## Requirements
- Python 3.7 or higher
- Node.js and npm
- Flask and necessary Python packages
- WeatherAPI key (set in the backend)

## Interaction
- Type a location into the search bar and press the Get Weather button.
- The app will then display:
    - Location name and current date
    - Current weather (temperature, condition, and icon)
    - 3-day forecast
    - Any active weather alerts
    - Animated background that reflects the current weather

| How to Run |
| ---------- |
| **__Step 1: Backend Setup__**
Open a terminal in the backend folder or navigate to it from the root folder via `cd backend`. <br> For first time setup, make sure pip is installed and run `pip install -r requirements.txt` and `pip install —upgrade flask`. <br> Run the backend via `python app.py server`. <br> The backend will then start operating on `http://localhost:5000`.
| **__Step 2: Frontend Setup__**
Open a terminal in the frontend folder or navigate to it from the root folder via `cd frontend`. <br> For first time setup, install Node dependencies via `npm install`. (If Node gives you errors, you may need to run additional commands.) <br> Run the frontend via `npm start`. <br> The frontend will then start operating on `http://localhost:3000` and open in your browser of choice.

| To view the demo included in this repository |
| ---------- |
Navigate to the demo file in the repo <br> Click on the file name to open its preview page. <br> Click the “View raw” button (located in the middle of the screen). <br> The demo will begin downloading automatically.

## Contributors
Anthony Al-khafaji @AnthonyAl-khafaji
Ali Jawad @abjmad
Austin Scruggs @Austin122002