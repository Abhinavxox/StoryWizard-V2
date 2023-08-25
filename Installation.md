# Installtion Guide

## Backend

### 1. Go to backend folder

```
cd backend
```

### 2. Create a .env file

```
cp .env.example .env
```

In the .env file, add your OpenAI API key and your LeapAI API key.

### 3. Create a virtual environment

```
python3 -m venv venv
```

### 4. Activate the virtual environment

```
source venv/bin/activate
```

### 5. Install the requirements

```
pip install -r requirements.txt
```

### Create database

```
python manage.py migrate
```

### Create migrations

```
python manage.py makemigrations
```

### Run the server

```
python manage.py runserver
```

## Frontend

### 1. Go to frontend folder

```
cd frontend
```

### 2. Install the dependencies

```
npm install
```

### 3. Run the server

```
npm start
```
