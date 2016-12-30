import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Navigation from '../Navigation/Navigation';
import Caution from '../Loading/Loading'

var css = require('./app.styl');

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = props
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        className="container"
        component="main"
        transitionName="wipe"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <button onClick={()=>this.setState({loading: !this.state.loading})}
          style={{zIndex: '100', width: '100%'}}
        >load</button>
        <Caution loading={this.state.loading} />
        <Navigation route={this.props.location.pathname} />
        {React.cloneElement(this.props.children, {
          key: this.props.location.pathname
        })}
        
      </ReactCSSTransitionGroup>
    )
  }
}

Layout.defaultProps = {
  loading: false
}