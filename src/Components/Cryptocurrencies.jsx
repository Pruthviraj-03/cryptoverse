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
          <div className="searchcrypto laptop:ml-96 tablet:ml-72 mobile:ml-16 mobile:mt-3 mobile:w-2/3">
            <input
              type="text"
              placeholder="Search Cryptocurrency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <div className="crypto-card-container flex flex-wrap h-full w-full p-5 laptop:p-3 tablet:p-2 mobile:p-0">
          {cryptos?.map((currency) => (
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <div className="cryptocard laptop:h-48 laptop:w-56 laptop:mx-2 tablet:h-46 tablet:w-56 tablet:mx-1.5 mobile:h-44 mobile:w-40 mobile:mx-1">
                <div className="firsthalf flex flex-row items-center justify-between mt-4 mb-4 h-1/4 w-full mobile:h-1/6 mobile:mt-2">
                  <span className="coinname font-medium h-5/6 w-9/12 pt-2 pl-4 mobile:h-auto">
                    {`${currency.rank}. ${currency.name}`}{" "}
                  </span>
                  <div className="crypto-image w-1/5 h-auto overflow-hidden text-blue-500 mr-3 mobile:mt-3">
                    <img
                      src={currency.iconUrl}
                      alt="Cryptocurrency"
                      className="coinicon w-full h-full object-contain"
                    />
                  </div>
                </div>
                <hr class="cryptoboxline" />
                <div className="cryptoinfo h-3/5 w-full p-5 mobile:p-3 mobile:h-4/5">
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
