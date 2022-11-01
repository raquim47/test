import { configureStore, createSlice } from "@reduxjs/toolkit";

const watched = createSlice({
  name: "watched",
  initialState: [],
  reducers: {
    saveWatched(state, action){
      state.push(action.payload);
    }
    // 
    // 빈 배열을 로컬 스토래지에 저장, 화면:null 로컬: []
    // 메인 페이지, 화면:null 로컬: []
    // 디테일 페이지0, 화면:디테일0, 로컬 [0]  
    // 디테일 페이지1, 화면:디테일1, 로컬 [1, 0]  
  }
});

export const {saveWatched} = watched.actions;

// 장바구니
const cartData = createSlice({
  name: "cartData",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increase(state, action) {
      const idNum = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[idNum].count++;
    },
    addCart(state, action) {
      const idNum = state.findIndex(a => a.id === action.payload.id);
      console.log(idNum);
      if(idNum === - 1){
        state.push(action.payload); 
      } else {
        state[idNum].count++;
      }
    },
    deleteCart(state, action) {
      return state.filter(
        (current) => current.id !== action.payload
      );
      // return deleteCart;
    },
  },
});
export const { increase, addCart, deleteCart } = cartData.actions;

export default configureStore({
  reducer: {
    cartData: cartData.reducer,
  },
});
