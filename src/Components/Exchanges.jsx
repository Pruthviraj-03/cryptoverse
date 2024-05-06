import React, { useState, useEffect } from "react";
import axios from "axios";
import millify from "millify";
import Loader from "./Loader";

const Exchanges = () => {
  const [exchangesList, setExchangesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://coingecko.p.rapidapi.com/coins/markets",
          params: {
            vs_currency: "usd",
            page: "1",
            per_page: "100",
            order: "market_cap_desc",
          },
          headers: {
            "X-RapidAPI-Key":
              "08295af6edmsh25c9fc24b3b7d6fp1b591ejsn18d6e7fda81d",
            "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
          },
        };
        const response = await axios.request(options);
        setExchangesList(response.data || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchExchanges();
  }, []);

  if (isFetching) return <Loader />;

  return (
    <div className="exchangepage w-full flex items-center justify-center">
      <div className="exchange-table w-11/12 border-collapse ml-2 laptop:mb-5 tablet:mb-5">
        <div className="table-header flex mt-4">
          <div className="header-item flex-1 p-4 text-center font-bold">
            Exchanges
          </div>
          <div className="header-item flex-1 p-4 text-center font-bold">
            24h Trade Volume
          </div>
          <div className="header-item flex-1 p-4 text-center font-bold">
            Markets
          </div>
          <div className="header-item flex-1 p-4 text-center font-bold">
            Change
          </div>
        </div>

        {exchangesList.map((exchange, index) => (
          <div
            key={index}
            className="exchange-row flex items-center justify-center flex-row border border-gray-300 w-11/12 mt-1 mb-1 ml-9 bg-gray-200 cursor-pointer tablet:ml-5"
          >
            <div className="exchange-item-data w-2/5 flex flex-row bg-gray-200 p-2 pl-6 text-center cursor-pointer gap-4">
              <strong>{index + 1}.</strong>
              <img
                className="exchange-item-logo h-8 w-8 rounded-full"
                src={exchange.image}
                alt=""
              />
              <span>{exchange.name}</span>
            </div>
            <div className="exchange-total-volume w-1/4">
              ${millify(exchange.total_volume)}
            </div>
            <div className="exchange-trade-volume">{exchange.trade_volume}</div>
            <div className="exchange-market-cap flex items-center justify-center h-full w-1/4 pr-12">
              {millify(exchange.market_cap)}
            </div>
            <div
              className="exchange-price-change flex items-center pl-20 justify-center h-full w-1/4 laptop:pl-9 tablet:pl-6"
              style={{
                color:
                  exchange.price_change_percentage_24h < 0 ? "red" : "green",
                fontWeight: 500,
              }}
            >
              {exchange.price_change_percentage_24h >= 0 && "+"}
              {millify(Math.abs(exchange.price_change_percentage_24h), {
                precision: 2,
              })}
              %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
