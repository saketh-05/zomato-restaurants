import restaurantById from "../api";
import { useState } from "react";
import "../styles/Home.css";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";

function Home() {
  const [id, setId] = useState("");
  const [restaurantData, setRestaurantData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const inputID = (e) => {
    setId(e.target.value);
    console.log(id);
  };
  const searchRestaurantById = async () => {
    try {
      let pattern = /^[0-9]+$/;
      if (!pattern.test(id)) {
        alert("Please enter a valid Restaurant ID");
        return;
      }
      const data = await restaurantById(id);
      console.log(data["Restaurant Data"]);
      setRestaurantData(data["Restaurant Data"]);
      setShowCard(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='home'>
        <div className='home_container'>
          <div className='home_title'>
            Zomato Restaurant Listing and Searching
          </div>
          <p className='home_description'>
            This is a simple web application that allows you to search for
            restaurants based on Restaurant_ID, location (latitude and
            longitude), and cuisine. You can also view the details of a specific
            restaurant. Feel free to explore!
          </p>
        </div>
        <div className='home_search'>
          <p className='home_restaurant_by_id'>
            Enter the Restaurant ID below to search for a specific restaurant.
          </p>
          <div className='search_by_id_container flex gap-3'>
            <input
              type='text'
              placeholder='Search for a restaurant by ID...'
              className='restaurant_search_by_id p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out opacity-50 place-content-start placeholder-amber-100 min-w-75'
              onChange={inputID}
            />
            <button
              className='search_by_id_button bg-white text-white font-semibold py-2 px-4 rounded-md hover:bg-white transition duration-200 ease-in-out transform hover:scale-105'
              onClick={searchRestaurantById}
            >
              Search
            </button>
          </div>
        </div>
        {showCard && (
          <RestaurantCard
            name={restaurantData["Restaurant Name"]}
            rating={restaurantData["Aggregate rating"]}
            ratingText={restaurantData["Rating text"]}
            locality={restaurantData["Locality"]}
            cuisines={restaurantData["Cuisines"]}
          />
        )}
      </div>
    </>
  );
}

export default Home;
