import { useState } from "react";
import { searchByLocation } from "../api";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import "../styles/LocationSearch.css";

function LocationSearch() {
  const [showCard, setShowCard] = useState(false); // State to control whether to show the restaurant card or not
  const [restaurantsData, setRestaurantsData] = useState([]); // State to store the data of the restaurants
  const [latitude, setLatitude] = useState(0); // State to store the latitude input value
  const [longitude, setLongitude] = useState(0); // State to store the longitude input value

  const inputLatitude = (e) => {
    setLatitude(e.target.value); // Update the latitude state with the input value
  };

  const inputLongitude = (e) => {
    setLongitude(e.target.value); // Update the longitude state with the input value
  };

  const searchRestaurantByLocation = async () => {
    try {
      if (!latitude || !longitude) {
        alert(
          "Please enter the latitude and longitude to search for a restaurant"
        );
        return;
      }

      console.log("Latitude: ", latitude, "Longitude: ", longitude);

      if (
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        alert("Invalid latitude/longitude. Must be between -90 and 90.");
        return;
      }

      const data = await searchByLocation(
        parseFloat(latitude),
        parseFloat(longitude)
      ); // Call the API to search for restaurants based on the provided latitude and longitude
      if (
        !data["Restaurants Data"] ||
        data.error ||
        data["Restaurants Data"].length === 0
      ) {
        console.log("No restaurant found with the given location - ", data);
        alert("No restaurant found with the given location");
        return;
      }
      console.log("This is the restaurants data - ", data["Restaurants Data"]);
      setRestaurantsData(data["Restaurants Data"]); // Update the restaurants data state with the retrieved data
      setShowCard(true); // Show the restaurant card
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while searching for the restaurant, please verify input and try again."
      );
      return;
    }
  };

  return (
    <div className='location_search'>
      <p className='location_restaurant_container'>
        Enter the Location co-ordinates below to search for a restaurants in a
        radius of 3km.
      </p>
      <div className='search_by_loc_container flex gap-3'>
        <p className='search_latitude'>Latitude: </p>
        <input
          type='number'
          placeholder='Enter the Latitude...'
          className='input_latitude'
          onChange={inputLatitude}
        />
        <p className='search_longitude'>Longitude: </p>
        <input
          type='number'
          placeholder='Enter the Longitude...'
          className='input_longitude'
          onChange={inputLongitude}
        />
        <button
          className='search_by_loc_button bg-white text-white font-semibold py-2 px-4 rounded-md hover:bg-white transition duration-200 ease-in-out transform hover:scale-105'
          onClick={searchRestaurantByLocation}
        >
          Search
        </button>
      </div>
      {showCard &&
        restaurantsData.map((restaurant) => (
          <RestaurantCard
            key={restaurant["Restaurant ID"]}
            restaurantData={restaurant}
          />
        ))}
    </div>
  );
}

export default LocationSearch;
