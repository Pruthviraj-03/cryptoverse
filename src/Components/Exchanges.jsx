import React, { useState, useEffect } from 'react';
import axios from 'axios';
import millify from 'millify';
import Loader from "./Loader"

const Exchanges = () => {
  const [exchangesList, setExchangesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://coingecko.p.rapidapi.com/coins/markets',
          params: {
            vs_currency: 'usd',
            page: '1',
            per_page: '100',
            order: 'market_cap_desc'
          },
          headers: {
            'X-RapidAPI-Key': '08295af6edmsh25c9fc24b3b7d6fp1b591ejsn18d6e7fda81d',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        setExchangesList(response.data || []);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching exchanges:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchExchanges();
  }, []);

  if (isFetching) return <Loader />;

  return (
    <div className='exchangepage'>
      <div className="exchange-table">
        <div className="table-header">
          <div className="header-item">Exchanges</div>
          <div className="header-item">24h Trade Volume</div>
          <div className="header-item">Markets</div>
          <div className="header-item">Change</div>
        </div>

        {exchangesList.map((exchange, index) => (
          <div key={index} className="exchange-row">
            <div className="exchange-item-data">
              <strong>{index + 1}.</strong>
              <img className="exchange-item-logo" src={exchange.image} alt="" />
              <span>{exchange.name}</span>
            </div>
            <div className="exchange-total-volume">${millify(exchange.total_volume)}</div>
            <div className="exchange-trade-volume">{exchange.trade_volume}</div>
            <div className="exchange-market-cap">{millify(exchange.market_cap)}</div>
            <div className="exchange-price-change" style={{color: exchange.price_change_percentage_24h < 0 ? "red" : "green",fontWeight: 500}}>
              {exchange.price_change_percentage_24h >= 0 && "+"}{millify(Math.abs(exchange.price_change_percentage_24h), { precision: 2 })}%
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Exchanges;
