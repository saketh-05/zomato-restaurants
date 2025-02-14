import { restaurantById, restaurantByName } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";


function Home() {
  const navigate = useNavigate();
  let [input, setInput] = useState("");
  const [restaurantData, setRestaurantData] = useState([]);
  const [showCard, setShowCard] = useState(false);

  // Function to handle input change
  const inputID = (e) => {
    setInput(e.target.value);
    // console.log(input);
  };

  // Function to search restaurant by ID or Name
  const searchRestaurantByIdName = async () => {
    try {
      let patternID = /^[0-9]+$/;
      const patternName = /^[A-Za-z0-9&'-. ]+$/;
      let data = {};

      if (patternID.test(input)) {
        console.log("Input is a number (ID) - ", input); //need to remove
        data = await restaurantById(input);
      } else if (patternName.test(input)) {
        console.log("Input is a Name - ", input); //need to remove
        input = encodeURIComponent(input);
        data = await restaurantByName(input);
      } else {
        alert("Invalid input. Please enter a valid Restaurant ID or Name.");
        return;
      }

      console.log("This is the restaurant data - ", data["restaurantData"]); //need to remove

      if (!data["restaurantData"] || data.error || data.message) {
        console.log("No restaurant found with the given ID", data); //need to remove
        alert("No restaurant found with the given ID");
        return;
      }

      setRestaurantData(data["restaurantData"]);
      setShowCard(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching for the restaurant");
      navigate("/");
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
            Enter the Restaurant ID or Name below to search for a specific
            restaurant.
          </p>
          <div className='search_by_id_container flex gap-3'>
            <input
              type='text'
              placeholder='Search for a restaurant by ID or Name...'
              className='restaurant_search_by_id'
              onChange={inputID}
            />
            <button
              className='search_by_id_button bg-white text-white font-semibold py-2 px-4 rounded-md hover:bg-white transition duration-200 ease-in-out transform hover:scale-105'
              onClick={searchRestaurantByIdName}
            >
              Search
            </button>
          </div>
        </div>
        {showCard &&
          (Array.isArray(restaurantData) ? (
            restaurantData.map((res, index) => {
              return <RestaurantCard key={index} restaurantData={res.restaurant} />;
            })
          ) : (
            <RestaurantCard restaurantData={restaurantData.restaurant} />
          ))}
      </div>
    </>
  );
}

export default Home;
