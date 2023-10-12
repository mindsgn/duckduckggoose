import {
  STATE,
} from './constant';

const initialState = {
  data:{},
  disable: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
      case STATE:
        return {
          ...state,
          isAuthenticated: true,
        };
    default:
      return state;
  }
}
