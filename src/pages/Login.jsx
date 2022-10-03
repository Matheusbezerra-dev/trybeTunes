import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../component/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    loading: true,
    redirect: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  buttonForm = async () => {
    const { name } = this.state;
    this.setState({ loading: false });
    await createUser({ name });
    this.setState({ loading: true, redirect: true });
  };

  render() {
    const {
      name,
      loading,
      redirect,
    } = this.state;
    const magaicNumber = 3;
    const validName = name.length >= magaicNumber;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="login-name-input"
              placeholder="digite seu nome"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !validName }
            onClick={ this.buttonForm }
          >
            Entrar
          </button>
          {!loading && <Loading />}
          {redirect && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}
