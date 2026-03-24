# Sign Language Master

## Overview

Sign Language Master is a real-time web-based platform that supports learning and recognizing sign language using AI. The system aims to improve communication between hearing-impaired users and the community through interactive learning and instant feedback.


## Features

* Real-time sign language recognition (A–Z)
* AI-powered gesture detection from webcam
* Interactive learning modules
* Progress tracking and evaluation
* Integrated chatbot for user interaction


## Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js / Python (Flask)
* **Database:** MySQL, MongoDB
* **AI/ML:** TensorFlow, PyTorch, Scikit-learn
* **Computer Vision:** OpenCV, MediaPipe
* **Realtime Communication:** WebSocket


## System Architecture

* **Frontend:** Captures webcam input and displays results
* **Backend:** Processes data and handles API requests
* **AI Module:** Performs gesture recognition
* **Database:** Stores user data and learning progress


## How It Works

1. Capture hand gestures via webcam
2. Extract features using MediaPipe
3. Process frames with OpenCV
4. Predict gesture using trained model
5. Return result to frontend in real-time


## Limitations

* Currently supports only alphabet-level recognition (A–Z)
* Limited dataset (mainly English)
* Performance depends on lighting and camera quality


## Future Improvements

* Word and sentence-level recognition
* Multi-language support
* Improved model accuracy
* Deployment on cloud for scalability


## Author

* **Name:** Quản Trọng Hùng
* **Role:** Full-stack Developer (Independent Project)


## Repository

GitHub: [https://github.com/Hunggg169/sign-language-master](https://github.com/Hunggg169/sign-language-master)
