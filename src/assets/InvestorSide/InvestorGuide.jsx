import React, { useState, useEffect ,useRef} from "react";
import {useNavigate} from "react-router-dom"
import api from "../ApiServices/Api";
import "./InvestorGuide.css"
import { useCoins } from "../UserSide/CoinsContext";
const InvestorGuide = () => {
  const [coinData, setcoinData] = useState([]);
  const navigate = useNavigate()
  const { coins } = useCoins();
  const getImgData = async () => {
    const {data} = await api.get("/charts/coins");
    console.log(data);
    setcoinData(data);
  };
  useEffect(() => {
    getImgData();
  }, []);
 const coinImg = coinData.map(d => {
  const match = coins.find(c => c.id === d.crypto_id);  
  return match?.image;
});
  console.log(coinImg);
  const trackRef = useRef(null);

useEffect(() => {
  if (!trackRef.current) return;

  let pos = 0;

  const move = () => {
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;

    pos -= 0.5;
    if (Math.abs(pos) >= halfWidth) {
      pos += halfWidth;
    }

    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(move);
  };

  move();
}, [coinData]);

  return <>
<div className="ticker-wrapper" >
  <div className="ticker" ref={trackRef}>
    {[...coinData, ...coinData, ...coinData].map((d, i) => {
      const match = coins.find(c => c.id === d.crypto_id);
      return (
        <div className="ticker-item"  onClick={()=>navigate(`/investordashboard/coin/${d.crypto_id}`)}  key={i}>
          <img src={match?.image} alt={d.crypto_id} />
         <div className="ticker-text">
    <span>{d.crypto_id}</span>
    <p>${d.total_volume}</p>
  </div>
        </div>
      );
    })}
  </div>
</div></>;
};

export default InvestorGuide;
