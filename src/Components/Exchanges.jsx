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
              "801cfd6090msh43ba5a116c51f0ep1004f8jsna6de03eee58b",
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
      <div className="exchange-table w-11/12 border-collapse ml-2 laptop:mb-5 tablet:mb-5 mobile:mb-3 mobile:ml-0 mobile:overflow-x-hidden mobile:w-full">
        <div className="table-header flex mt-4 mobile:mt-0 mobile:ml-3">
          <div className="header-item flex-1 p-4 text-center font-bold mobile:text-sm">
            Exchanges
          </div>
          <div className="header-item flex-1 p-4 text-center font-bold mobile:text-sm">
            24h Trade Volume
          </div>
          <div className="header-item flex-1 p-4 text-center font-bold mobile:text-sm">
            Markets
          </div>
          <div className="header-item flex-1 p-4 text-center font-bold mobile:text-sm">
            Change
          </div>
        </div>

        {exchangesList.map((exchange, index) => (
          <div
            key={index}
            className="exchange-row flex items-center justify-center flex-row border border-gray-300 w-11/12 mt-1 mb-1 ml-9 bg-gray-200 cursor-pointer tablet:ml-5 mobile:ml-1.5"
          >
            <div className="exchange-item-data w-2/5 flex flex-row bg-gray-200 p-2 pl-6 text-center cursor-pointer gap-4 mobile:pl-2 mobile:gap-1">
              <strong className="mobile:text-sm">{index + 1}.</strong>
              <img
                className="exchange-item-logo h-8 w-8 rounded-full mobile:h-5 mobile:w-5"
                src={exchange.image}
                alt=""
              />
              <span className="mobile:text-sm">{exchange.name}</span>
            </div>
            <div className="exchange-total-volume w-1/4 mobile:text-sm mobile:pl-10">
              ${millify(exchange.total_volume)}
            </div>
            <div className="exchange-trade-volume mobile:text-sm">
              {exchange.trade_volume}
            </div>
            <div className="exchange-market-cap flex items-center justify-center h-full w-1/4 pr-12 mobile:text-sm mobile:pl-10">
              {millify(exchange.market_cap)}
            </div>
            <div
              className="exchange-price-change flex items-center pl-20 justify-center h-full w-1/4 laptop:pl-9 tablet:pl-6 mobile:text-sm"
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
