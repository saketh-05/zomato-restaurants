import "./Navbar.css";

// Navbar component
function Navbar(){
    return (
        <div className='navbar_container'>
            <a href="/" className="navbar_home"> Home </a>
            <div className="navbar_links">
                <a href="/restaurantslist" className="navbar_link"> Restaurants List </a>
                <a href="/locationsearch" className="navbar_link"> Location Search </a>
            </div>
        </div>
    );
}

export default Navbar;