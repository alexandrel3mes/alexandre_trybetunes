import React from 'react';
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
    this.setState({ loading: true });
    const search = await searchAlbumsAPI(artistName);
    const arrLength = search.length;
    this.setState({ artistListLength: arrLength });
    this.setState({ artistAfterFetch: artistName });
    this.setState({ artistName: '' });
    this.setState({ loading: false });
    this.setState({ clicked: true });
    console.log(search);
  }

  render() {
    const {
      artistName,
      SaveButtonDisabled,
      loading,
      artistListLength,
      artistAfterFetch,
      clicked,
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
        </div>
      </>
    );
  }
}

export default Search;
