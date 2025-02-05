import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Restaurant.css";


const RestaurantDetails = () => {
  // const { id } = useParams(); // Get restaurant ID from URL

  // Get the location object from react-router-dom
  const location = useLocation();

  // Get the restaurant data from the location state
  const restaurant = location.state?.restaurantData;

  // Log the restaurant data
  console.log("Restaurant Data in restaurant specific page: ", restaurant);

  // If no restaurant data is found, display an alert and return a message
  if (restaurant === undefined || restaurant === null) {
    alert("No restaurant found");
    return <div>No restaurant found</div>;
  }

  // Render the restaurant details
  return (
    <div className='restaurant-container'>
      <div className='restaurant-details'>
        <h1>{restaurant["Restaurant Name"]}</h1>
        <p className='rating'>
          ⭐ {restaurant["Aggregate rating"]} ({restaurant["Rating text"]})
        </p>
        <p className="rating-votes">
          {restaurant["Votes"]} votes
        </p>
        <p className='cuisines'>Cuisines: <i>{restaurant["Cuisines"]}</i></p>
        <p className='address'>
          {restaurant["Address"]}
        </p>
        <p className="country-code">
          🌍 Country Code: {restaurant["Country Code"]}
        </p>
        <p className="location">
          📍 Location: {restaurant["Longitude"]}, {restaurant["Latitude"]}
        </p>
        <p className='price'>
          💰Average Price for Two: {restaurant["Currency"]}{" "}
          {restaurant["Average Cost for two"]}
        </p>
      </div>
    </div>
  );
};

export default RestaurantDetails;
