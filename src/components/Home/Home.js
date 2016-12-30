import React, { Component } from 'react';
import Card from '../Card/Card'

var css = require('./Home.styl')

export default class Home extends Component {
  render() {
    return (
        <div className='home content'>
          <div className='content__container'>
            {/*<div className="card">
              <div className="card__suit card__suit--diamond"></div>
              <svg className="card__back">
                <circle cx="10" cy="10" r="10" fill="black"></circle>
              </svg>
            </div>
            */}
            <h1 className='content__title'>jordancappy.com</h1>
          </div>
          <div className="cards">
            <Card suit="spades" />
            <Card suit="diamonds" />
            <Card suit="clubs" />
            <Card suit="hearts" />
          </div>
          <div className="surprise">
            {/*<span className="surprise__triangle"></span>
            <span className="surprise__triangle"></span>
            <span className="surprise__triangle"></span>
            <svg viewBox="0 0 100 140">
              <g transform="translate(-148,-265.36216)">
                <path d="m 195.61268,433.28941 -42.25647,-189.44975 87.33,-18.31114 -18.31111,199.30961 z" />
              </g>
              </svg>
            <svg><path d="m 195.61268,433.28941 -42.25647,-189.44975 87.33,-18.31114 -18.31111,199.30961 z" /></svg>
            <svg><path d="m 195.61268,433.28941 -42.25647,-189.44975 87.33,-18.31114 -18.31111,199.30961 z" /></svg>            
            */}
          </div>
        <svg className="background" >
   
         <path className="card" /> 
            <button className="btn">
              enter
            </button>
        </svg>
      </div>
    )
  }
}