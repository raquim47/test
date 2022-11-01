import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
// pages
import Main from './pages/Main';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
// components
import TopNav from "./components/TopNav";

function App() {
  const [shoes, setShoes] = useState(data);
  const [sortBtn, setSortBtn] = useState("low");
  const [more, setMore] = useState(2);

  useEffect(() => {
    const confirm = localStorage.getItem('watched');
    !confirm && localStorage.setItem('watched', JSON.stringify([]));
  }, [])
  return (
    <>
      <TopNav/>
      <Link to="/">홈</Link>    
      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes} sortBtn={sortBtn} setSortBtn={setSortBtn} more={more} setMore={setMore}/>}/>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="*" element={<h1>없는 페이지</h1>} />
      </Routes>
    </>
  );
}

export default App;
