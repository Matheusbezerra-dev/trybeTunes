import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';

export default class Album extends Component {
  state = {
    albumInformation: {},
    album: [],
    loading: true,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.requestMusic(id);
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

  render() {
    const { album, albumInformation, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading />
          : (
            <main>
              <h2 data-testid="artist-name">{albumInformation.artistName}</h2>
              <h4 data-testid="album-name">{albumInformation.collectionName}</h4>
              <div>
                {album.map(({ previewUrl, trackName, song, trackNumber }) => (
                  <MusicCard
                    previewUrl={ previewUrl }
                    trackName={ trackName }
                    musicObj={ song }
                    key={ trackNumber }
                  />))}
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
