import "./RestaurantCard.css";

function RestaurantCard({ name, rating, ratingText, locality, cuisines}){
    return(
        <div className='restaurant-card'>   
            <div className='restaurant-card-container'>
                <h2 className='restaurant-card-title'>
                    {name}
                </h2>
                <div className='restaurant-card-rating'>
                    <span className='restaurant-card-rating-number'>
                        {rating}
                    </span>
                    <span className='restaurant-card-rating-text'>
                        {ratingText}
                    </span>
                </div>
                <p className='restaurant-card-cuisines'>
                    {cuisines}
                </p>
                <p className='restaurant-card-locality'>
                    {locality}
                </p>
            </div>
        </div>
    )
}

export default RestaurantCard;