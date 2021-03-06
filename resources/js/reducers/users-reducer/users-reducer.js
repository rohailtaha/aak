import actionTypes from '../../actions/action-types';
import { sort } from '../../utils/utility_functions';
import { orders } from '../../utils/util_structures';

const initialState = {
  user: {},
  list: [],
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
  passwordFormError: {
    show: false,
    msg: '',
  },
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case actionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };

    case actionTypes.RESET_USER:
      return {
        ...state,
        user: {},
      };

    case actionTypes.SET_USERS:
      return {
        ...state,
        fetched: true,

        list: action.payload,
      };

    case actionTypes.CREATE_USER:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        list: state.list.map(user => {
          return user.id === action.payload.id ? action.payload : user;
        }),
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        list: state.list.filter(user => user.id != action.payload.id),
      };

    case actionTypes.SHOW_USERS_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.msg,
        },
      };

    case actionTypes.HIDE_USERS_ERROR:
      return {
        ...state,
        error: {
          show: false,
          msg: '',
        },
      };

    case actionTypes.SHOW_PASSWORD_FORM_ERROR:
      return {
        ...state,
        passwordFormError: {
          show: true,
          msg: action.payload.msg,
        },
      };

    case actionTypes.HIDE_PASSWORD_FORM_ERROR:
      return {
        ...state,
        passwordFormError: {
          show: false,
          msg: '',
        },
      };

    case actionTypes.SORT_USERS:
      return {
        ...state,
        list: sort(state.list, action.payload.key, action.payload.order),
      };

    case actionTypes.RESORT_USERS:
      return {
        ...state,
        list: sort(state.list, 'created_at', orders.DESC),
      };

    default:
      return state;
  }
}

export default usersReducer;
