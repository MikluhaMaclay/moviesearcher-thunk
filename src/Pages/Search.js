import React, { useState, useEffect } from "react";
import MovieList from "../Components/MovieList";
import PaginationComponent from '../Components/PaginationComponent';
import SearchForm from '../Components/SearchForm';
import { searchMovies } from "../Actions/movieActions";
import { connect } from "react-redux";
import {  Alert } from "reactstrap";

const Search = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("A");
  const [isLoading, setIsLoading] = useState(false);
  let loadingTimeout;

  useEffect(() => {
    props.searchMovies(query, currentPage);
  }, []);

  useEffect(() => {
    loadingHandler();
    return () => {
      clearTimeout(loadingTimeout);
    };
  });
  useEffect(() => {
    props.searchMovies(query, currentPage);
  }, [currentPage]);

  useEffect(() => {
    props.searchMovies(query, currentPage);
  }, [query]);
  
  
  const nextPageHandler = () => {
    if (currentPage === props.totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prevPageHandler = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const firstPageHandler = () => {
    setCurrentPage(1);
  };

  const lastPageHandler = () => {
    setCurrentPage(props.totalPages);
  };

  const loadingHandler = () => {
    if (props.isLoading) {
      loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };
  const handleQueryChange = (query) => {
    console.log(query);
    setCurrentPage(1);
    setQuery(query);
  }
  console.log(props);

  return (
    <div>
      <SearchForm className="mx-5" handleQueryChange={handleQueryChange}></SearchForm>
      {props.isError ? (
        <React.Fragment><Alert color='danger'>Loading failed, try again later...</Alert></React.Fragment>
      ) : (
        <React.Fragment>
          <MovieList movies={props} />
          {!props.isLoading ? (
            <PaginationComponent
            currentPage={currentPage}
            totalPages={props.totalPages}
            lastPageHandler={lastPageHandler}
            prevPageHandler={prevPageHandler}
            nextPageHandler={nextPageHandler}
            firstPageHandler={firstPageHandler}
          />
          ) : (
            ""
          )}
          {isLoading ? <div id="cover-spin" /> : ""}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.movies
});

const mapDispatchToProps = dispatch => ({
  searchMovies: (query, page) => {
    dispatch(searchMovies(query, page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
