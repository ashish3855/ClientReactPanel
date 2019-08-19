const initialState = {
  settings: {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  }
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALLOW_REGISTRATION":
      return {
        settings: {
          ...state.settings,
          allowRegistration: action.payload
        }
      };
    case "DISABLEBALANCEONADD":
      return {
        settings: {
          ...state.settings,
          disableBalanceOnAdd: action.payload
        }
      };
    case "DISABLEBALANCEONEDIT":
      return {
        settings: {
          ...state.settings,
          disableBalanceOnEdit: action.payload
        }
      };
    default:
      return state;
  }
};
