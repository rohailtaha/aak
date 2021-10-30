import actionTypes from '../../actions/action-types';

const initialState = {
  list: [],
  productsToSale: [],
  productsToSaleFormError: {
    show: false,
    msg: '',
  },
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

function salesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SALES:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };

    case actionTypes.CREATE_SALE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case actionTypes.UPDATE_SALE:
      return {
        ...state,
        list: state.list.map(sale =>
          sale.id === action.payload.id ? action.payload : sale
        ),
      };

    case actionTypes.DELETE_SALE:
      return {
        ...state,
        list: state.list.filter(sale => sale.id != action.payload.id),
      };

    case actionTypes.SET_PRODUCTS_TO_SALE:
      return {
        ...state,
        productsToSale: action.payload,
      };

    case actionTypes.ADD_PRODUCT_TO_SALE:
      return {
        ...state,
        productsToSale: [action.payload, ...state.productsToSale],
      };

    case actionTypes.DELETE_PRODUCT_FROM_SALE:
      return {
        ...state,
        productsToSale: state.productsToSale.filter(
          product => product.id != action.payload.id
        ),
      };

    case actionTypes.CLEAR_PRODUCTS_FROM_SALE:
      return {
        ...state,
        productsToSale: [],
      };

    case actionTypes.SHOW_PRODUCTS_TO_SALE_FORM_ERROR:
      return {
        ...state,
        productsToSaleFormError: {
          show: true,
          msg: action.payload.message,
        },
      };

    case actionTypes.HIDE_PRODUCTS_TO_SALE_FORM_ERROR:
      return {
        ...state,
        productsToSaleFormError: {
          show: false,
          msg: '',
        },
      };

    case actionTypes.SHOW_SALE_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.message,
        },
      };

    case actionTypes.HIDE_SALE_ERROR:
      return {
        ...state,
        error: {
          show: false,
          msg: '',
        },
      };

    default:
      return state;
  }
}

export default salesReducer;