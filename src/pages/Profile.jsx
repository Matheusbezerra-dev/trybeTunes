import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  };

  componentDidMount() {
    this.captureUser();
  }

  captureUser = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    });
  };

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1>Perfil</h1>
            <img
              data-testid="profile-image"
              src={ image }
              alt="Foto de perfil"
            />
            <div data-testid="profile-name">
              <h3>Nome: </h3>
              { name }
            </div>
            <div data-testid="profile-email">
              <h3>Email: </h3>
              {email}
            </div>
            <div data-testid="profile-description">
              <h3>Descrição: </h3>
              {description}
            </div>
            <Link to="/profile/edit">
              <button type="button">
                Editar perfil
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
