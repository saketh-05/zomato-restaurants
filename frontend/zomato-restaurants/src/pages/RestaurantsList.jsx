import { useEffect, useState } from "react";
import { restaurantsList } from "../api";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import "../styles/RestaurantsList.css";
import Pagination from "../components/Pagination/Pagination";

function RestaurantsList() {
  const [restaurantList, setRestaurantList] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const numPerPage = 10;

  // const sanitizeRestaurantsData = (restaurants) => {
  //     return restaurants.map((restaurant) => ({
  //       "Restaurant ID": restaurant["Restaurant ID"] ?? 0, // Ensure ID is present
  //       "Restaurant Name": restaurant["Restaurant Name"] ?? "Unknown",
  //       City: safeTextParse(restaurant["City"], "Unknown"),
  //       Address: safeTextParse(restaurant["Address"], "Unknown"),
  //       Locality: safeTextParse(restaurant["Locality"], "Unknown"),
  //       Cuisines:
  //         restaurant["Cuisines"] && typeof restaurant["Cuisines"] === "string"
  //           ? restaurant["Cuisines"]
  //           : "Unknown",
  //       "Aggregate rating": isNaN(restaurant["Aggregate rating"])
  //         ? 0
  //         : restaurant["Aggregate rating"],
  //       "Rating text": restaurant["Rating text"] ?? "Not Rated",
  //       Longitude: restaurant["Longitude"] ?? 0,
  //       Latitude: restaurant["Latitude"] ?? 0,
  //       Votes: restaurant["Votes"] ?? 0,
  //       "Country Code": restaurant["Country Code"] ?? "Unknown",
  //       Currency: restaurant["Currency"] ?? "Unknown",
  //       "Average Cost for two": restaurant["Average Cost for two"] ?? 0,
  //       Votes: restaurant["Votes"] ?? 0,
  //     }));
  //   };

  // const safeTextParse = (text, defaultValue = "") => {
  //   if (!text || typeof text !== "string") return defaultValue;

  //   try {
  //     return decodeURIComponent(text);
  //   } catch (error) {
  //     return defaultValue; // Return default if decoding fails
  //   }
  // };

  // const safeJsonParse = (jsonString) => {
  //   try {
  //     // Step 1: Replace all instances of `NaN` with `"null"` before parsing
  //     jsonString = jsonString.replace(/\bNaN\b/g, "null");

  //     // Step 3: Sanitize the parsed data
  //     return parsedData;
  //   } catch (error) {
  //     console.error("JSON Parsing Error:", error);
  //     return []; // Return an empty array to avoid crashes
  //   }
  // };

  console.log("This is separater btw comments - LOL🤣");

  // useEffect(() => {
  //   const fetch = async () => {
  //     restaurantsList().then((data) => {
  //       console.log("Fetched data before parsing - ", data);
  //       try {
  //         const parsedData = data["restaurantData"];
  //         setRestaurantList(parsedData);
  //         console.log("Fetched data - ", parsedData);
  //         const totalPages = Math.ceil(data["totalRestaurants"] / numPerPage);
  //         setTotalPages(totalPages);
  //         setPage(data.page);
  //       } catch (err) {
  //         console.error("Error occured - ", err);
  //       }
  //     });
  //   };
  //   fetch();
  //   console.log("Mounting fetch");
  // }, []);

  useEffect(() => {
    console.log("Fetching page - ", page);
    const get = async () => {
      try {
        restaurantsList(page, numPerPage).then((data) => {
          const parsedData = data["restaurantData"];
          console.log("Fetched data - ", parsedData);
          setRestaurantList([...  parsedData]);
          if (totalPages === 0) {
            const totalPages = Math.ceil(data["totalRestaurants"] / numPerPage);
            setTotalPages(totalPages);
          }
        });
        console.log("restaurants list - ", restaurantList); // need to remove
      } catch (err) {
        console.error("Error occured - ", err);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    get();
  }, [page]); // Runs whenever `page` changes

  const paginate = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages || pageNum === page) return;
    console.log("updating page to - ", pageNum);
    setPage(pageNum);
  };

  if (!restaurantList) return <h1>Loading...</h1>;

  return (
    <div className='restaurants-list-container'>
      <div className='restaurants-list'>
        {restaurantList.map((res) => (
          <RestaurantCard key={res.restaurant.id} restaurantData={res.restaurant} />
        ))}
      </div>
      <Pagination paginate={paginate} page={page} totalPages={totalPages} />
    </div>
  );
}

export default RestaurantsList;
