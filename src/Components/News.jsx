import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from './Loader';

const News = ({ simplified }) => {
  const maxArticles = simplified ? 10 : 50;
  const [newsList, setNewsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
          headers: {
            'X-RapidAPI-Key': '9aef9059acmsh2068ac5db003a28p198662jsn5df86e03f600',
            'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
          },
        };
        const response = await axios.request(options);
        const filteredNews = response.data.data
          .filter(news => news.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, maxArticles); // Limit the number of articles
        setNewsList(filteredNews);
        console.log('API response data:', response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNews();
  }, [searchTerm, maxArticles]);

  if (isFetching) return <Loader />;

  return (
    <div className='newspage'>
      <div className='news-container'>
        {!simplified && (
          <div className='searchcrypto'>
            <input
              type='text'
              placeholder='Search News'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <div className='news-grid'>
          {newsList.map((news, index) => (
            <Link key={index} to={news.url} target='_blank' rel='noreferrer'>
              <div className='news-card'>
                <div className='news-image-container'>
                  <h4 className='news-title'>{news.title}</h4>
                  <img src={news.thumbnail} alt='' />
                </div>
                <div className='news-desc'>
                  <p>{news.description}</p>
                </div>
                <div className='provider-container'>
                  <div className='news-provider-image'>
                    <img
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvo1c_r1js9iusKtr9n0SiwbsfmvCG3f4onHqxDVTomg&s'
                      alt=''
                    />
                  </div>
                  <span className='provider-name'>MNC</span>
                  <span className='time'>{moment(news.createdAt).fromNow()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
