import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let posts = "강남 우동 맛집";
  const [title, setTitle] = useState([
    "다 남자 코트 추천",
    "나 남자 상의 추천",
  ]);
  const [like, setLike] = useState(title.map(()=> 0));
  const [modal, setModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  let temp = new Date();
  temp = temp.toLocaleString();
  let [date, setDate] = useState(title.map(()=>temp));
  return (
    <>
      <div className="black-nav">
        <h2>{posts}</h2>
      </div>
      <button onClick={()=> {
          // let copy = title.slice();
          let copy = [...title];
          copy[0] = '여자코트추천';
          setTitle(copy);
          }}>글 수정
      </button>
      <button onClick={()=> {
        const sortTitle = [...title].sort();
        setTitle(sortTitle);
      }}>가나다
      </button>

      {title.map((item, i)=> {
        return(
          <div className="list" key={item + i}>
            <h4 onClick={()=>{
              setModalIndex(i);
              if(i === modalIndex){
                setModal(!modal);
              } else {
                setModal(true)
              }
            }}>
              {title[i]}
              <span onClick={(e) => {
                e.stopPropagation();
                const copy = [...like];
                copy[i]++;
                setLike(copy);
              }}>❤️ {like[i]}
              </span>
            </h4>
            <p>{date[i]}</p>
            <button onClick={(e)=>{
              const newTitle = [...title];
              const newLike = [...like];
              const newDate = [...date];
              newTitle.splice(i, 1);
              newLike.splice(i, 1);
              newDate.splice(i, 1);
              setTitle(newTitle);
              setLike(newLike);
              setDate(newDate);
            }}>삭제</button>
          </div>
        )
      })}
      <input onChange={(e)=>{
        setInputValue(e.target.value);
        }}/>
      <button onClick={() => {
        const addTitle = [...title];
        addTitle.unshift(inputValue);
        setTitle(addTitle);
        const addLike = [...like];
        addLike.unshift(0);
        setLike(addLike);
        const newDate = [...date];
        newDate.unshift(temp);
        setDate(newDate);
      }}>발행</button>

      {modal ? <Modal title={title} setTitle={setTitle} modalIndex={modalIndex} bgColor='beige'/> : null}
    </>
  );
}

function Modal(props){
  return (
    <div className="modal" style={{background : props.bgColor}}>
        <h4>{props.title[props.modalIndex]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
    </div>
  )
}

export default App;
