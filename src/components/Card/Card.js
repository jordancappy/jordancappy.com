import React, { Component } from 'react'

var css = require('./Card.styl')

const Card = ({suit, trumpcard}) =>
  <div className={`card card--${suit}`}>
    <div className="card__face"></div>
    <div className="card__back"></div>
  </div>


export default Card