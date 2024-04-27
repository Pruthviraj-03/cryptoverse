import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCoins, FaExchangeAlt, FaNewspaper } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navcontainer">
      <div className="projectlogo">
        <img src={icon} alt="icon" className="projectlogoicon" />
        <h2 className="logoname"><Link to="/">Cryptoverse</Link></h2>
        {/* <button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><RiMenu3Line /></button> */}
      </div>
      {activeMenu && (
        <div className='navitemlist'>
          <Link to='/'>
            <div className='home'>
              <span className='homeicon'><FaHome/> </span>
              <h3 className='navcomname'>Home</h3>
            </div>
          </Link>

          <Link to="/cryptocurrencies">
            <div className='cryptocurrencies'>
              <span className='cryptocurrenciesicon'><FaCoins/> </span>
              <h3 className='navcomname'>Cryptocurrencies</h3>
            </div>
          </Link>
          
          <Link to="/exchanges">
            <div className='exchanges'>
              <span className='exchangesicon'><FaExchangeAlt/> </span>
              <h3 className='navcomname'>Exchanges</h3>
            </div>
          </Link>
          
          <Link to="/news">
            <div className='news'>
              <span className='newsicon'><FaNewspaper/> </span>
              <h3 className='navcomname'>News</h3>
            </div>
          </Link>
         
        </div>
      )}
    </div>
  );
};

export default Navbar;
