const initialState = {
  clients: [],
  userInfo: null
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLIENTSADD":
      return {
        ...state,
        clients: action.payload
      };
    case "USERINFO":
      return {
        ...state,
        userInfo: action.email
      };
    case "LOGOUTCLIENT":
      return {
        ...state,
        userInfo: null
      };
    default:
      return state;
  }
};

export default userReducer;
