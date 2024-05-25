# Interactive Drawing Tool

# Description
Develop Interactive Drawing Tool is a web application that allows users to interactively draw shapes on a map. The frontend is built using Next.js and OpenLayers, and the backend is powered by Django to handle user interactions and store drawing data persistently.

# Table of Contents
- [Technologies](#Technologies)
- [Pre Requisites](#pre-requisites)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Testing](#api-testing)
- [Screenshot](#screenshot)

# Technologies

- Frontend: Next.js, OpenLayers
- Backend: Django, Django REST framework

# Pre Requisites

- Node.js and npm installed
- Python and pip installed
- Django and Django REST framework installed

# Folder Structure!

![fs](https://github.com/Mirza-Hassan/Next_py_Drawing_Tool/assets/17096257/6bf980c5-0ba0-414c-a631-ad3c54d57143)


# Setup Instructions

Clone the repository:
```
git clone https://github.com/Mirza-Hassan/Next_py_Drawing_Tool.git
```
## Frontend:

Navigate to the frontend directory:
```
cd frontend
```
Install dependencies:
```
npm install
```
Start the development server:
```
npm run dev
```

## Backend:

Navigate to the backend directory:
```
cd backend
```
Install dependencies: (Optional)
```
pip install django djangorestframework 
pip install django-cors-headers        
```
Configuring settings.py  (Optional)

Add the installed apps to your INSTALLED_APPS:
```
INSTALLED_APPS = [
    ...
    'rest_framework',
    'drawings',
    'corsheaders',
]
```
Running Migrations (Optional)
```
python manage.py makemigrations
python manage.py migrate
```
Create a superuser to access the admin panel: (Optional)
```
python manage.py createsuperuser
```
Run the development server:
```
python manage.py runserver
```
Test your API endpoint:

With the development server running, navigate to http://localhost:8000/api/shapes/

# API Testing 

You can test the API endpoints using tools like Postman or curl file.

Create a new shape: 

**URL**: /api/shapes/

**Method**: POST

**Body Parameters:**

- shape_type (string): Type of shape (e.g., "star").
- geometry (array): Coordinates as nested arrays.

**Request Example:**
```
curl --location 'http://localhost:8000/api/shapes/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW46MTIz' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NjAxMzAzLCJleHAiOjE3MTcwMzMzMDN9.aOVrlr9wq-Ht0cUNXFMi-Wy_8V8W_qj4txw7IxO-jKw; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NjAxMzAzLCJleHAiOjE3MTcwMzMzMDN9.aOVrlr9wq-Ht0cUNXFMi-Wy_8V8W_qj4txw7IxO-jKw' \
--data '{
      "shape_type": "circle",
      "geometry": [[
        [-73.935242, 40.730610],
        [-73.935242, 40.731610],
        [-73.934242, 40.731610],
        [-73.934242, 40.730610],
        [-73.935242, 40.730610]
      ]]
}'
```


# Screenshot
![screenshot](https://github.com/Mirza-Hassan/Next_py_Drawing_Tool/assets/17096257/87244ee3-0dfd-4245-a40d-a7e4ca9d60a0)


