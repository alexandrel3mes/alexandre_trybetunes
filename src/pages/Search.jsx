import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingScreen from '../LoadingScreen';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      SaveButtonDisabled: true,
      loading: false,
      artistAfterFetch: '',
      artistListLength: 0,
      clicked: false,
      albums: [],
    };
  }

  handleChange = ({ target: { value } }) => {
    const minLength = 2;
    this.setState({
      artistName: value,
    }, () => {
      this.setState((prevState) => ({
        SaveButtonDisabled:
        prevState.artistName.length >= minLength ? !prevState : prevState,
      }));
    });
  }

  saveBtn = async () => {
    const { artistName } = this.state;
    this.setState({
      albums: [],
      loading: true,
    });
    const search = await searchAlbumsAPI(artistName);
    this.setState({ albums: search });
    const arrLength = search.length;
    this.setState({
      artistListLength: arrLength,
      artistAfterFetch: artistName,
    });
    this.setState({
      artistName: '',
      loading: false,
      clicked: true,
    });
  }

  render() {
    const {
      artistName,
      SaveButtonDisabled,
      loading,
      artistListLength,
      artistAfterFetch,
      clicked,
      albums,
    } = this.state;
    const req1 = artistListLength === 0 && clicked;
    const req2 = artistListLength > 0 && artistAfterFetch.length > 0;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {
            loading ? <LoadingScreen /> : (
              <form>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  value={ artistName }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  disabled={ SaveButtonDisabled }
                  onClick={ this.saveBtn }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </form>
            )
          }
          {
            req1 && <h3>Nenhum álbum foi encontrado</h3>
          }
          {
            req2 && (
              <h3>{`Resultado de álbuns de: ${artistAfterFetch}`}</h3>
            )
          }
          {
            req2 && (
              albums.map((album) => (
                <Link
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <div>
                    <img src={ album.artworkUrl100 } alt="Album Cover" />
                    <h2>{album.collectionName}</h2>
                    <p>{album.artistName}</p>
                  </div>
                </Link>))
            )
          }
        </div>
      </>
    );
  }
}

export default Search;
