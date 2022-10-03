import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.userLoading();
  }

  userLoading = () => {
    this.setState({ loading: true }, async () => {
      const name = await getUser();
      this.setState({ loading: false, name: name.name });
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <div>
        {loading ? (<Loading />
        ) : (
          <header data-testid="header-component">
            <h2 data-testid="header-user-name">{ name }</h2>
            <nav>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </nav>
          </header>
        )}
      </div>
    );
  }
}
