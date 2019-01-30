import React, { Component, Fragment } from 'react';
import './Movie.css';

class Movie extends Component {
    render(){
        const { title, poster } = this.props;
        return (
            <Fragment>
                <MoviePoster poster={poster} />
                <h1>{title}</h1>
            </Fragment>
        );
    }
}

class MoviePoster extends Component {
    render() {
        const { poster } = this.props;
        return(
            <img src={poster} />
        );
    }
}

export default Movie;