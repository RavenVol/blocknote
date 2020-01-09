import React from 'react';
import Note from './Note';

import '../../../styles/css/blocknote.css';

class BlockNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scaledNote: null,
      currNote: Math.ceil(this.props.notes.length / 2) + 1,
    };

    this.noteWidth = 15;
    this.noteHeight = 22.5;
  }

  setNoteStyle = (noteIndex, length) => {
    let noteStyle = {};

    if (noteIndex + 1 < this.state.currNote) {
      noteStyle.left = `${(noteIndex - 1) * (this.noteWidth * 0.2)}vw`;
      noteStyle.transform = `rotateY(60deg)`;
      noteStyle.zIndex = `${noteIndex + 1}`;
      noteStyle.boxShadow = '-0.74vw 0.37vw 0.37vw 0 #00000077';
    }

    if (noteIndex + 1 === this.state.currNote) {
      noteStyle.left = `${noteIndex * (this.noteWidth * 0.2) + (this.noteWidth * 0.425)}vw`;
      noteStyle.zIndex = `${length}`;
    }

    if (noteIndex + 1 > this.state.currNote) {
      noteStyle.left = `${noteIndex * (this.noteWidth * 0.2) + (this.noteWidth * 1.05)}vw`;
      noteStyle.transform = `rotateY(-60deg)`;
      noteStyle.zIndex = `${length - noteIndex}`;
      noteStyle.boxShadow = '0.74vw 0.37vw 0.37vw 0 #00000077';
    }

    if (noteIndex === this.state.scaledNote) {
      noteStyle.transform = `translateZ(200px) scale(1.5)`;
    }

    return noteStyle;
  }

  render() {
    if (!this.props.notes) {
      return null;
    }

    const { bn_id, notes, getUserData, session_key } = this.props;
    
    return (
      <div 
        className="notesWrap"
        style={{width: `${(notes.length+1 - 3) * (this.noteWidth * 0.2) + (this.noteWidth * 2.25)}vw`, height: `${this.noteHeight * 1.1}vw`}}
      > 
        {notes.map((note, index) => (
          <div 
            key={note.id}
            className="noteWrapper"
            onMouseOver={() => this.state.currNote !== index+1 && this.setState({ currNote: index+1, scaledNote: null})}
            onClick={() => this.setState({scaledNote: index})}
            onMouseLeave={() => this.setState({scaledNote: null})}
            style={this.setNoteStyle(index, notes.length)}
            title="Click Left Mouse Button to enlarge"
          >
            <Note
              id={+note.id}
              bn_id={+bn_id}
              date={note.date}
              title={note.title}
              text={note.text}
              bgColor={note.bgColor}
              getUserData={getUserData}
              session_key={session_key}
            />
          </div>
        ))}
        <div 
          className="noteWrapper"
          onMouseOver={() => this.state.currNote !== notes.length+1 && this.setState({ currNote: notes.length+1, scaledNote:  null})}
          onClick={() => this.setState({scaledNote:  notes.length})}
          onMouseLeave={() => this.setState({scaledNote: null})}
          style={this.setNoteStyle(notes.length, notes.length)}
          title="Click Left Mouse Button to enlarge"
        >
          <Note
            id={0}
            bn_id={+bn_id}
            date={new Date()}
            title="New Note"
            text="Change this"
            bgColor='ffffff'
            getUserData={getUserData}
            session_key={session_key}
          />
        </div>
      </div>
    );
  }
}

export default BlockNote;

