import React, { Component } from 'react'

var css = require('./Loading.styl')

const Caution = ({ loading }) =>
<div className={`caution ${loading ? 'caution--loading' : ''}`}>
  <div className="caution__tape">loading  loading</div>
  <div className="caution__tape"></div>
  <div className="caution__tape"></div>
  <div className="caution__tape"></div>
  <div className="caution__tape"></div>
</div>;

export default Caution;