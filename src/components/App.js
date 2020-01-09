import React from 'react';

import UserPage from './pages/userPage/UserPage';
import Paralax from './pages/userPage/Paralax';
import HomePage from './pages/homePage/HomePage';
import Header from './Header';
import LoginForm from './forms/LoginForm';
import SigninForm from './forms/SigninForm';
import AddBlocknoteForm from './forms/AddBlocknoteForm';
import DelBlocknoteForm from './forms/DelBlocknoteForm';
import getDataFromServer from '../data/getDataFromServer2';

import '../styles/css/reset.css';
import '../styles/css/app.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loginFormIsOpen: false,
      signinFormIsOpen: false,
      addBlocknoteFormIsOpen: false,
      delBlocknoteFormIsOpen: false,
      session_key: '',
      blocknotes: [],
      notes: [],
      currBn_id: 0, 
    }
  }

  handleModalOpen = (formType) => {
    switch (formType) {
      case 'login': this.setState({loginFormIsOpen: true}); break;
      case 'signin': this.setState({signinFormIsOpen: true}); break;
      case 'addblocknote': this.setState({addBlocknoteFormIsOpen: true}); break;
      case 'delblocknote': this.setState({delBlocknoteFormIsOpen: true}); break;
      default: console.warn('Incorrect form type in handleModalOpen');
    }
  }

  handleModalClose = (formType) => {
    switch (formType) {
      case 'login': this.setState({loginFormIsOpen: false}); break;
      case 'signin': this.setState({signinFormIsOpen: false}); break;
      case 'addblocknote': this.setState({addBlocknoteFormIsOpen: false, currBn_id: 0}); break;
      case 'delblocknote': this.setState({delBlocknoteFormIsOpen: false, currBn_id: 0}); break;
      default: console.warn('Incorrect form type in handleModalClose');
    }
  }

  putDataToState = (variable, data) => {
    if (variable === 'all' && data === 'default') {
      this.setState({
        loginFormIsOpen: false,
        signinFormIsOpen: false,
        addBlocknoteFormIsOpen: false,
        delBlocknoteFormIsOpen: false,
        session_key: '',
        blocknotes: [],
        notes: [],
        currBn_id: 0, 
      });
    } else {
      this.setState({[variable]: data});
    }
  }

  getUserData = async(query) => {
    const { session_key } = this.state;
    const serverReply = await getDataFromServer(`data`, { get: query, session_key: session_key });
    const { code, data } = serverReply;
    if (code === "200") this.setState({[query]: data.reverse()});
  }

  render() {
    const {loginFormIsOpen, signinFormIsOpen, 
      addBlocknoteFormIsOpen, delBlocknoteFormIsOpen,
      session_key, blocknotes, notes, currBn_id} = this.state;
    let currBn;

    if (currBn_id > 0) {
      currBn = this.state.blocknotes.filter(bn => bn.id === currBn_id)[0];
    }

    return (
      <>
        <header className="header">
          <Header 
            handleModalOpen={this.handleModalOpen}
            putDataToState={this.putDataToState}
            session_key={session_key}
          />
        </header>

        <main className="main">
          {session_key 
            ? <Paralax>
                <UserPage 
                  handleModalOpen={this.handleModalOpen}
                  blocknotes={blocknotes}
                  notes={notes}
                  getUserData={this.getUserData}
                  session_key={session_key}
                  putDataToState={this.putDataToState}
                />
              </Paralax>
            : <HomePage 
                handleModalOpen={this.handleModalOpen}
              />
          }
        </main>

        <footer className="footer">

        </footer>

        <LoginForm
          modalIsOpen={loginFormIsOpen}
          handleModalClose={this.handleModalClose}
          putDataToState={this.putDataToState}
          getUserData={this.getUserData}
        />

        <SigninForm
          modalIsOpen={signinFormIsOpen}
          handleModalClose={this.handleModalClose}
          putDataToState={this.putDataToState}
        />

        <AddBlocknoteForm
          modalIsOpen={addBlocknoteFormIsOpen}
          handleModalClose={this.handleModalClose}
          session_key={session_key}
          getUserData={this.getUserData}
          currBn={currBn}
        />

        <DelBlocknoteForm
          modalIsOpen={delBlocknoteFormIsOpen}
          handleModalClose={this.handleModalClose}
          session_key={session_key}
          bn_id={currBn_id}
          getUserData={this.getUserData}
        />
      </>
    );
  }
}

export default App;
