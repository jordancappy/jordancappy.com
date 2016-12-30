import React, { Component } from 'react'

var css = require('./NotFound.styl');

export default class NotFound extends Component {
  render() { 
    const degrees = 15
    return (
      <div className="content">
        <div className="content__container">
          <h1 className="content__title">Not Found</h1>
        </div>
        <svg className="background notfound"
          style={{background: '#fff'}}
        >
          <Rectangle angle={degrees * 0} />
          <Rectangle angle={degrees * 1} />
          <Rectangle angle={degrees * 2} />
          <Rectangle angle={degrees * 3} />
          <Rectangle angle={degrees * 4} />
          <Rectangle angle={degrees * 5} />
          <Rectangle angle={degrees * 6} />
          <Rectangle angle={degrees * 7} />
        </svg>
      </div>
    )
  }
}

class Rectangle extends Component {
  render() {
    const { angle,width,height,centerWidth,centerHeight } = this.props
    return (
      <rect rx="10" ry="10" 
        x={centerWidth - (width/2)} 
        y={centerHeight - (height/2)} 
        className="tv" 
        style={{transform: `rotate(${angle}deg)`}}
        width={`${width}px`}
        height={`${height}px`}
      />
    )   
  }
}

Rectangle.defaultProps = {
  height: 50,
  width: 50,
  centerWidth: window.innerWidth / 2,
  centerHeight: window.innerHeight / 2
}
