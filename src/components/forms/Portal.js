import React from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  portalElement = document.createElement('div');

  componentDidMount = () => {
    document.body.appendChild(this.portalElement);
  }

  componentWillUnmount = () => {
    document.body.removeChild(this.portalElement);
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.portalElement);
  }
}

export default Portal;
