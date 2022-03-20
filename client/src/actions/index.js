
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

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}


export function orderByName(payload) {
    return {
        type: 'ORDER_NAME',
        payload
    }
}


export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getGenres() {
    return function (dispatch) {
        return fetch("http://localhost:3001/genres")
            .then(response => response.json())
            .then(genres => {
                dispatch({
                    type: "GET_GENRES", payload: genres
                });
            })
            .catch((error) => {
                throw new Error(error)
            })
    };


}

export function orderByGenres(payload) {
    return {
        type: 'ORDER_BY_GENRES',
        payload
    }
}
