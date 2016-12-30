import React, { Component } from 'react';

var css = require('./About.styl');
export default class About extends Component {
  render() {
    return (
      <div className='content'>
          <div className='content__container'>
            <div className='content__title'>
              <h1>about</h1>
            </div>
            <div className='content__description'>
              <div>
                i am a dev guy. i have been doing this for 2 years now.
                it has been a rough journey but i have decided to continue
              </div>
              <div>
                this website is my attempt at making something worth looking at.
              </div>
            </div>
          </div>
        <svg className="background"
          style={{background: 'red'}}
        >
          <Wave />
          <Wave />
          <Wave />
          <Wave />
          <Wave />
          <Wave />
          <Wave />
          <Wave />
          <Wave />
          <Wave />
        </svg>
      </div>
    )
  }
}

class Wave extends Component {
  render() {
    const {width,height,windowWidth,windowHeight} = this.props;
    return(
      <polygon 
        className="wave"
        stroke="black"
        points={`${windowWidth-width},${windowHeight} 
        ${windowWidth-(width/2)},${windowHeight-(height*0.8)}
        ${windowWidth},${windowHeight-height} 
        ${windowWidth+(width/2)},${windowHeight-(height*0.8)}
        ${windowWidth+width},${windowHeight}`}
      ></polygon>
    )
  }
}

Wave.defaultProps = {
  width: 10,
  height: 10,
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth/2
}