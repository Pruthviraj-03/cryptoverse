import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCoins, FaExchangeAlt, FaNewspaper } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((prevShowDrawer) => !prevShowDrawer);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div className="navcontainer p-5 text-white flex flex-col w-full tablet:flex-row">
      <div className="projectlogo flex flex-row">
        <img
          src={icon}
          alt="icon"
          className="projectlogoicon h-10 w-10 laptop:h-9 laptop:w-9 tablet:h-7 tablet:w-7 mobile:h-5 mobile:w-5"
        />
        <h2 className="logoname hover:text-blue-600 text-white font-bold text-3xl no-underline ml-4 tracking-wide laptop:text-2xl tablet:text-xl mobile:text-sm mobile:ml-2">
          <Link to="/">Cryptoverse</Link>
        </h2>
        <div className="menu-control-container tablet:hidden laptop:hidden pc:hidden">
          <button
            className="menu-button mobile:h-5 mobile:w-5 mobile:ml-44 mobile:cursor-auto"
            onClick={toggleDrawer}
          >
            <FiMenu />
          </button>
        </div>
      </div>
      <div
        className={`navitemlist w-full mt-8 tablet:flex tablet:flex-row tablet:mt-0 tablet:ml-40 mobile:mt-5 mobile:${
          showDrawer ? "block" : "hidden"
        }`}
      >
        <Link to="/" onClick={closeDrawer}>
          <div className="home hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0 mobile:hover:invisible mobile:items-center mobile:justify-center mobile:mb:0 mobile:h-5 mobile:pt-0">
            <span className="homeicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden mobile:text-sm">
              <FaHome />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white mobile:text-sm">
              Home
            </h3>
          </div>
        </Link>

        <Link to="/cryptocurrencies" onClick={closeDrawer}>
          <div className="cryptocurrencies hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0 mobile:hover:invisible mobile:items-center mobile:justify-center mobile:mb:0 mobile:h-5 mobile:pt-0">
            <span className="cryptocurrenciesicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden mobile:text-sm">
              <FaCoins />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white mobile:text-sm">
              Cryptocurrencies
            </h3>
          </div>
        </Link>

        <Link to="/exchanges" onClick={closeDrawer}>
          <div className="exchanges hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0 mobile:hover:invisible mobile:items-center mobile:justify-center mobile:mb:0 mobile:h-5 mobile:pt-0">
            <span className="exchangesicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden mobile:text-sm">
              <FaExchangeAlt />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white mobile:text-sm">
              Exchanges
            </h3>
          </div>
        </Link>

        <Link to="/news" onClick={closeDrawer}>
          <div className="news hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0 mobile:hover:invisible mobile:items-center mobile:justify-center mobile:mb:0 mobile:h-5 mobile:pt-0">
            <span className="newsicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden mobile:text-sm">
              <FaNewspaper />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white mobile:text-sm">
              News
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
