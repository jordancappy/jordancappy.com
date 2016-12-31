import React, { Component } from 'react'

var css = require('./CharacterSelection.styl')

export default class CharacterSelection extends Component {
  constructor(props) {
    super(props)
    this.state=props
  }
  selectCharacter = (e) => {
    this.setState({
      selectedCharacter : e.target.value,
      formState: ''
    })
  }
  submit = (e) => {
    e.preventDefault()
    this.setState({ formState: 'submit' })
    console.log(this.state.selectedCharacter)
    setTimeout(this.reset, 4000)
  }
  reset = () => {
    this.setState({ formState: '' })
  }
  render() {
    const { characters } = this.props
    const { selectedCharacter,formState } = this.state
    const selected = characters.find(c => c.name == selectedCharacter) || {}
    return (
      <div className={`charselection content 
        ${selectedCharacter}
        ${formState}`
      }>
      <form className='character-selection' onSubmit={this.submit}>
        <input type='submit' hidden />
        <h1 className='character-selection__header'>
          choose character 
          <small>&uarr;&darr; to change</small>
        </h1>
        {characters.map((character,i) => 
          <div index={i} className='character-selection__character'>
            <label>
              <input
                type='radio' 
                name='character' 
                className='character-selection__character__input'
                value={character.name}
                onChange={this.selectCharacter}
                autofocus
                checked={selectedCharacter == character.name}
              />
              <span></span>
              <h1>{character.name}</h1>
            </label>
          </div>
        )}
      </form>
      <img id={selected.name} src={selected.image} />
      <div id='animation'>
        <div className='--1'></div>
        <div className='--2'></div>
        <div className='--3'></div>
      </div>
    </div>
    )
  }
}

CharacterSelection.defaultProps = {
  characters: [
    {
      name: 'spider-man',
      image: 'http://i.imgur.com/he12NiZ.png'
    },
    {
      name: 'wolverine',
      image: 'http://i.imgur.com/kDV6vcJ.png'
    },
    {
      name: 'captain-america',
      image: 'http://i.imgur.com/yu8Qidd.png'
    }
  ],
  selectedCharacter: 'spider-man'
}