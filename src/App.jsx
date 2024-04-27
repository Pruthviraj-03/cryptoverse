import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Homepage, CryptoDetails, Cryptocurrencies, News, Exchanges } from './Components';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>3
      <div className="main">
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        {/* <div className="footer">
          <h5 style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br />
            All rights reserved
          </h5>
          <div style={{ textAlign: 'center' }}>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default App;
