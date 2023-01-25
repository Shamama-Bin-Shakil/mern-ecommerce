const reducer = (state, action) => {
  if (action.type === "ADD_TO_CARD") {
    let check;
    state.item.map((element) => {
      check = element;
    });
    if (action.payload !== check) {
      return { ...state, item: state.item.concat(action.payload) };
    }
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      item: state.item.filter((curElement) => {
        return curElement._id !== action.payload;
      }),
    };
  }

  if (action.type === "INCREMENT") {
    let updateCart = state.item.map((curElem) => {
      if (curElem._id === action.payload) {
        return { ...curElem, quantity: curElem.quantity + 1 };
      }
      return curElem;
    });
    return { ...state, item: updateCart };
  }

  if (action.type === "DECREMENT") {
    let updateCart = state.item
      .map((curElem) => {
        if (curElem._id === action.payload) {
          return { ...curElem, quantity: curElem.quantity - 1 };
        }
        return curElem;
      })
      .filter((curElem) => curElem.quantity !== 0);
    return { ...state, item: updateCart };
  }

  if (action.type === "CLEAR_CARD") {
    return {
      ...state,
      item: [],
    };
  }

  if (action.type === "GET_TOTAL") {
    let { totalItem, totalAmount } = state.item.reduce(
      (accum, curVal) => {
        let { quantity, price } = curVal;
        let updateTotalAmounts = quantity * price;
        accum.totalItem += quantity;
        accum.totalAmount += updateTotalAmounts;
        return accum;
      },
      {
        totalItem: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalItem, totalAmount };
  }

  return state;
};

export default reducer;
