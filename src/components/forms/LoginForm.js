import React from 'react';
import Modal from './Modal';
import getDataFromServer from '../../data/getDataFromServer2';

import '../../styles/css/form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      loginError: '',
      passwordError: '',
    }
  }

  controlInput = (type, value) => {
    switch (type) {
      case 'login':
        value.length <= 32 && this.setState({[type]: value});
        break;
      case 'password':
        value.length <= 32 && this.setState({[type]: value});
        break;
      default: this.setState({[type]: value});
    }
  }

  handleFormSubmit = async() => {
    const {login, password} = this.state;
    const {putDataToState, handleModalClose, getUserData} = this.props;

    const serverReply = await getDataFromServer(`login`, { name: login, passwd: password });
    const { code, message, session_key } = serverReply;

    switch (code) {
      case '401':
        this.setState({
          loginError: message
        });
        break;

      case '402':
        this.setState({
          passwordError: message
        });
        break;

      case '200':
        putDataToState('session_key', session_key);

        this.setState({
          login: '',
          password: '',
          loginError: '',
          passwordError: '',
        });

        getUserData('blocknotes');
        getUserData('notes');
        handleModalClose('login');
        break;
        
      default : handleModalClose('login');
    }
  }

  render() {
    const { modalIsOpen, handleModalClose } = this.props;
    const {login, password, loginError, passwordError} = this.state;

    return (
      <Modal
        isOpen = {modalIsOpen}
        title = "LogIn Form"
        handleClose = {() => handleModalClose('login')}
        handleSubmit = {() => this.handleFormSubmit()}
      >
        <form className="form">
          <label className="form__label" htmlFor="Login">
            Login:
          </label>
          <input
            className="form__input"
            id="Login"
            type="text"
            name="Login"
            placeholder="Enter your name"
            value={login}
            required
            onChange={(event) => this.controlInput("login", event.target.value)}
          />
          <p className="form__error">{loginError}</p>

          <label className="form__label" htmlFor="Password">
            Password:
          </label>
          <input
            className="form__input"
            id="Password"
            type="password"
            name="Password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(event) => this.controlInput("password", event.target.value)}
          />
          <p className="form__error">{passwordError}</p>
        </form>
      </Modal>
    )
  }
}

export default LoginForm;
