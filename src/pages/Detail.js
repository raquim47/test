import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addCart, increase } from "./../store";

const Detail = (props) => {
  const { id } = useParams();
  const findShoes = props.shoes.find((item) => {
    return item.id == id;
  });
  const [showAlert, setShowAlert] = useState(true);
  const [tab, setTab] = useState(0);
  const [fade2, setFade2] = useState("");

  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 상품 클릭->
  // -> 디테일 페이지 로드시)
  // 1. 로컬스토래지에서 watched값 가져옴
  // 2. 현재 상품 id값 넣고 * id값이 아니라 상품 정보를 모두 저장한다면?
  // 3. 다시 로컬스토래지에 저장
  // -> 메인페이지 로드시)
  // 1. 로컬스토래지에서 watched값 가져옴

  useEffect(() => {
    const newShoes = {
      id: findShoes.id,
      title: findShoes.title,
    };
    const parsedWatched = JSON.parse(localStorage.getItem("watched"));
    const filteredWatched = parsedWatched.filter(item => item.id !== newShoes.id);
    const newWatched = [newShoes, ...filteredWatched].slice(0, 3);
    localStorage.setItem("watched", JSON.stringify(newWatched));
  }, []);

  // fade in
  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);
  //timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={"container start " + fade2}>
      {showAlert && (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      )}
      <div className="row">
        {id > props.shoes.length - 1 || isNaN(id) ? (
          <h1>상품없음</h1>
        ) : (
          <>
            <div className="col-md-6">
              <img
                src={
                  "https://codingapple1.github.io/shop/shoes" +
                  (findShoes.id + 1) +
                  ".jpg"
                }
                width="100%"
              />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{findShoes.title}</h4>
              <p>{findShoes.content}</p>
              <p>{findShoes.price}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(
                    addCart({
                      id: findShoes.id,
                      name: findShoes.title,
                      count: 1,
                    })
                  );
                  navigate("/cart");
                }}
              >
                주문하기
              </button>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
              <Nav.Item>
                <Nav.Link eventKey="link0" onClick={() => setTab(0)}>
                  버튼0
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link1" onClick={() => setTab(1)}>
                  버튼1
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link2" onClick={() => setTab(2)}>
                  버튼2
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
          </>
        )}
      </div>
    </div>
  );
};

function TabContent({ tab }) {
  const [fade, setFade] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);
  // if (tab === 0){
  //   return <div>내용0</div>
  // }
  // if (tab === 1){
  //   return <div>내용1</div>
  // }
  // if (tab === 2){
  //   return <div>내용2</div>
  // }
  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
