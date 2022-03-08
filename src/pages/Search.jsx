import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      SaveButtonDisabled: true,
      /* loading: false,
      saved: false, */
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

  saveBtn = () => {
    const { artistName } = this.state;
    console.log(artistName);
  }

  render() {
    const {
      artistName,
      SaveButtonDisabled,
      /* loading,
      saved, */
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
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
        </div>
      </>
    );
  }
}

export default Search;
