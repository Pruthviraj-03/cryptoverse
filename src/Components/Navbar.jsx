import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCoins, FaExchangeAlt, FaNewspaper } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  return (
    <div className="navcontainer p-5 text-white flex flex-col w-full tablet:flex-row">
      <div className="projectlogo flex flex-row">
        <img
          src={icon}
          alt="icon"
          className="projectlogoicon h-10 w-10 laptop:h-9 laptop:w-9 tablet:h-7 tablet:w-7"
        />
        <h2 className="logoname hover:text-blue-600 text-white font-bold text-3xl no-underline ml-4 tracking-wide laptop:text-2xl tablet:text-xl">
          <Link to="/">Cryptoverse</Link>
        </h2>
        {/* <button
          className="menu-control-container laptop:hidden pc:hidden"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <RiMenu3Line />
        </button> */}
      </div>
      <div className="navitemlist w-full mt-8 tablet:flex tablet:flex-row tablet:mt-0 tablet:justify-end">
        <Link to="/">
          <div className="home hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0">
            <span className="homeicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden">
              <FaHome />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white">Home</h3>
          </div>
        </Link>

        <Link to="/cryptocurrencies">
          <div className="cryptocurrencies hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0">
            <span className="cryptocurrenciesicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden">
              <FaCoins />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white">
              Cryptocurrencies
            </h3>
          </div>
        </Link>

        <Link to="/exchanges">
          <div className="exchanges hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0">
            <span className="exchangesicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden">
              <FaExchangeAlt />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white">
              Exchanges
            </h3>
          </div>
        </Link>

        <Link to="/news">
          <div className="news hover:bg-blue-600 flex flex-row cursor-pointer h-12 w-full rounded-lg mb-4 ml-0 pl-4 pt-2 pr-3 text-lg tablet:hover:invisible tablet:mb:0 tablet:h-1 tablet:pt-0">
            <span className="newsicon text-lg text-gray-500 mt-1 mr-4 tablet:hidden">
              <FaNewspaper />{" "}
            </span>
            <h3 className="navcomname text-gray-500 tablet:text-white">News</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
