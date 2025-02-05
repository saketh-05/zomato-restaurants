import "./RestaurantCard.css";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurantData }) {
  const navigate = useNavigate();
  
//   Function to redirect to the restaurant page
  const redirectToRestaurantPage = () => {
    navigate(`/restaurant/${restaurantData["Restaurant ID"]}`, {
      state: { restaurantData },
    });
  };

  return (
    <div className='restaurant-card' onClick={redirectToRestaurantPage}>
      <div className='restaurant-card-container'>
        <h2 className='restaurant-card-title'>
          {restaurantData["Restaurant Name"]}
        </h2>
        <div className='restaurant-card-rating'>
          <span className='restaurant-card-rating-number'>
            {restaurantData["Aggregate rating"]}
          </span>
          <span className='restaurant-card-rating-text'>
            {restaurantData["Rating text"]}
          </span>
        </div>
        <p className='restaurant-card-cuisines'>{restaurantData["Cuisines"]}</p>
        <p className='restaurant-card-locality'>{restaurantData["Locality"]}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;
