import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';

const NUMBERMAGIC = 2;

export default class Search extends Component {
  state = {
    loading: false,
    artist: '',
    albums: [],
    buttonDisabled: true,
  };

  handlechange = ({ target: { value } }) => {
    this.setState({ artist: value });
    if (value.length >= NUMBERMAGIC) {
      this.setState({ buttonDisabled: false });
    }
  };

  handleClick = () => {
    const { artist } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(artist);
      this.setState({ albums, artist, loading: false });
    });
  };

  render() {
    const {
      buttonDisabled,
      loading,
      artist,
      albums,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />
        ) : (
          <>
            <form>
              <label htmlFor="search">
                <input
                  type="text"
                  placeholder="Nome do Artista"
                  data-testid="search-artist-input"
                  onChange={ this.handlechange }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
            <div>
              {!albums.length ? 'Nenhum álbum foi encontrado' : (
                <div>
                  <h1>{`Resultado de álbuns de: ${artist}`}</h1>
                  {albums.map(({
                    artistName,
                    collectionId,
                    collectionName,
                    artworkUrl100,
                    collectionPrice,
                    releaseDate,
                    trackCount,
                  }) => (
                    <div key={ collectionId }>
                      <img src={ artworkUrl100 } alt={ artistName } />
                      <h3>{artistName}</h3>
                      <p>{collectionPrice}</p>
                      <p>{releaseDate}</p>
                      <p>{trackCount}</p>
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        {collectionName}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}
