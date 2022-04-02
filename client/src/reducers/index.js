const initialState = {
  videogames: [],
  // allVideoGames: [],
  genres: [],
  platforms: [],
  details: [],
  see: []
}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEO_GAMES":
      return {
        ...state,
        videogames: action.payload,
        // allVideoGames: action.payload

      };

    case "FILTER_ORIGIN":
      const allVideoGames2 = state.videogames

      const statusFiltrado = action.payload === "api" ? allVideoGames2.filter(el => !el.createdInBd) :
        allVideoGames2

      return {

        ...state,
        videogames: statusFiltrado
      };



    case 'FILTER_ORIGIN_CREATE':
      const error = [{ genres: 'No encontrado', id: "3d22" }]
      const allVg = state.videogames.filter(el => el.createdInBd)
      // const result = !allVg ? allVg.push("error") : allVg.filter(el => el.createdInBd);


      return {
        ...state,
        videogames: allVg.length === 0 ? error : allVg
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
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload
      };

    case 'ORDER_BY_GENRES':

      const notdata = [{ genres: ['No encontrado'], id: "2d2" }]
      const VideoGame = state.videogames
      const genresFiltrado = VideoGame.filter(el => el.genres.includes(action.payload))

      return {

        ...state,
        videogames: genresFiltrado.length === 0 ? notdata : genresFiltrado

      };

    case 'SEARCH_VIDEO_GAMES':

      const notdat = [{ genres: ['No encontrado'], id: "4d4" }]


      return {
        ...state,
        videogames: action.payload.length === 0 ? notdat : action.payload

      };

    case 'POST_VIDEOGAMES':
      return {
        ...state,
      };

    case "DETAILS_ID":
      return {
        ...state,
        details: action.payload
      };
    case "CLEAR_ID":
      return {
        ...state,
        details: action.payload
      };
    case "CLEAR_COMPONENT":
      return {
        ...state,
        videogames: action.payload
      };
    case "GET_POST":
      return {
        ...state,
        see: action.payload,

      };
    case "CLEAR_SEE":
      return {
        ...state,
        see: action.payload
      };


    default:
      return { ...state };
  }



}

export default rootReducer;