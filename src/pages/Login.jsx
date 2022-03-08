import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const userAPI = require('../services/userAPI');

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      SaveButtonDisabled: true,
      loading: false,
      saved: false,
    };
  }

  componentDidMount() {
    this.loaded();
  }

  handleChange = ({ target: { value } }) => {
    const minLength = 3;
    this.setState({
      userName: value,
    }, () => {
      this.setState((prevState) => ({
        SaveButtonDisabled:
        prevState.userName.length >= minLength ? !prevState : prevState,
      }));
    });
  }

  saveBtn = async () => {
    this.setState({ loading: true });
    const { userName } = this.state;
    await userAPI.createUser({ name: userName });
    this.setState({ loading: false });
    this.setState({ saved: true });
  }

  loaded() {
    this.setState({ loading: true });
    this.setState({ loading: false });
  }

  render() {
    const {
      userName,
      SaveButtonDisabled,
      loading,
      saved,
    } = this.state;
    return (
      <>
        {
          loading
            ? <LoadingScreen /> : (
              <div data-testid="page-login">
                <form>
                  <input
                    type="text"
                    data-testid="login-name-input"
                    placeholder="Nome"
                    value={ userName }
                    onChange={ this.handleChange }
                    name="userName"
                  />
                  <button
                    type="button"
                    disabled={ SaveButtonDisabled }
                    onClick={ this.saveBtn }
                    data-testid="login-submit-button"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )
        }
        {
          saved && <Redirect to="/search" />
        }
      </>
    );
  }
}

export default Login;
