import React, { useEffect, useState } from "react";
import MovieList from "../Components/MovieList";
import PaginationComponent from "../Components/PaginationComponent";
import { fetchingMovies } from "../Actions/movieActions";
import { connect } from "react-redux";
import {  Alert } from "reactstrap";

const Discover = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let loadingTimeout;

  useEffect(() => {
    props.fetchingMovies(currentPage);
  }, []);

  useEffect(() => {
    loadingHandler();
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  useEffect(() => {
    props.fetchingMovies(currentPage);
  }, [currentPage]);

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


  return (
    <div>
      {props.isError ? (
        <React.Fragment>
          <Alert color="danger">Loading failed, try again later...</Alert>
        </React.Fragment>
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
  fetchingMovies: page => {
    dispatch(fetchingMovies(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
