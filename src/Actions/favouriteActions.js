import {ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE, FETCH_FAVOURITES} from './types';

export const addToFavourite = (movie) => {
    return {
        type: ADD_TO_FAVOURITE,
        payload: movie
    }
}

export const removeFromFavourite = (movie) => {
    return {
        type: REMOVE_FROM_FAVOURITE,
        payload: movie
    }
}

export const fetchFavourites = () => {
    return {
        type: FETCH_FAVOURITES,
    }
}