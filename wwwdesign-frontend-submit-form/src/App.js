import React, { useState } from 'react';
import Header from './components/Header.js';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home.js'
import NewBook from './pages/NewBook.js'
import Statistics from './pages/Statistics.js'
import './styles.css'
import ScannerService from './services/ScannerService.js';

function App() {
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate();

  const handleScanSuccess = (scannedBookDetails) => {
    setBookDetails(scannedBookDetails);
    console.log("scan success" + scannedBookDetails);
    navigate('/new-book'); // Redirect to the NewBook page after scanning
  };

  return (
    <div>
      <Header/>    
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/new-book" element={<NewBook bookDetails={bookDetails}/>} />
        <Route path="/scanner" element={ <ScannerService updateForm={handleScanSuccess} />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes> 
    </div>
  );
}

export default App;
