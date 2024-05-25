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

# Folder Structure

![fs](https://github.com/Mirza-Hassan/Next_py_Drawing_Tool/assets/17096257/cd68fe3b-9efb-4b20-a46e-4187d8574857)


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
Install dependencies:
```
pip install django djangorestframework
```
Create and apply migrations:

Ensure your database schema is up to date with your models by running the following commands:
```
python manage.py makemigrations
python manage.py migrate
```
Create a superuser to access the admin panel:
```
python manage.py createsuperuser
```
Run the development server:
```
python manage.py runserver
```
Test your API endpoint:

With the development server running, navigate to http://localhost:8000/api/shapes/. If you have populated data, it should be displayed here.

# API Testing 

You can test the API endpoints using tools like Postman or curl.

Create a new shape: POST /api/shapes/
```
{
      "shape_type": "circle",
      "geometry": [[
        [-73.935242, 40.730610],
        [-73.935242, 40.731610],
        [-73.934242, 40.731610],
        [-73.934242, 40.730610],
        [-73.935242, 40.730610]
      ]]
}
```


# Screenshot
![screenshot](https://github.com/Mirza-Hassan/Next_py_Drawing_Tool/assets/17096257/87244ee3-0dfd-4245-a40d-a7e4ca9d60a0)


