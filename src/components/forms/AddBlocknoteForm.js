import React from 'react';
import Modal from './Modal';
import getDataFromServer from '../../data/getDataFromServer2';

import '../../styles/css/form.css';

class AddBlocknoteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      color: '',
    }
  }

  componentDidUpdate(prevProps) {
    if ( (this.props.currBn && prevProps.currBn && this.props.currBn.id !== prevProps.currBn.id) || (this.props.currBn && !prevProps.currBn) ) {
      this.setState({
        title: this.props.currBn.title,
        color: this.props.currBn.bgColor,
      });
    }
  }

  controlInput = (type, value) => {
    switch (type) {
      case 'title':
        value.length <= 32 && this.setState({[type]: value});
        break;
      case 'color':
        value.length <= 6
        && this.setState({[type]: value});
        break;
      case 'rndmColor':
        let rndmColor = '';
        const hexNumbes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
        for (let i = 1; i <= 6; i++) {
          rndmColor += hexNumbes[Math.floor(Math.random()*16)];
        }
        this.setState({color: rndmColor});
        break;
      default: this.setState({[type]: value});
    }
  }

  handleFormSubmit = async() => {
    const {title, color} = this.state;
    const {handleModalClose, session_key, getUserData, currBn} = this.props;

    const serverReply = await getDataFromServer(`addbn`, { id: currBn ? currBn.id : 0, session_key: session_key, title: title, color: color});
    const { code } = serverReply;

    if (code === "200") {
      this.setState({title: '', color: ''});
      getUserData("blocknotes");
      handleModalClose('addblocknote');
    }
  }

  render() {
    const { modalIsOpen, handleModalClose } = this.props;
    const { title, color } = this.state;
    return (
      <Modal
        isOpen = {modalIsOpen}
        title = "Add BlockNote Form"
        handleClose = {() => {this.setState({title: '', color: ''}); handleModalClose('addblocknote')}}
        handleSubmit = {() => this.handleFormSubmit()}
      >
        <form className="form">
          <label className="form__label" htmlFor="title">
            Title:
          </label>
          <input
            className="form__input"
            id="title"
            type="text"
            name="title"
            placeholder="Enter Blocknote Title"
            value={title}
            required
            onChange={(event) => this.controlInput("title", event.target.value)}
          />

          <label className="form__label" htmlFor="color">
            Color your Blocknote:
          </label>
          <input
            className="form__input"
            style={{backgroundColor: `#${color}`}}
            id="color"
            type="text"
            name="title"
            placeholder="Color #XXXXXX"
            value={color}
            required
            onChange={(event) => this.controlInput("color", event.target.value)}
          />
          <button
            className="form__button"
            type="button"
            onClick={() => this.controlInput("rndmColor", '')}
          >
            Set random color
          </button>
        </form>
      </Modal>
    )
  }
}

export default AddBlocknoteForm;
