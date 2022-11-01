import { useNavigate } from "react-router-dom";
import styles from './Card.module.css';
const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div className="col-md-4"
      onClick={() => {
        navigate("/detail/" + props.shoes.id);
      }}
    >
      <img className={styles.shoesItem} src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default Card;