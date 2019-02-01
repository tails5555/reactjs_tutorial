import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {
    static propTypes = {
        title : PropTypes.string,
        poster : PropTypes.string
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                greeting : '안녕히가세요'
            });
        }, 5000);
    }
    
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
            <img src={poster} alt={'movie_image'} />
        );
    }
}

export default Movie;