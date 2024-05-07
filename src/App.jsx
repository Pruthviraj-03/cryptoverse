import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Navbar,
  Homepage,
  CryptoDetails,
  Cryptocurrencies,
  News,
  Exchanges,
} from "./Components";
import "./index.css";

const App = () => {
  return (
    <div className="app bg-gray-100 flex flex-row w-full min-h-screen tablet:flex-col mobile:flex-col">
      <div className="navbar text-white w-1/5 min-h-screen fixed top-0 z-50 tablet:w-full tablet:min-h-1 mobile:w-full mobile:min-h-1">
        <Navbar />
      </div>
      <div className="main bg-gray-100 w-4/5 min-h-screen ml-96 laptop:ml-64 tablet:ml-0 tablet:mt-20 tablet:w-full mobile:ml-0 mobile:mt-20 mobile:w-full">
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/exchanges" element={<Exchanges />} />
            <Route
              exact
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </div>
        {/* Footer */}
        <div className="footer text-white p-4 tablet:w-full mobile:w-full">
          <h5 className="text-center">
            Cryptoverse <br />
            All rights reserved
          </h5>
          <div className="text-center mt-2">
            <Link to="/">Home</Link>
            <Link to="/exchanges" className="ml-4">
              Exchanges
            </Link>
            <Link to="/news" className="ml-4">
              News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
