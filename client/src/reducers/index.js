const initialState = {
  videogames: [],
  allVideoGames: [],
  genres: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEO_GAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideoGames: action.payload

      };
    case "FILTER_CREATED":
      const allVideoGames2 = state.allVideoGames

      const statusFiltrado = action.payload === "created" ? allVideoGames2.filter(el => el.createdInBd) :
        allVideoGames2.filter(el => !el.createdInBd)

      return {

        ...state,
        videogames: action.payload === "all" ? allVideoGames2 : statusFiltrado
      };
    case "ORDER_NAME":
      let sortedArr = action.payload === "az" ?

        state.videogames.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.videogames.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1
          }
          return 0;
        });

      return {
        ...state,
        videogames: sortedArr

      };

    case "ORDER_BY_RATING":

      let sortedArrRating = action.payload === "pr" ?

        state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (b.rating > a.rating) {
            return -1;
          }
          return 0;
        }) :
        state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1
          } return 0;
        });

      return {
        ...state,
        videogames: sortedArrRating

      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,


      };

    case 'ORDER_BY_GENRES':


      const allVideoGame = state.allVideoGames

      const genresFiltrado = allVideoGame.filter(el => el.genres.includes(action.payload))

      return {

        ...state,
        videogames: genresFiltrado

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