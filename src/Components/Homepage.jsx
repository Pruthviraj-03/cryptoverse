import React from 'react';
import Cryptocurrencies from './Cryptocurrencies'
import News from "./News"
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Link } from 'react-router-dom'
import millify from 'millify';
import Loader from './Loader';

const Homepage = () => {

  const { data, isFetching, error } = useGetCryptosQuery(10)
  // console.log("Data:", data)

  if(error){
    console.log(error)
    return <div>Error: {error.message}</div>;
  }

  const globalStats = data?.data?.stats; 

  if(isFetching) return <Loader />

  return (
    <>
      <div className='HomePage'>

        <h2 className="homeheading">Global Crypto Stats</h2>

        <div className="statscontainer">
          <div className="homestats">
            <p>Total Cryptocurrencies</p><span id="totalCrypto">{globalStats?.total}</span>
          </div>
          <div className="homestats">
            <p>Total Exchanges</p><span id="totalExchanges">{millify(globalStats?.totalExchanges || 0)}</span>
          </div>
          <div className="homestats">
            <p>Total Market Cap</p><span id="totalMarketCap">{`$${millify(globalStats?.totalMarketCap || 0)}`}</span>
          </div>
          <div className="homestats">
            <p>Total 24h Volume</p><span id="total24hVolume">{`$${millify(globalStats?.total24hVolume || 0)}`}</span>
          </div>
          <div className="homestats">
            <p>Total Cryptocurrencies</p><span id="totalCrypto2">{globalStats?.total}</span>
          </div>
          <div className="homestats">
            <p>Total Markets</p><span id="totalMarkets">{millify(globalStats?.totalMarkets || 0)}</span>
          </div>
        </div>

        <div className="homeothercom">
          <div className='headingcontainer'>
            <h2 className="home-title">Top 10 Cryptos In The World</h2>
            <h3 className="show-more"><Link to="/cryptocurrencies">Show more</Link></h3>
          </div>
          <div className='crypto-boxs'>
            <Cryptocurrencies simplified />
          </div>
        </div>

        <div className="homeothercom">
          <div className='headingcontainer'>
            <h2 className="home-title">Latest Crypto News</h2>
            <h3 className="show-more"><Link to="/news">Show more</Link></h3>
          </div>
          <div className='news-boxs'>
            <News simplified />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Homepage;
