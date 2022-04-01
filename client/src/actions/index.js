const axios = require('axios');

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
    }

}

export function filterOrigin(payload) {
    return {
        type: 'FILTER_ORIGIN',
        payload
    }
}

export function getVideoGamesBd(payload) {
    return {
        type: 'FILTER_ORIGIN_CREATE',
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

export function searchVideoGames(name) {
    return function (dispatch) {
        return fetch("http://localhost:3001/videogames?name=" + name)
            .then(response => response.json())
            .then(videogames => {
                dispatch({
                    type: "SEARCH_VIDEO_GAMES", payload: videogames
                });
            })
            .catch((error) => {
                throw new Error(error)
            })

    };
}

// export function searchVideoGames(name) {
//     return async function (dispatch) {
//         try {
//             var json = await axios.get("http://localhost:3001/videogames?name=" + name);
//             return dispatch({
//                 type: "SEARCH_VIDEO_GAMES",
//                 payload: json.data
//             })
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
// }

export function postVideoGames(payload) {
    return async function (dispatch) {
        try {
            var data = await axios.post("http://localhost:3001/videogames", payload);
            return data;

        } catch (error) {
            throw new Error(error)
        }
    }
}

export function getPlatforms() {
    return async function (dispatch) {

        var info = await axios.get("http://localhost:3001/videogames/plat")
        return dispatch({
            type: "GET_PLATFORMS",
            payload: info.data
        })

    }
}

export function clearId() {
    return {
        type: 'CLEAR_ID',
        payload: []
    }
}




export function detailsId(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames/" + id);
            return dispatch({
                type: "DETAILS_ID",
                payload: json.data

            })
        } catch (error) {
            throw new Error(error)
        }
    }
}


export function clearComponente() {
    return {
        type: 'CLEAR_COMPONENT',
        payload: []
    }
}

export function clearGenres() {
    return {
        type: 'CLEAR_GENRES',
        payload: []
    }
}