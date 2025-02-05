import { useEffect, useState } from "react";
import { restaurantsList } from "../api";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import "../styles/RestaurantsList.css";

function RestaurantsList() {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const numPerPage = 10;
  try {
    const sanitizeRestaurantsData = (restaurants) => {
      return restaurants.map((restaurant) => ({
        "Restaurant ID": restaurant["Restaurant ID"] ?? 0, // Ensure ID is present
        "Restaurant Name": restaurant["Restaurant Name"] ?? "Unknown",
        City: safeTextParse(restaurant["City"], "Unknown"),
        Address: safeTextParse(restaurant["Address"], "Unknown"),
        Locality: safeTextParse(restaurant["Locality"], "Unknown"),
        Cuisines:
          restaurant["Cuisines"] && typeof restaurant["Cuisines"] === "string"
            ? restaurant["Cuisines"]
            : "Unknown",
        "Aggregate rating": isNaN(restaurant["Aggregate rating"])
          ? 0
          : restaurant["Aggregate rating"],
        "Rating text": restaurant["Rating text"] ?? "Not Rated",
        Longitude: restaurant["Longitude"] ?? 0,
        Latitude: restaurant["Latitude"] ?? 0,
        Votes: restaurant["Votes"] ?? 0,
        "Country Code": restaurant["Country Code"] ?? "Unknown",
        Currency: restaurant["Currency"] ?? "Unknown",
        "Average Cost for two": restaurant["Average Cost for two"] ?? 0,
        Votes: restaurant["Votes"] ?? 0,
      }));
    };

    const safeTextParse = (text, defaultValue = "") => {
      if (!text || typeof text !== "string") return defaultValue;

      try {
        return decodeURIComponent(text);
      } catch (error) {
        return defaultValue; // Return default if decoding fails
      }
    };

    const safeJsonParse = (jsonString) => {
      try {
        // Step 1: Replace all instances of `NaN` with `"null"` before parsing
        jsonString = jsonString.replace(/\bNaN\b/g, "null");

        // Step 2: Parse JSON safely
        const parsedData = JSON.parse(jsonString);

        // Step 3: Sanitize the parsed data
        return sanitizeRestaurantsData(parsedData);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        return []; // Return an empty array to avoid crashes
      }
    };

    useEffect(() => {
      const fetch = async () => {
        restaurantsList().then((data) => {
          console.log("Fetched data before parsing - ", data);
          try {
            const parsedData = safeJsonParse(data["Restaurants Data"]);
            setRestaurantList(parsedData);
            console.log("Fetched data - ", parsedData);
            const totalPages = Math.ceil(
              data["Total Restaurants"] / numPerPage
            );
            setTotalPages(totalPages);
          } catch (err) {
            console.error("Error occured - ", err);
          }
        });
      };
      fetch();
      console.log("Mounting fetch");
    }, []);

    useEffect(() => {
      console.log("Fetching page - ", page);
      const get = async () => {
        try {
          restaurantsList(page, numPerPage).then((data) => {
            const parsedData = safeJsonParse(data["Restaurants Data"]);
            setRestaurantList([...parsedData]);
          });
          console.log("Updated restaurants list - ", restaurantList);
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
  } catch (err) {
    console.error("Error occured - ", err);
    navigate("/");
  }
  if (!restaurantList) return <h1>Loading...</h1>;

  return (
    <div className='restaurants-list-container'>
      <div className='restaurants-list'>
        {restaurantList.map((restaurant) => (
          <RestaurantCard
            key={restaurant["Restaurant ID"]}
            restaurantData={restaurant}
          />
        ))}
      </div>
      {/* This is pagination rendering part */}
      <div className='pagination'>
        {(() => {
          const isMobile = window.matchMedia("(max-width: 768px)").matches;
          const pagesPerSet = isMobile ? 3 : 10; // Show 10 pages at a time
          const currentSet = Math.floor((page - 1) / pagesPerSet); // Determine the current set of 10 pages
          const startPage = currentSet * pagesPerSet + 1;
          const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

          return (
            <>
              {/* Previous Button (Disable if on first set) */}
              {currentSet > 0 && (
                <button onClick={() => paginate(startPage - 1)}>«</button>
              )}

              {startPage > pagesPerSet && (
                <button onClick={() => paginate(1)}>1</button>
              )}
              {startPage > pagesPerSet && <p>...</p>}

              {/* Render the pages dynamically */}
              {Array.from({ length: endPage - startPage + 1 }).map(
                (_, index) => (
                  <button
                    key={startPage + index}
                    className={page === startPage + index ? "active" : ""}
                    onClick={() => paginate(startPage + index)}
                  >
                    {startPage + index}
                  </button>
                )
              )}

              {/* Render the last page if not already rendered */}
              {endPage < totalPages && <p>...</p>}
              {endPage < totalPages && (
                <button onClick={() => paginate(totalPages)}>
                  {totalPages}
                </button>
              )}
              {/* Next Button (Disable if on last set) */}
              {endPage < totalPages && (
                <button onClick={() => paginate(endPage + 1)}>»</button>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}

export default RestaurantsList;
