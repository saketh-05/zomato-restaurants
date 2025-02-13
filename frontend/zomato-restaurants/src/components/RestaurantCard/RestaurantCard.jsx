import "./RestaurantCard.css";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurantData }) {
  const navigate = useNavigate();
  //  console.log("Restaurant Data in Restaurant Card: ", restaurantData);
  // console.log("Restaurant Data in Restaurant Card: ", restaurantData, "and specific errors for this are - " , restaurantData.restaurant, " - ", restaurantData.restaurant);
  //   Function to redirect to the restaurant page
  const redirectToRestaurantPage = () => {
    navigate(`/restaurant/${restaurantData.id}`, {
      state: { restaurantData },
    });
  };
  const cuisineImages = {
    Burger: "../../../default-burger.jpg",
  };

  const getDefaultImage = (cuisine) => {
    return cuisineImages[cuisine] || "../../../default-restaurant.jpg";
  };
  return (
    <div className='restaurant-card' onClick={redirectToRestaurantPage}>
      <div className='restaurant-card-image'>
        <img
          src={
            restaurantData.featured_image ||
            getDefaultImage(restaurantData.cuisines.split(",")[0])
          }
          alt={restaurantData.name}
          onError={(e) =>
            (e.target.src = getDefaultImage(
              restaurantData.cuisines.split(",")[0]
            ))
          }
        />
      </div>
      <div className='restaurant-card-container'>
        <h2 className='restaurant-card-title'>{restaurantData.name}</h2>
        <div className='restaurant-card-rating'>
          <span className='restaurant-card-rating-number'>
            {restaurantData.user_rating.aggregate_rating}
          </span>
          <span className='restaurant-card-rating-text'>
            {restaurantData.user_rating.rating_text}
          </span>
        </div>
        <p className='restaurant-card-cuisines'>{restaurantData.cuisines}</p>
        <p className='restaurant-card-locality'> 
          {restaurantData.location.locality_verbose}
        </p>
        <p className='restaurant-card-averagecost'> Average Cost for two: {" "}
          {restaurantData.currency} {restaurantData.average_cost_for_two}
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;
