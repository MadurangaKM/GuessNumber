const initialState = {
  darkMode: true,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_DARK_MODE": {
      return {
        ...state,
        darkMode: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
