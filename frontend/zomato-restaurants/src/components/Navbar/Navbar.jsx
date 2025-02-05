import "./Navbar.css";

function Navbar(){
    return (
        <div className='navbar_container'>
            <a href="/" className="navbar_home"> Home </a>
            <div className="navbar_links">
                <a href="/restaurantslist" className="navbar_link"> RestaurantsList </a>
                <a href="/searchfilters" className="navbar_link"> Searchfilters </a>
            </div>
        </div>
    );
}

export default Navbar;