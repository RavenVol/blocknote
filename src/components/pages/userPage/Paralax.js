import React from 'react';
import BgNoteImg from '../../../data/img';
import randomizer from '../../../misc/randomizer';
import getPageDimensions from '../../../misc/getPageDimensions';

import '../../../styles/css/paralax.css';


const imgStyle = (count, sections) => {
  const height = Math.ceil(100 / sections);

  const style = {};
  style.position = `absolute`;
  style.top = `${count * height + randomizer(0, height / 2)}%`;
  style.left = `${randomizer(0, 90)}%`;
  style.width = `30vw`;
  style.height = `30vw`;
  style.transform = `rotateZ(${randomizer(-45, 45)}deg) scale(${randomizer(100, 200)/100})`;
  style.fill = `#ffffff99`;
  style.transition = '1000ms linear';

  return style;
}

const layerStyle = (layer) => {
  const dimensions = getPageDimensions('user') || [0,0];
  const style = {};

  switch (layer) {
    case 1 : 
      style.width = dimensions[0] * 2;
      style.height = dimensions[1];
      break;

    case 2 : 
      style.width = dimensions[0] * 3;
      style.height = dimensions[1];
      break;

    case 3 : 
      style.width = dimensions[0] * 4;
      style.height = dimensions[1];
      break;

    default :
      style.width = dimensions[0];
      style.height = dimensions[1];
  }
  
  return style;
}


const createLayerImages = (pageDimensions) => {
  const images = [];
  const sections = Math.ceil(pageDimensions[1] / 1000);

  for (let i = 0; i <= sections; i++) {
    images.push(<svg key={i} x="0px" y="0px" viewBox="0 0 1000 1000" style={imgStyle(i, sections)}><BgNoteImg /></svg>);
  }
  return images;
}


const Paralax = ({children}) => {
  const pageDimensions = getPageDimensions('user') || [0,0];
  const layer1Images = createLayerImages(pageDimensions);
  const layer2Images = createLayerImages(pageDimensions);
  const layer3Images = createLayerImages(pageDimensions);
  
  return (
    <div className="layersWrap">
      <div className="layer0">
        {children}
      </div>

      <div 
        className="layer1"
        style={layerStyle(1)}
      >
        {layer1Images}
      </div>

      <div 
        className="layer2"
        style={layerStyle(2)}
      >
        {layer2Images}
      </div>

      <div 
        className="layer3"
        style={layerStyle(3)}
      >
        {layer3Images}
      </div>
    </div>
  )
}

export default Paralax;

