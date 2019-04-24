import React, {useEffect} from "react";
import { Container, ListGroup } from "reactstrap";
import Movie from "./Movie";

const listStyle = {
  marginTop: "20px"
};

const FavouriteList = (props) => {
    
  return (
    <div style={listStyle}>
      <Container>
        <ListGroup>
            {props.movies.map(movie => {
                return <Movie key={movie.id} movie={movie}></Movie>
            })}
        </ListGroup>
      </Container>
    </div>
  );
};

export default FavouriteList;
