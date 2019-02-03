import React, { PureComponent } from 'react';
import './App.css';
import Movie from './Movie';

class App extends PureComponent {
  state = {

  }

  componentDidMount() {
    fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, idx) => 
      <Movie title={movie.title} poster={movie.poster} key={`movie_key_${idx}`} />
    );
    return movies;
  }

  render() {
    return (
      <div className="App">
      {
        this.state.movies ? this._renderMovies() : <h1>Loading</h1>
      }
      </div>
    );
  }
}

export default App;
