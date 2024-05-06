import React from "react";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import millify from "millify";
import Loader from "./Loader";

const Homepage = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  // console.log("Data:", data)

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="HomePage p-5 w-full">
        <h2 className="homeheading text-4xl font-semibold">
          Global Crypto Stats
        </h2>

        <div className="statscontainer grid grid-cols-2 grid-rows-3 gap-4 pt-2 tablet:mt-2 tablet:mb-2">
          <div className="homestats w-2/4 p-2.5 flex flex-col gap-3">
            <p className="text-lg text-gray-500">Total Cryptocurrencies</p>
            <span className="text-2xl" id="totalCrypto">
              {globalStats?.total}
            </span>
          </div>
          <div className="homestats w-2/4 p-2.5 flex flex-col gap-3">
            <p className="text-lg text-gray-500">Total Exchanges</p>
            <span className="text-2xl" id="totalExchanges">
              {millify(globalStats?.totalExchanges || 0)}
            </span>
          </div>
          <div className="homestats w-2/4 p-2.5 flex flex-col gap-3">
            <p className="text-lg text-gray-500">Total Market Cap</p>
            <span className="text-2xl" id="totalMarketCap">{`$${millify(
              globalStats?.totalMarketCap || 0
            )}`}</span>
          </div>
          <div className="homestats w-2/4 p-2.5 flex flex-col gap-3">
            <p className="text-lg text-gray-500">Total 24h Volume</p>
            <span className="text-2xl" id="total24hVolume">{`$${millify(
              globalStats?.total24hVolume || 0
            )}`}</span>
          </div>
          <div className="homestats w-2/4 p-2.5 flex flex-col gap-3">
            <p className="text-lg text-gray-500">Total Cryptocurrencies</p>
            <span className="text-2xl" id="totalCrypto2">
              {globalStats?.total}
            </span>
          </div>
          <div className="homestats w-2/4 p-2.5 flex flex-col gap-3">
            <p className="text-lg text-gray-500">Total Markets</p>
            <span className="text-2xl" id="totalMarkets">
              {millify(globalStats?.totalMarkets || 0)}
            </span>
          </div>
        </div>

        <div className="homeothercom">
          <div className="headingcontainer flex justify-between items-center mb-4">
            <h2 className="home-title text-3xl font-semibold mt-5">
              Top 10 Cryptos In The World
            </h2>
            <h3 className="show-more text-blue-500 text-xl font-semibold ml-auto mr-5 hover:underline">
              <Link to="/cryptocurrencies">Show more</Link>
            </h3>
          </div>
          <div className="crypto-boxs mt-8">
            <Cryptocurrencies simplified />
          </div>
        </div>

        <div className="homeothercom">
          <div className="headingcontainer flex justify-between items-center mb-4">
            <h2 className="home-title text-3xl font-semibold mt-5">
              Latest Crypto News
            </h2>
            <h3 className="show-more text-blue-500 text-xl font-semibold ml-auto mr-5 hover:underline">
              <Link to="/news">Show more</Link>
            </h3>
          </div>
          <div className="news-boxs mt-8">
            <News simplified />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
