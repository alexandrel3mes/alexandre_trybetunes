import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const userAPI = require('../services/userAPI');

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState({ loading: true });
    const request = await userAPI.getUser();
    this.setState({ name: request.name });
    this.setState({ loading: false });
  }

  render() {
    const { loading, name } = this.state;
    return (
      loading ? <LoadingScreen /> : (
        <header data-testid="header-component">
          <h3 data-testid="header-user-name">{ name }</h3>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </header>
      )
    );
  }
}

export default Header;
