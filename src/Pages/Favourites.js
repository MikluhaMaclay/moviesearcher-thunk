import React, { useEffect, useState } from "react";
import FavouriteList from "../Components/FavouriteList";
import PaginationComponent from "../Components/PaginationComponent";
import { fetchingMovies } from "../Actions/movieActions";
import { connect } from "react-redux";
import {  Alert } from "reactstrap";  

const Favourites = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const batch = 20;
  const totalPages = Math.ceil(props.favourites.length / batch);

  const nextPageHandler = () => {
    if (currentPage === totalPages) return;
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
    setCurrentPage(totalPages);
  };

  // const loadingHandler = () => {
  //   if (props.isLoading) {
  //     loadingTimeout = setTimeout(() => {
  //       setIsLoading(true);
  //     }, 1000);
  //   } else {
  //     setIsLoading(false);
  //   }
  // };

  const renderFavoutires = () => {
    let currentFavourite = (currentPage -1 ) * batch;
    let favoutiresToRender = []

    while(currentFavourite < props.favourites.length && currentFavourite < currentPage * batch) {
      favoutiresToRender.push(props.favourites[currentFavourite])
      currentFavourite++;
    }

    return favoutiresToRender;
  }

  return (
    <div>
      {props.isError ? (
        <React.Fragment>
          <Alert color="danger">Loading failed, try again later...</Alert>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FavouriteList movies={renderFavoutires()} />
          {!props.isLoading ? (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
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
  )
}

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
)(Favourites);
