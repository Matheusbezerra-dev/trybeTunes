import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const name = await getUser();
      this.setState({ loading: false, name });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? (<Loading />
        ) : (
          <header data-testid="header-component">
            <h2 data-testid="header-user-name">{ { name } || 'Usuario(a)'}</h2>
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
