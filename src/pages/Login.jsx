import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      SaveButtonDisabled: true,
    };
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

  saveBtn = (event) => {
    event.preventDefault();
    console.log('foi');
  }

  render() {
    const {
      userName,
      SaveButtonDisabled,
    } = this.state;
    return (
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
            type="submit"
            disabled={ SaveButtonDisabled }
            onClick={ this.saveBtn }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
