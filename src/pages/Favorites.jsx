import React, { Component } from 'react';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favorite: [],
    loading: true,
  };

  componentDidMount() {
    this.musicFavorite();
  }

  musicFavorite = async () => {
    const { favorite } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      favorite: [...favorite, ...result],
      loading: false,
    });
  };

  render() {
    const { favorite, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading />
          : (
            <div>
              {favorite.length ? favorite.map((music, i) => (
                <MusicCard
                  key={ i }
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                  music={ music }
                  trackId={ music.trackId }
                />
              )) : (<h3>Suas lista esta fazia.</h3>)}
            </div>
          )}
      </div>
    );
  }
}
