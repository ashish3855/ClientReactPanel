const initialState = {
  message: null,
  messageType: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case "NOTIFY_USER":
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType
      };
    case "REMOVEMSG":
      return {
        ...state,
        message: action.payload,
        messageType: action.payload
      };
    default:
      return state;
  }
}
