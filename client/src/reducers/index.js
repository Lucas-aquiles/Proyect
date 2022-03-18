const initialState = {
  videogames: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEO_GAMES":
      return {
        ...state,
        videogames: action.payload
      }
    default:
      return { ...state };
  }

  // if (action.type === "GET_VIDEO_GAMES") {
  //   return {
  //     ...state,
  //     videogames: action.payload
  //   }
  // }


}

export default rootReducer;