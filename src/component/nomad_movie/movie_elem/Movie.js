import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';

import './Movie.css';

const Movie = ({ title, poster, genres, synopsis }) => (
    <div className="Movie">
        <div className="Movie__Column">
            <MoviePoster poster={poster} alt={title} />
        </div>
        <div className="Movie__Column">
            <h1>{title}</h1>
            <div className="Movie__Genres">
            {
                genres.map((genre, idx) => <MovieGenre genre={genre} key={`genre_${idx}`} />)
            }
            </div>
            <div className="Movie__Synopsis">
                <LinesEllipsis
                    text={synopsis}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                /> 
            </div>
        </div>
    </div>
);

Movie.propTypes = {
    title : PropTypes.string.isRequired,
    poster : PropTypes.string.isRequired,
    genres : PropTypes.array.isRequired,
    synopsis : PropTypes.string.isRequired
}

function MoviePoster({ poster, alt }) {
    return (
        <img src={poster} alt={alt} title={alt} className="Movie__Poster" />
    );
}

MoviePoster.propTypes = {
    poster : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
}

const MovieGenre = ({ genre }) => (
    <span className="Movie__Genre">{ genre }</span>
);

MovieGenre.propTypes = {
    genre : PropTypes.string.isRequired
}

export default Movie;