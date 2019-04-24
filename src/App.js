import React, { useEffect } from "react";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Discover from "./Pages/Discover";
import Favourites from "./Pages/Favourites";
import Search from "./Pages/Search";
import { fetchingGenres, fetchingMovies } from "./Actions/index";
// import { fetchingGenres } from "./Actions/genresActions";
import { connect } from "react-redux";
import store from "./store";

const App = props => {
  useEffect(() => {
    props.fetchingGenres();
  }, []);
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Discover} />
      <Route path="/favourites" component={Favourites} />
      <Route path="/search" component={Search} />
    </Router>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchingGenres: () => {
    dispatch(fetchingGenres());
  },
  fetchingMovies: page => {
    dispatch(fetchingMovies(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
