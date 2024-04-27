import React, { useState ,useEffect } from 'react';
import millify from 'millify';
import { useGetCryptosQuery } from "../services/cryptoApi"
import { Link } from "react-router-dom"
import Loader from "./Loader"

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins)

    const filterData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filterData)

  }, [searchTerm, cryptosList])
  
  if (isFetching) return <Loader />;

  return (
    <>
      <div className='cryptocurrencypage'>
        {!simplified && (
          <div className="searchcrypto">
            <input 
            type="text" 
            placeholder="Search Cryptocurrency"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        )}
        <div className="crypto-card-container">
          {cryptos?.map((currency) => (
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`} >
              <div className="cryptocard">
                <div className='firsthalf'>
                  <span className='coinname'>{`${currency.rank}. ${currency.name}`} </span>
                  <div className="crypto-image">
                    <img src={currency.iconUrl} alt="Cryptocurrency" className='coinicon' />
                  </div>
                </div>
                <hr class="cryptoboxline" />
                <div className="cryptoinfo">
                  <p>Price: {millify(currency.price)} </p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cryptocurrencies;

