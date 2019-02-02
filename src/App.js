import React, { PureComponent } from 'react';
import './App.css';
import Movie from './Movie';

class App extends PureComponent {
  state = {
    
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies : [
          {
            title : '동작그만',
            poster : 'https://i.ytimg.com/vi/zwH4-h7hx-k/hqdefault.jpg'
          },
          {
            title : '짱구는 못말려',
            poster : 'http://image.chosun.com/sitedata/image/201706/23/2017062302105_0.jpg'
          },
          {
            title : '고등래퍼',
            poster : 'http://static.global.mnet.com/data/od/images/schoolrapper2/premiere/mobile/m_main.jpg'
          },
          {
            title : '거침없이 하이킥',
            poster : 'http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2016/05/12/a2e2557a-12ac-4d04-9811-0c3fe3eaa404.jpg' 
          },
          {
            title : '헬스 키친',
            poster : 'https://ncache.ilbe.com/files/attach/new/20150610/1638661929/870153271/5978982068/738414ae486f31994424f31a932bd2ea.jpg'
          }
        ]
      })
    }, 5000);
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
