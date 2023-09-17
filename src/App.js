import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllRoutes from './Routes/AlllRoutes';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <AllRoutes/>
      <Footer /> 
    </div>
  );
}

export default App;
