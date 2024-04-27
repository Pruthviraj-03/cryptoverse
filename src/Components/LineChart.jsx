import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinStamp,
    datasets: [{
      label: 'Price in USD',
      data: coinPrice,
      fill: false,
      backgroundColor: '#0071bd',
      borderColor: '#0071bd',
    }],
  };

 const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="chart-header">
        <h2 className="chart-title">{coinName} Price Chart</h2>
        <div className="price-container">
          <h5 className="price-change">{coinHistory?.data?.change}%</h5>
          <h5 className="current-price">Current {coinName} Price: $ {currentPrice}</h5>
        </div>
      </div>
      {/* <Line data={data} options={options} /> */}
    </>
  );
};

export default LineChart;
