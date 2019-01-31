import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movies = [
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
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
      {
        movies.map((movie, idx) => 
          <Movie title={movie.title} poster={movie.poster} key={`movie_key_${idx}`} />
        )
      }
      </div>
    );
  }
}

export default App;
