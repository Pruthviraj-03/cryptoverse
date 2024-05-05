import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCoins, FaExchangeAlt, FaNewspaper } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navcontainer p-5 text-white flex flex-col w-full p-8">
      <div className="projectlogo flex flex-row">
        <img src={icon} alt="icon" className="projectlogoicon h-10 w-10" />
        <h2 className="logoname text-white font-bold text-3xl no-underline ml-4 tracking-wide">
          <Link to="/">Cryptoverse</Link>
        </h2>
        {/* <button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><RiMenu3Line /></button> */}
      </div>
      {activeMenu && (
        <div className="navitemlist w-full mt-8">
          <Link to="/">
            <div className="home flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg">
              <span className="homeicon text-lg text-gray-500 mt-1 mr-4">
                <FaHome />{" "}
              </span>
              <h3 className="navcomname">Home</h3>
            </div>
          </Link>

          <Link to="/cryptocurrencies">
            <div className="cryptocurrencies flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg">
              <span className="cryptocurrenciesicon text-lg text-gray-500 mt-1 mr-4">
                <FaCoins />{" "}
              </span>
              <h3 className="navcomname">Cryptocurrencies</h3>
            </div>
          </Link>

          <Link to="/exchanges">
            <div className="exchanges flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg">
              <span className="exchangesicon text-lg text-gray-500 mt-1 mr-4">
                <FaExchangeAlt />{" "}
              </span>
              <h3 className="navcomname">Exchanges</h3>
            </div>
          </Link>

          <Link to="/news">
            <div className="news flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg">
              <span className="newsicon text-lg text-gray-500 mt-1 mr-4">
                <FaNewspaper />{" "}
              </span>
              <h3 className="navcomname">News</h3>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
