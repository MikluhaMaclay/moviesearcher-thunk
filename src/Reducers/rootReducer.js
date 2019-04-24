import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import genresReducer from './genresReducer';

export default combineReducers({
  movies: movieReducer,
  genres: genresReducer
})