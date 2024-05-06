import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";

const News = ({ simplified }) => {
  const maxArticles = simplified ? 10 : 50;
  const [newsList, setNewsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",
          headers: {
            "X-RapidAPI-Key":
              "801cfd6090msh43ba5a116c51f0ep1004f8jsna6de03eee58b",
            "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
          },
        };
        const response = await axios.request(options);
        const filteredNews = response.data.data
          .filter((news) =>
            news.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, maxArticles); // Limit the number of articles
        setNewsList(filteredNews);
        console.log("API response data:", response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNews();
  }, [searchTerm, maxArticles]);

  if (isFetching) return <Loader />;

  return (
    <div className="newspage w-full">
      <div className="news-container w-full">
        {!simplified && (
          <div className="searchcrypto laptop:ml-96 tablet:ml-72">
            <input
              type="text"
              placeholder="Search News"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <div className="news-grid">
          {newsList.map((news, index) => (
            <Link key={index} to={news.url} target="_blank" rel="noreferrer">
              <div className="news-card border border-gray-300 rounded-lg overflow-hidden w-full h-64 bg-white">
                <div className="news-image-container flex flex-row h-2/5 w-full p-3">
                  <h4 className="news-title w-2/3 h-full text-black text-base font-medium overflow-hidden">
                    {news.title}
                  </h4>
                  <img
                    className="w-3/10 h-full ml-10"
                    src={news.thumbnail}
                    alt=""
                  />
                </div>
                <div className="news-desc h-1/3	w-full overflow-hidden px-4">
                  <p className="w-full h-full text-sm font-medium">
                    {news.description}
                  </p>
                </div>
                <div className="provider-container flex items-center flex-row w-full h-1/5 p-2">
                  <div className="news-provider-image h-5/6 rounded-full overflow-hidden">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvo1c_r1js9iusKtr9n0SiwbsfmvCG3f4onHqxDVTomg&s"
                      alt=""
                    />
                  </div>
                  <span className="provider-name w-3/5 text-sm ml-2 font-medium">
                    MNC
                  </span>
                  <span className="time w-1/3 text-xs ml-6 font-medium">
                    {moment(news.createdAt).fromNow()}
                  </span>
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
