import React, {useEffect} from "react";
import { Container, ListGroup } from "reactstrap";
import Movie from "./Movie";

const listStyle = {
  marginTop: "20px"
};

const MovieList = (props) => {
  const movies = props.movies.location.pathname === "/favourites" ? props.movies.favourites : props.movies.movies || [];
    
  return (
    <div style={listStyle}>
      <Container>
        <ListGroup>
            {movies.map(movie => {
                return <Movie key={movie.id} movie={movie}></Movie>
            })}
        </ListGroup>
      </Container>
    </div>
  );
};

export default MovieList;
