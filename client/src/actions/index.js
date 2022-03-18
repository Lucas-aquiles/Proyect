
export function getVideoGames() {
    return function (dispatch) {
        return fetch("http://localhost:3001/videogames")
            .then(response => response.json())
            .then(videogames => {
                dispatch({
                    type: "GET_VIDEO_GAMES", payload: videogames
                });
            })
            .catch((error) => {
                throw new Error(error)
            })
    };
}
