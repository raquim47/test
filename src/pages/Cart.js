import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increase, deleteCart } from "./../store";
function Cart() {
  // const a = useSelector((state) => state);
  // console.log(a.user);
  // const a = useSelector((state) => state.user);
  // console.log(a);
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item, i) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(increase(item.id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteCart(item.id));
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Cart;
