import React from 'react';
import Modal from './Modal';
import getDataFromServer from '../../data/getDataFromServer2';

import '../../styles/css/form.css';

const DelBlocknoteForm = ({modalIsOpen, handleModalClose, getUserData, session_key, bn_id}) => {
  const handleFormSubmit = async() => {
    const serverReply = await getDataFromServer('delbn', {session_key: session_key, id: bn_id});
    const { code } = serverReply;

    if (code === "200") {
      getUserData("blocknotes");
      getUserData("notes");
    }
    handleModalClose('delblocknote');
  }
  
  return (
    <Modal
      isOpen = {modalIsOpen}
      title = "Delete BlockNote Warning"
      handleClose = {() => handleModalClose('delblocknote')}
      handleSubmit = {() => handleFormSubmit()}
    >
      <div className="form">
        WARNING: Submition of this form will delete BlockNote and all of it's notes! 
      </div>
    </Modal>
  )
}

export default DelBlocknoteForm;
