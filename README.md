# Interactive Drawing Tool

# Description
Develop Interactive Drawing Tool is a web application that allows users to interactively draw shapes on a map. The frontend is built using Next.js and OpenLayers, and the backend is powered by Django to handle user interactions and store drawing data persistently.

# Table of Contents
- [Technologies](#Technologies)
- [Pre Requisites](#pre-requisites)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
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


## Frontend

- components/: React components for the drawing tools and toolbar.
- pages/: Next.js pages, including the main map view.
- styles/: CSS files are used to style the application.

## Backend

- api/: Django app containing models, views, serializers, and URLs for the API.

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
pip install -r requirements.txt
```
Apply migrations and create a superuser:
```
python manage.py migrate
python manage.py createsuperuser
```
Run the development server:
```
python manage.py runserver
```

# Screenshot
![screenshot](https://github.com/Mirza-Hassan/Next_py_Drawing_Tool/assets/17096257/87244ee3-0dfd-4245-a40d-a7e4ca9d60a0)


