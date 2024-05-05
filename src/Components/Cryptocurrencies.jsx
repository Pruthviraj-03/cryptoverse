import React, { useState, useEffect } from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filterData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filterData);
  }, [searchTerm, cryptosList]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="cryptocurrencypage w-full">
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
        <div className="crypto-card-container flex flex-wrap h-full w-full p-5">
          {cryptos?.map((currency) => (
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <div className="cryptocard">
                <div className="firsthalf flex flex-row items-center justify-between mt-4 mb-4 h-1/4 w-full">
                  <span className="coinname font-medium h-5/6 w-9/12 pt-2 pl-4">
                    {`${currency.rank}. ${currency.name}`}{" "}
                  </span>
                  <div className="crypto-image w-1/5 h-90 overflow-hidden text-blue-500  mr-3">
                    <img
                      src={currency.iconUrl}
                      alt="Cryptocurrency"
                      className="coinicon w-full h-full object-contain"
                    />
                  </div>
                </div>
                <hr class="cryptoboxline" />
                <div className="cryptoinfo h-3/5 w-full p-5">
                  <p className="mb-1 text-sm tracking-wide">
                    Price: {millify(currency.price)}{" "}
                  </p>
                  <p className="mb-1 text-sm tracking-wide">
                    Market Cap: {millify(currency.marketCap)}
                  </p>
                  <p className="mb-1 text-sm tracking-wide">
                    Daily Change: {currency.change}%
                  </p>
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
