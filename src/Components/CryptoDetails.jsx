import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { Link, useParams } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';
import { FaDollarSign, FaSortNumericDown, FaChartBar, FaSignal, FaTrophy, FaChartPie, FaExchangeAlt, FaCheckCircle, FaBan, FaQuestionCircle } from 'react-icons/fa';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <FaDollarSign /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <FaSortNumericDown /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <FaChartBar /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <FaSignal /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <FaTrophy /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FaChartPie /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <FaExchangeAlt /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? 'Yes' : 'No', icon: cryptoDetails?.supply?.confirmed ? <FaCheckCircle /> : <FaBan /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <FaQuestionCircle /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <FaQuestionCircle /> },
  ];

  return (
    <>
      <div className="coin-detail-container">

        <div className="coin-heading-container">
          <h2 className="coin-name">{data?.data?.coin.name} ({data?.data?.coin.symbol}) Price</h2>
          <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </div>

        <div className='xline'></div>

        <select className="select-timeperiod" defaultValue="7d" onChange={(e) => setTimeperiod(e.target.value)}>
          {time.map((date) => <option key={date}>{date}</option>)}
        </select>

        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

        <div className="stats-container">
          <div className="coin-value-statistics">
            <div className="coin-value-statistics-heading">
              <h3 className="coin-details-heading">{cryptoDetails.name} Value Statistics</h3>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </div>
            {stats.map(({ title, value, icon }) => (
              <div className="coin-stats" key={title}>
                <div className="coin-stats-name">
                <div className='coin-stats-icon'>{icon}</div>
                  <span>{title}</span>
                </div>
                <span className="stats">{value}</span>
              </div>
            ))}
          </div>
          <div className="other-stats-info">
            <div className="coin-value-statistics-heading">
              <h3 className="coin-details-heading">Other Stats Info</h3>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </div>
            {genericStats.map(({ title, value, icon }) => (
              <div className="coin-stats" key={title}>
                <div className="coin-stats-name">
                <div className='coin-stats-icon'>{icon}</div>
                  <span>{title}</span>
                </div>
                <span className="stats">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="coin-desc-link">
          <div className="coin-desc">
            <h3 className="coin-details-heading">What is {cryptoDetails.name}?</h3>
            <p>{HTMLReactParser(cryptoDetails.description)}</p>
          </div>
          <div className="coin-links">
            <h3 className="coin-details-heading">{cryptoDetails.name} Links</h3>
            {cryptoDetails.links?.map((link) => (
              <div className="coin-link" key={link.name}>
                <h5>{link.type}</h5>
                <Link className="link-name" to={link.url} target="_blank" rel="noreferrer">{link.name}</Link>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CryptoDetails;
