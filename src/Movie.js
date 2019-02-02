import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = ({ title, poster }) => (
    <Fragment>
        <MoviePoster poster={poster} />
        <h1>{title}</h1>
    </Fragment>
);

Movie.propTypes = {
    title : PropTypes.string.isRequired,
    poster : PropTypes.string.isRequired
}

function MoviePoster({ poster }) {
    return (
        <img src={poster} alt={'movie_image'} />
    );
}

MoviePoster.propTypes = {
    poster : PropTypes.string.isRequired
}

export default Movie;