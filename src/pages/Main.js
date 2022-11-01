import Card from "./../components/Card";
import axios from "axios";
import { useState, useEffect } from "react";


const Main = (props) => {
  const [loading, setLoading] = useState(false);
  const [watched, setWatched] = useState([]);
  useEffect(() => {
    let getWatched = localStorage.getItem("watched");
    getWatched = JSON.parse(getWatched);
    setWatched(getWatched);
  }, []);
  return (
    <>
      <div className="main-bg">
      <img src={process.env.PUBLIC_URL + '/bg.png'} />
      </div>
      <button
        onClick={() => {
          const newShoes = [...props.shoes];
          if (props.sortBtn === "low") {
            newShoes.sort((a, b) => (a.price < b.price ? -1 : 1));
            props.setSortBtn("high");
          } else if (props.sortBtn === "high") {
            newShoes.sort((a, b) => (b.price < a.price ? -1 : 1));
            props.setSortBtn("low");
          }
          props.setShoes(newShoes);
        }}
      >
        {props.sortBtn}
      </button>
      <div className="container">
        {/* // 최근 본 상품 */}
        <div className="row">
          <h3>최근 본 상품</h3>
          {watched.map((item) => {
            return (
              <div className="col-md-2">
                <img
                  src={
                    "https://codingapple1.github.io/shop/shoes" +
                    (item.id + 1) +
                    ".jpg"
                  }
                  width="50%"
                />
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
        {/* 상품 목록 */}
        <div className="row">
        <h3>상품 목록</h3>
          {props.shoes.map((item, i) => (
            <Card shoes={item} i={i + 1} key={item.id} />
          ))}
        </div>
      </div>
      {/* 로딩 */}
      {loading === true ? (
        <div className="alert alert-warning">로딩중</div>
      ) : null}
      {/* 더보기 */}
      {props.more <= 3 ? (
        <button
          onClick={() => {
            axios
              .get(`https://codingapple1.github.io/shop/data${props.more}.json`)
              .then((result) => {
                const newShoes = [...props.shoes, ...result.data];
                props.setShoes(newShoes);
                props.setMore((prev) => prev + 1);
                setLoading(false);
              })
              .catch(() => {
                console.log("실패");
                setLoading(false);
              });
          }}
        >
          더보기
        </button>
      ) : null}
    </>
  );
};
export default Main;
