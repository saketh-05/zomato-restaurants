// Importing necessary components and pages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LocationSearch from "./pages/locationSearch";
import RestaurantsList from "./pages/RestaurantsList";
import Restaurant from "./pages/Restaurant";
import Navbar from "./components/Navbar/Navbar";

// Defining the App component
function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/locationsearch' element={<LocationSearch />} />
          <Route path='/restaurantslist' element={<RestaurantsList />} />
          <Route path='/restaurant/:id' element={<Restaurant />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
        <footer className='footer text-white text-lg'>
          <p className='footer_text'>Made by {"Saketh D.Surya"}</p>
          <p className='footer_text'>Assignment provided by Mr.Rohini Sir</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
