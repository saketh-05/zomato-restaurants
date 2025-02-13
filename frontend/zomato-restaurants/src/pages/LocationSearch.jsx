import { useState, useEffect, useRef } from "react";
import { searchByLocation } from "../api";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import "../styles/LocationSearch.css";

function LocationSearch() {
  const [showCard, setShowCard] = useState(false); // State to control whether to show the restaurant card or not
  const [restaurantsData, setRestaurantsData] = useState([]); // State to store the data of the restaurants
  const [latitude, setLatitude] = useState(0); // State to store the latitude input value
  const [longitude, setLongitude] = useState(0); // State to store the longitude input value
  const [numberOfRestaurants, setNumberOfRestaurants] = useState(0); // State to store the number of restaurants
  const [page, setPage] = useState(1); // State to store the page number for pagination
  const [totalPages, setTotalPages] = useState(0); // State to store the total number of restaurants

  const loadMoreRef = useRef(null);
  const pageRef = useRef(page);
  const totalPagesRef = useRef(totalPages);

  useEffect(() => {
    pageRef.current = page;
    totalPagesRef.current = totalPages;
  }, [page, totalPages]);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (pageRef.current > 1 && entries[0].isIntersecting) {
          if (pageRef.current <= totalPagesRef.current) {
            getRestaurantDataByScrolling(pageRef.current);
          } else {
            console.log("No more restaurants to load");
            alert("No more restaurants to load");
          }
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
      console.log("Observing:", loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log("Restaurants data updated - ", restaurantsData);
    console.log("Number of total pages - ", totalPages);
    console.log("Page - ", page);
  },[page,totalPages,restaurantsData]);

  useEffect(() => {
    setShowCard(false); // Hide the restaurant card when the component is mounted
    setRestaurantsData([]); // Reset the restaurants data state
    setNumberOfRestaurants(0); // Reset the number of restaurants state
    setPage(1); // Reset the page state
    setTotalPages(0); // Reset the total number of restaurants state
  }, [latitude, longitude]);

  const inputLatitude = (e) => {
    setLatitude(e.target.value); // Update the latitude state with the input value
  };

  const inputLongitude = (e) => {
    setLongitude(e.target.value); // Update the longitude state with the input value
  };

  const getRestaurantDataByScrolling = async (page) => {
    console.log(
      "Getting restaurant data by scrolling, pages- ",
      page,
    );
    const data = await searchByLocation(
      parseFloat(latitude),
      parseFloat(longitude),
      page
    );
    // Call the API to search for restaurants based on the provided latitude and longitude
    if (!data["restaurantData"] || data.error || data.message) {
      console.log("No more restaurant found with the given location - ", data);
      alert("No restaurant found with the given location", data.message);
      return;
    }
    console.log("This is the restaurants data - ", data.restaurantData);

    setRestaurantsData((prevData) => [...prevData, ...data.restaurantData]); // Update the restaurants data state with the retrieved data
    setNumberOfRestaurants(
      (prevCount) => prevCount + data.restaurantData.length
    ); // Update the number of restaurants state with the number of restaurants
    setPage((prevPage) => prevPage + 1); // Update the page state
  };

  const searchRestaurantByLocation = async () => {
    console.log("Searching for restaurant by location");
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
        parseFloat(longitude),
        page
      );
      // Call the API to search for restaurants based on the provided latitude and longitude
      if (
        !data["restaurantData"] ||
        data.error ||
        data["restaurantData"].length === 0
      ) {
        console.log("No restaurant found with the given location - ", data);
        alert("No restaurant found with the given location");
        return;
      }
      console.log("This is the restaurants data - ", data.restaurantData);
      setRestaurantsData(data.restaurantData); // Update the restaurants data state with the retrieved data
      setNumberOfRestaurants(data.restaurantData.length); // Update the number of restaurants state with the number of restaurants
      if (page === 1) {
        setTotalPages(Math.ceil(data.totalRestaurants / 10)); // Update the total number of restaurants state with the total number of restaurants
      }
      setShowCard(true); // Show the restaurant card
      setPage((prevPage) => prevPage + 1); // Update the page state

      console.log("Searched for restaurant by location");
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while searching for the restaurant, please try again."
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
      {showCard && (
        <div className='restaurant_count'>
          {" "}
          Found {numberOfRestaurants} restaurants
        </div>
      )}
      {showCard &&
        restaurantsData.map((res) => (
          <RestaurantCard
            key={res.restaurant.id}
            restaurantData={res.restaurant}
          />
        ))}
      <div ref={loadMoreRef} style={{ height: "20px" }}></div>
    </div>
  );
}

export default LocationSearch;
