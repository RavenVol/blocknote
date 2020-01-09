import React from 'react';
import Portal from './Portal';

import '../../styles/css/modal.css';

const Modal = (props) => (
  <>
    {props.isOpen &&
    <Portal>
      <div className="overlay">
        <div className="modalWindow">
          <div className="modalWindow__header">
            <h3 className="header__title">
              {props.title}
            </h3>
            <button type="button" className="header__closeBtn" onClick={() => props.handleClose()}>
              X
            </button>
          </div>
          <div className="modalWindow__body">
            {props.children}
          </div>
          <div className="modalWindow__footer">
            <button type="button" className="footer__closeBtn" onClick={() => props.handleClose()}>
              Close
            </button>
            <button type="button" className="footer__submitBtn" onClick={() => props.handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Portal>}
  </>
);

export default Modal;
