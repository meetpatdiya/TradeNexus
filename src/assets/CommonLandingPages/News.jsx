import React from "react";
//  YOU HAVE TO PUT THIS PAGE ON COMMON LANDING PAGE
import { useEffect } from "react";
import "./News.css";
import { useState } from "react";
import { fetchNews } from "../ApiServices/CryptoApiCalls";
const News = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews();
      setData(data);
    };
    getNews();
  }, []);
  return (
    <div className="news-grid">
      {data &&
        data.map((item, index) => {
          return (
            <div key={index} className={`news-card layout-${index % 10}`}>
              <img
                src={item.thumbnail}
                alt=""
                onLoad={() => setLoaded(true)}
                style={{ display: loaded ? "block" : "none" }}
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
