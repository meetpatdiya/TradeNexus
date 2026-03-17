import React, { useEffect, useState } from "react";
import "./News.css";
import { fetchNews } from "../ApiServices/CryptoApiCalls";
import defaultImg from "../Images/crypto-default.jpg";
const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const res = await fetchNews();
      setData(res);
    };
    getNews();
  }, []);

  if (!data.length) return <div className="news-loader">Loading...</div>;

  const featured = data[0];
  const rest = data.slice(1);

  return (
    <div className="news-container">

      <h1 className="news-heading">Latest Crypto News</h1>

      <div className="news-featured">

        <img
          src={featured.image_url || defaultImg}
          alt={featured.title}
           onError={(e) => {
    e.target.src = defaultImg;
  }}
        />

        <div className="news-featured-text">

          <div className="news-tags">
            {featured.coin?.map((c, i) => (
              <span key={i} className="news-coin">{c}</span>
            ))}

            {featured.keywords?.slice(0,2).map((k,i)=>(
              <span key={i} className="news-key">{k}</span>
            ))}
          </div>

          <h2>{featured.title}</h2>

          <p>{featured.description.slice(0,400)}</p>

          <div className="news-featured-meta">

            <div className="news-source">
              <img src={featured.source_icon} alt="" />
              <span>{featured.source_name}</span>
            </div>

            <span className="news-date">
              {new Date(featured.pubDate).toLocaleDateString()}
            </span>

          </div>

          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-btn"
          >
            Read More
          </a>

        </div>
      </div>


      <div className="news-grid">

        {rest.map((item, index) => (

          <div key={index} className="news-card">

            <img
              src={item.image_url || "/crypto-default.jpeg"}
              alt={item.title}
               onError={(e) => {
    e.target.src = defaultImg;
  }}
            />

            <div className="news-card-text">

              <div className="news-tags">

                {item.coin?.map((c,i)=>(
                  <span key={i} className="news-coin">{c}</span>
                ))}

                {item.keywords?.slice(0,2).map((k,i)=>(
                  <span key={i} className="news-key">{k}</span>
                ))}

              </div>

              <h3>{item.title}</h3>

              <p className="news-desc">
                {item.description?.slice(0,100)}...
              </p>

              <div className="news-meta">

                <div className="news-source">
                  <img src={item.source_icon} alt="" />
                  <span>{item.source_name}</span>
                </div>

                <span className="news-date">
                  {new Date(item.pubDate).toLocaleDateString()}
                </span>

              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-read"
              >
                Read More →
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default News;