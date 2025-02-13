import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Restaurant.css";

const RestaurantDetails = () => {
  // Get the location object from react-router-dom
  const location = useLocation();

  // Get the restaurant data from the location state
  const resData = location.state?.restaurantData;

  // Log the restaurant data
  console.log("Restaurant Data in restaurant specific page: ", resData);

  // If no restaurant data is found, display an alert and return a message
  if (resData === undefined || resData === null) {
    alert("No restaurant found");
    return <div>No restaurant data received </div>;
  }
  const cuisineImages = {
    Burger: "../../../default-burger.jpg",
  };

  const getDefaultImage = (cuisine) => {
    return cuisineImages[cuisine] || "../../../default-restaurant.jpg";
  };

  return (
    <div className='restaurant-container'>
      {/* Restaurant Image */}
      <img
        src={
          resData.featured_image || resData.thumb ||
          getDefaultImage(resData.cuisines.split(",")[0])
        }
        alt={resData.name}
        className='restaurant-container-image'
        onError={(e) =>
          (e.target.src = getDefaultImage(resData.cuisines.split(",")[0]))
        }
      />

      {/* Restaurant Info */}
      <div className='restaurant-container-info'>
        {/* Name & Rating */}
        <div className='restaurant-container-info-name-rating-container'>
          <h1 className='restaurant-container-info-name'>{resData.name}</h1>
          <p className='restaurant-container-info-rating'>
            ⭐ {resData.user_rating.aggregate_rating} (
            {resData.user_rating.rating_text})
          </p>
        </div>
        <p className='restaurant-container-info-votes'>{resData.user_rating.votes} votes</p>

        {/* Cuisines & Price */}
        <p className='restaurant-container-cuisines'>
          🍽️ <strong>Cuisines:</strong> <i>{resData.cuisines}</i>
        </p>
        <p className='restaurant-container-avgcost'>
          💰 <strong>Avg. Cost for Two:</strong> {resData.currency}{" "}
          {resData.average_cost_for_two}
        </p>

        {/* Detailed Location Info */}
        <div className='restaurant-container-location'>
          <p className='restaurant-container-location-address'>
            <strong>📌 Address:</strong> {resData.location.address}
          </p>
          <p className='restaurant-container-location-locality'>
            <strong>🏙️ Locality:</strong> {resData.location.locality_verbose}
          </p>
          <p className='restaurant-container-location-city'>
            <strong>🌍 City:</strong> {resData.location.city}
          </p>
          <p className='restaurant-container-location-coordinates'>
            <strong>📍 Coordinates:</strong> {resData.location.latitude},{" "}
            {resData.location.longitude}
          </p>
        </div>

        {/* Additional Info */}
        <p className='restaurant-container-onlinedelivery'>
          🚚 <strong>Online Delivery:</strong>{" "}
          {resData.has_online_delivery ? "Available ✅" : "Not Available ❌"}
        </p>
        <p className='restaurant-container-tablebook'>
          📅 <strong>Table Booking:</strong>{" "}
          {resData.has_table_booking ? "Available ✅" : "Not Available ❌"}
        </p>

        {/* Buttons for Menu & Website */}
        <div className='restaurant-container-menu-container'>
          <a
            href={resData.menu_url}
            target='_blank'
            rel='noopener noreferrer'
            className='restaurant-container-menu-link'
          >
            📜 View Menu
          </a>
          <a
            href={resData.url}
            target='_blank'
            rel='noopener noreferrer'
            className='restaurant-container-website-link'
          >
            🔗 Visit Restaurant
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
