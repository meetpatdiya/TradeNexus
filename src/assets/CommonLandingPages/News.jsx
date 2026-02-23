import React from "react";
//  YOU HAVE TO PUT THIS PAGE ON COMMON LANDING PAGE
import { useEffect } from "react";
import "./News.css";
import { useState } from "react";
import { fetchNews } from "../ApiServices/CryptoApiCalls";
const News = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews();
      setData(data);
    };
    getNews();
  }, []);
  if (!data.length) return <div className="news-loader"></div>;
  return (
    <div className="news-grid">
      {data &&
        data.length &&
        data.map((item, index) => {
          return (
            <div key={index} className={`news-card layout-${index % 10}`}>
              <img
                src={item.thumbnail}
                alt="Image not availbel"
                loading="lazy"
              />
              <div className="news-text">
                <h2>{item.category}</h2>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default News;
