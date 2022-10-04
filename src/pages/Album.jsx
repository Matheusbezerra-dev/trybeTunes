import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';

export default class Album extends Component {
  state = {
    album: [],
    favorite: [],
    albumInformation: {},
    loading: true,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.requestMusic(id);
    this.SelectedFavorite();
  }

  requestMusic = async (id) => {
    this.setState({ loading: true });
    const songResult = await getMusics(id);
    const { album } = this.state;
    songResult.forEach((result, i) => ((i === 0)
      ? this.albumInformation(result)
      : album.push(result)));
    this.setState({
      loading: false,
    });
  };

  albumInformation = (info) => {
    this.setState({
      albumInformation: info,
    }, () => {
      this.setState({ loading: false });
    });
  };

  favoriteFunction = async (e, obj) => {
    const { target } = e;
    const { favorite } = this.state;
    this.setState({ loading: true }, async () => {
      if (target.checked) {
        await addSong(obj);
        this.setState({
          loading: false,
          favorite: [...favorite, obj.trackId],
        });
      } else {
        this.setState({ loading: true });
        await removeSong(obj);
        this.setState({
          loading: false,
          favorite: favorite.filter((song) => song !== obj.trackId),
        });
      }
    });
  };

  SelectedFavorite = async () => {
    const { favorite } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    console.log(result);
    this.setState({
      loading: false,
      favorite: [...favorite, ...result.map(({ trackId }) => trackId)],
    });
  };

  render() {
    const { album, albumInformation, loading, favorite } = this.state;
    console.log(favorite);
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading />
          : (
            <main>
              <h3 data-testid="artist-name">{albumInformation.artistName}</h3>
              <h5 data-testid="album-name">{albumInformation.collectionName}</h5>
              <div>
                {album.map((music, i) => (
                  <MusicCard
                    key={ i }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                    music={ music }
                    trackId={ music.trackId }
                    checked={ favorite.some((numbSong) => music.trackId === numbSong) }
                    favoriteFunction={ this.favoriteFunction }
                  />
                ))}
              </div>
            </main>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
