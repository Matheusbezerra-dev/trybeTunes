import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';

export default class ProfileEdit extends Component {
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

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({ loading: false });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  // https://stackoverflow.com/questions/46040973/how-to-upload-image-using-reactjs-and-save-into-local-storage
  getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  imageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.getBase64(file).then((base64) => {
        this.setState({ image: base64 });
      });
    }
  };

  render() {
    const { name,
      email,
      description,
      image,
      loading,
    } = this.state;
    const magicNumber = 3;
    const regex = /\S+@\S+\.\S+/;
    const validName = name.length >= magicNumber;
    const validDescription = description.length >= magicNumber;
    const validEmail = regex.test(email);
    const validimage = image.length >= magicNumber;
    const valid = validEmail && validName && validDescription && validimage;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="edit-name">
              Nome:
              <input
                id="edit-name"
                data-testid="edit-input-name"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-email">
              Email:
              <input
                id="edit-email"
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                required
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-description">
              Descrição:
              <textarea
                id="edit-input-description"
                data-testid="edit-input-description"
                name="description"
                value={ description }
                required
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-image">
              Foto de Perfil:
              <input
                id="edit-input-image"
                data-testid="edit-input-image"
                type="text"
                placeholder="Link da imagem"
                name="image"
                value={ image }
                required
                onChange={ this.handleChange }
              />
              <input
                id="edit-image-input-file"
                data-testid="edit-image-input-file"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={ this.imageUpload }
              />
            </label>
            <Link to="/profile">
              <button
                type="submit"
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ !valid }
              >
                salva
              </button>
            </Link>
          </form>
        )}
      </div>
    );
  }
}
