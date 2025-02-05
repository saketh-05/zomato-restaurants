[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/UOcNv8Zs)
# Project Assignment: Zomato Restaurant Listing & Searching
 
## Key Use Cases
 
### Data Loading
Create an independent script to load the Zomato restaurant data available [here](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) into a database.
 
### Web API Service
Develop a web API service with the following endpoints to serve the content loaded in the previous step:
  - **Get Restaurant by ID**: Retrieve details of a specific restaurant by its ID.
  - **Get List of Restaurants**: Fetch a list of restaurants with pagination support.
 
### User Interface
Develop a web application with the following pages, which must connect to the web API service:
  - **Restaurant List Page**: Display a list of restaurants. Clicking on a restaurant should navigate the user to the restaurant's detail page.
  - **Restaurant Detail Page**: Show details of a specific restaurant.
  - **Location search**: Search restaurants in given latitude and longitude range (e.g restaurants in 3 km of a given latitude and longitude)
  - **Image search**: Upload an image of a food like icecream, pasta etc., and search restaurants which offer those cuisines.

## Additional Use Cases (Optional)
If time allows, implement the following additional features, ensuring they are supported in both the API and the UI:
- **Filtering Options**:
  - By Country
  - By Average Spend for Two People
  - By Cuisines
- **Search Functionality**: Enable search for restaurants by name and description.

<br>

# Project Guide to Test

## Functionalities implemented
- Restaurant Search by ID
- Restaurant Search by Name
- Restaurant Search by Location
- Restaurants List with pagination

## Prerequisites
Before running the project, ensure you have the following installed:
- ✅ Node.js (Download: https://nodejs.org/)
- ✅ npm or yarn (Comes with Node.js)
- ✅ MongoDB/PostgreSQL (if using a database)
- ✅ Git (optional, for cloning the project)

## 📌 2. Running the Backend (API Service)
### 1️⃣ Clone the Repository
- git clone https://github.com/industry-ready-2026/webapp-saketh-05.git
- cd backend
### 2️⃣ Install Dependencies
- pip install -r requirements.txt

### 3️⃣ Start Backend Server
- uvicorn server:app --reload

## 3. Running the Frontend (UI)
### 1️⃣ Open a new terminal to run frontend 
### 2️⃣ Go to frontend folder
- cd frontend/zomato-restaurants
### 3️⃣ Install Dependencies
- npm install
## 4️⃣ Run the frontend server
- npm run dev
