import {
  FETCH_MOVIES_FAILED,
  FETCH_MOVIE_DETAILS,
  SEARCH_MOVIE,
  MOVIES_ARE_LOADING,
  FETCH_MOVIES_SUCCESSED,
  FETCH_GENRES_SUCCESSED,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE
} from "../Actions/types";
import { loadState } from "../utils/localStorage";

const initialState = {
  movies: [],
  totalPages: 1,
  isLoading: false,
  isError: false,
  favourites: loadState() || []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESSED: {
      return {
        ...state,
        movies: action.payload.results,
        totalPages: action.payload.total_pages,
        isError: false
      };
    }

    case FETCH_MOVIES_FAILED: {
      return {
        ...state,
        isError: true
      };
    }

    case MOVIES_ARE_LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: action.payload
      };
    }

    case ADD_TO_FAVOURITE: {
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    }

    case REMOVE_FROM_FAVOURITE: {
      return {
        ...state,
        favourites: state.favourites.filter(movie => {
          return movie.id !== action.payload.id;
        })
      };
    }
    default:
      return state;
  }
}
