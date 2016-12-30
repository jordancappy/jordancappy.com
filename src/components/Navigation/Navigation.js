import React, { Component } from 'react';
import { Link } from 'react-router';

var css = require('./Navigation.styl');

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state=props;
  }
  toggleMenuOpen = (e) => {
    const { menuOpen } = this.state;
    this.setState({menuOpen: !menuOpen});
  }
  render() {
    return (
      <nav className={`nav nav${this.state.menuOpen ? '--open' : '--closed'}`}>
        <div className='nav__hamburger'
          onClick={this.toggleMenuOpen} >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className='menu'>
          <li className={`menu__item ${
            this.props.route=='/'? 'menu__item--active' :''
          }`}>
            <Link to="/">
              <h1>jordancappy.com</h1>
            </Link>
          </li>
          <li className={`menu__item ${
            this.props.route=='/characterselection'? 'menu__item--active' :''
          }`}>
            <Link to="/characterselection">
              <h1>character selection</h1>
            </Link>
          </li>
          <li className={`menu__item ${
            this.props.route=='/blackrose' ? 'menu__item--active' :''
          }`}>
            <Link to="/blackrose">
              <h1>black rose</h1>
            </Link>
          </li>
          <li className={`menu__item ${
            this.props.route=='/spintris' ? 'menu__item--active' :''
          }`}>
            <Link to="/spintris">
              <h1>spintris</h1>
            </Link>
          </li>
          <li className={`menu__item ${
            this.props.route=='/about' ? 'menu__item--active' :''
          }`}>
            <Link to='/about'>
              <h1>about</h1>
            </Link>
          </li>
          <li className={`menu__item ${
            this.props.route=='/contact' ? 'menu__item--active' :''
          }`}>
            <Link to='/contact'>
              <h1>contact</h1>
            </Link> 
          </li>
          <li className={`menu__item ${
            this.props.route=='/yourmum' ? 'menu__item--active' :''
          }`}>
            <Link to='/yourmum'>
              <h1>ok?</h1>
            </Link> 
          </li>
        </ul>
      </nav>
    )
  }
}

Navigation.defaultProps = {
  menuOpen: false
}