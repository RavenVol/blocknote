import React from 'react';
import getDataFromServer from '../../../data/getDataFromServer2';

import '../../../styles/css/note.css';

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      date: this.props.date,
      text: this.props.text,
      bgColor: this.props.bgColor,
      closeBtnColor: this.props.bgColor,
      deleteWarning: false,
      dateChange: false,
      titleChange: false,
      textChange: false,
      bgColorChange: false,
    }
  }

  setData = (type, data) => {
    let insertType = type;
    let correctData = data;

    switch (type) {
      case "text" : 
        if (data.length > 255) correctData = this.state.text;
        break;
      case "title" : 
        if (data.length > 32) correctData = this.state.title;
        break;
      case "bgColor" :
        if (data.length > 6) correctData = this.state.bgColor;
        break;
      case "bgColorRandom" :
        let rndmColor = '';
        const hexNumbes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
        for (let i = 1; i <= 6; i++) {
          rndmColor += hexNumbes[Math.floor(Math.random()*16)];
        }
        correctData = rndmColor;
        insertType = 'bgColor';
        break;
      default: correctData = data;
    }

    this.setState({ [insertType]: correctData });
  }

  submitData = async() => {
    const { id, bn_id, getUserData, session_key } = this.props;
    const { date, title, text, bgColor } = this.state;
    const serverReply = await getDataFromServer(`ch_note`, { session_key: session_key, id: id, bn_id: bn_id, date: date, title: title, text: text, bgColor: bgColor});
    if (serverReply.code === '200') {
      getUserData("notes");
    }
  }

  deleteNote = async() => {
    const { id, getUserData, session_key } = this.props;
    const serverReply = await getDataFromServer(`del_note`, {session_key: session_key, id: id});
    if (serverReply.code === '200') {
      getUserData("notes");
    }
  }

  handleBlur = (type) => {
    switch (type) {
      case "date" : 
        this.setState({dateChange: false});
        break;
      case 'title' :
        this.setState({titleChange: false});
        break;
      case 'text' :
        this.setState({textChange: false});
        break;
      case 'bgColor' :
        this.setState({bgColorChange: false});
        break;
      case 'submit' :
        this.setState({
          dateChange: false, 
          titleChange: false, 
          textChange: false, 
          bgColorChange: false,
          title: this.props.title,
          date: this.props.date,
          text: this.props.text,
          bgColor: this.props.bgColor,
          closeBtnColor: this.props.bgColor,
        });
        break;
      default: console.log('Unknown data type');
    }
  }

  render() {
    const { date, title, text, bgColor, closeBtnColor, deleteWarning, 
      dateChange, titleChange, textChange, bgColorChange } = this.state;
    const { id } = this.props;
    
    return (
      <article 
        className="note"
        style={{backgroundColor: `#${bgColor}`, borderColor: `#${bgColor}`}}
      >
        {id !== 0
          ? <div 
              className="note__closeBtn"
              title="Click to delete Note"
              onClick={() => this.setState({deleteWarning: true})}
            >
              <svg 
                className="note__closeImg" 
                style={{fill: `#${closeBtnColor}`}} 
                onMouseOver={() => this.setState({closeBtnColor: 'ff0000'})} 
                onMouseLeave={() => this.setState({closeBtnColor: `${bgColor}`})}
                viewBox="0 0 1000 1000"
              >
                <path d="M10,990V10h980v980H10z M132.5,132.5v735h735v-735H132.5z M278.1,183L500,404.9L721.9,183l95.1,95.1L595.1,500L817,721.9L721.9,817L500,595.1L278.1,817L183,721.9L404.9,500L183,278.1L278.1,183z"/>
              </svg>
            </div>
          : <button
              type="button"
              className="note__submitBtn"
              onClick={() => {this.submitData(); this.handleBlur('submit')}}
            >
              Submit >>>
            </button>
        }

        <div className="note__header">
          {!dateChange 
            ? <p 
                className="note__date"
                title="Click Right Mouse Button to change date"
                onContextMenu={(event) => {event.preventDefault(); this.setState({dateChange: true})}}
              >
                {`Created on ${date}`}
              </p>
            : <input 
                type="date"
                value={date}
                onChange={(event) => this.setData("date", event.target.value)}
                onBlur={() => {id !== 0 && this.submitData(); this.handleBlur('date')}}
                autoFocus
              />
          }
         
          {!titleChange
            ? <h2 
                className="note__title"
                title="Click Right Mouse Button to change title"
                onContextMenu={(event) => {event.preventDefault(); this.setState({titleChange: true})}}
              >
                {title}
              </h2>
            : <textarea 
                className="note__title note__title--input"
                rows="1"
                value={title}
                onChange={(event) => this.setData("title", event.target.value)}
                onBlur={() => {id !== 0 && this.submitData(); this.handleBlur('title')}}
                autoFocus
              />
          }
        </div>

        <div className="note__main">
          {!textChange
            ? <div
                className="note__text"
                title="Click Right Mouse Button to change text"
                onContextMenu={(event) => {event.preventDefault(); this.setState({textChange: true})}}
              >
                {text}
              </div>
            : <textarea 
                className="note__text note__text--input"
                value={text}
                onChange={(event) => this.setData("text", event.target.value)}
                onBlur={() => {id !== 0 && this.submitData(); this.handleBlur('text')}}
                autoFocus
              />
          }

          {deleteWarning 
          && <div
            className="deleteWarn"
          >
            <p className="deleteWarn__text">Do you realy want to delete this note?</p>
            <button
              className="deleteWarn__Btn deleteWarn__Btn--accept"
              onClick={() => this.deleteNote()}
            >
              Yes
            </button>

            <button
              className="deleteWarn__Btn deleteWarn__Btn--reject"
              onClick={() => this.setState({deleteWarning: false})}
              autoFocus
            >
              No
            </button>
          </div>}
        </div>

        {bgColorChange 
        && <div 
          className="note__footer"
          onBlur={() => {id !== 0 && this.submitData(); this.handleBlur('bgColor')}}
        >
          <input 
            className="note__bgColor--input"
            type="text"
            value={bgColor}
            onChange={(event) => this.setData("bgColor", event.target.value)}
          />
          <button 
            className="note__bgColor--button"
            type="button"
            onClick={() => this.setData('bgColorRandom', '')}
          >
            Random
          </button>
        </div>}

        <div 
          className="note__palleteBtn"
          title="Click to change color"
          onClick={() => this.setState({bgColorChange: true})}
        >
          <svg 
            className="note__palleteImg" 
            viewBox="0 0 1000 1000"
          >
            <path d="M500,508.4c-51.3,57.8-126.3,94.3-209.7,94.3c-20.1,0-39.8-2.1-58.7-6.2c-7.8,25.7-11.9,53-11.9,81.2C219.7,832.5,345.2,958,500,958s280.3-125.5,280.3-280.3c0-28.2-4.2-55.5-11.9-81.2c-18.9,4-38.6,6.2-58.7,6.2C626.3,602.6,551.3,566.2,500,508.4z" fill="blue"/>
            <path d="M441.3,403.5c-7.8-25.7-11.9-53-11.9-81.2c0-71.4,26.7-136.5,70.6-186C448.7,78.4,373.7,42,290.3,42C135.5,42,10,167.5,10,322.3c0,134.7,95,247.2,221.6,274.2C260.9,499.6,341.2,424.8,441.3,403.5z" fill="red"/>
            <path d="M441.3,403.5c11.9,39.3,32.1,74.9,58.7,104.8c26.6-29.9,46.8-65.6,58.7-104.8c-18.9-4-38.6-6.2-58.7-6.2C479.9,397.4,460.2,399.5,441.3,403.5z" className="note__palleteImg--color4" fill="gold"/>
            <path d="M709.7,42c-83.4,0-158.3,36.4-209.7,94.3c43.9,49.5,70.6,114.7,70.6,186c0,28.2-4.2,55.5-11.9,81.2c100.1,21.3,180.4,96.1,209.7,193C895,569.5,990,457,990,322.3C990,167.5,864.5,42,709.7,42z" fill="green"/>
          </svg>
        </div>
      </article>
    );
  }
}

export default Note;
