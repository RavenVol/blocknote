import React from 'react';
import Modal from './Modal';
import getDataFromServer from '../../data/getDataFromServer2';

import '../../styles/css/form.css';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      confirm: '',
      loginError: '',
      passwordError: '',
      confirmError: '',
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
      case "confirm":
        if (value !== this.state.password) {
          this.setState({[type]: value, confirmError: 'Not equal to password'});
        } else {
          this.setState({[type]: value, confirmError: ''});
        }
        break;
      default: this.setState({[type]: value});
    }
  }

  handleFormSubmit = async() => {
    const { login, password } = this.state;
    const { handleModalClose, putDataToState } = this.props;

    const serverReply = await getDataFromServer(`signin`, {name: login, passwd: password});
    switch (serverReply.code) {
      case '400':
        this.setState({
          loginError: serverReply.message
        });
        break;
      case '410':
        this.setState({
          loginError: serverReply.message, 
          passwordError: serverReply.message
        });
        break;
      case '200':
        const loginToServer = await getDataFromServer(`login`, { name: login, passwd: password });
        if (loginToServer.code === '200') {
          putDataToState('session_key', loginToServer.session_key);
        }

        this.setState({
          login: '',
          password: '',
          confirm: '',
          loginError: '',
          passwordError: '',
          confirmError: '',
        });
        
        handleModalClose('signin');
        break;
      default : handleModalClose('signin');
    }
  }

  render() {
    const { modalIsOpen, handleModalClose } = this.props;
    const {login, password, confirm, loginError, passwordError, confirmError} = this.state;

    return (
      <Modal
        isOpen = {modalIsOpen}
        title = "SignIn Form"
        handleClose = {() => handleModalClose('signin')}
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

          <label className="form__label" htmlFor="Confirm_Password">
            Confirm Password:
          </label>
          <input
            className="form__input"
            id="Confirm_Password"
            type="password"
            name="Confirm"
            placeholder="Retype your password"
            value={confirm}
            required
            onChange={(event) => this.controlInput("confirm", event.target.value)}
          />
          <p className="form__error">{confirmError}</p>
        </form>
      </Modal>
    )
  }
}

export default SigninForm;
