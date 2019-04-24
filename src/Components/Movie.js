import React, { useState } from "react";
import { ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import { Badge } from "reactstrap";
import { faStar, faHandHolding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {addToFavourite, removeFromFavourite} from '../Actions/favouriteActions';

const MovieCard = styled.div`
  display: flex;
  flex-direction: row;

  > img {
    max-width: 100%;
    height: auto;
    width: auto;
  }

  > div {
    padding: 10px;
    text-align: center;
    > h3 {
      display: inline-block;
    }

    > p {
      text-align: left;
    }

    > div {
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Movie = props => {
  const thumbnail = `https://image.tmdb.org/t/p/w500/${
    props.movie.poster_path
  }`;

  const title = props.movie.original_name || props.movie.title;

  const year = props.movie.first_air_date || props.movie.release_date || "";
  const releaseYear = year.split("-")[0];

  let genres = [];
  if (props.movie.genre_ids) {
    props.movie.genre_ids.forEach(genre_id => {
      genres.push(
        props.genres.genres.find(element => {
          return element.id === genre_id;
        })
      );
    });
  }

  const renderGenres = () => {
    if (props.genres.isLoading) return;
    return genres.map(genre => {
      return <a>{genre.name} </a>;
    });
  };

  const [isFavourite, setIsFavourite] = useState(
    props.movies.favourites.some(movie => {
      return movie.id === props.movie.id;
    })
  );

  const handleFavourite = () => {
    if(isFavourite) {
      props.removeFromFavourite(props.movie);
      setIsFavourite(false);
    } else {
      props.addToFavourite(props.movie);
      setIsFavourite(true);
    }
  };

  return (
    <ListGroupItem className="mb-3 p-0">
      <MovieCard>
        {props.movie.poster_path ? <img src={thumbnail} alt="thumbnail" /> : ""}
        <div>
          <div onClick={() => {
              handleFavourite();
            }}>
          <FontAwesomeIcon
            className="fa-2x mr-2"
            icon={faStar}
            color={isFavourite ? 'yellow' : 'black'}
          />
          </div>
          <h3>
            {title}
            <Badge className="ml-3">{releaseYear}</Badge>
          </h3>
          <div>
            <p>{props.movie.overview}</p>
            <div>
              <p>{renderGenres()}</p>
              Score: {props.movie.vote_average}
            </div>
          </div>
        </div>
      </MovieCard>
    </ListGroupItem>
  );
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, {addToFavourite, removeFromFavourite})(Movie);
