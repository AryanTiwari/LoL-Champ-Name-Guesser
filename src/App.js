import React, { Component } from 'react';
import { Input } from 'antd';
import './App.css';

const championData = require('./data/championData.json').data;
const championNames = Object.keys(championData);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      championName: this._generateRandomChamp() 
    }
  }

  _generateRandomChamp = () => {
    const randomNumber = Math.round(Math.random() * championNames.length);
    const randomChampion = championNames[randomNumber];
    return randomChampion;
  }

  _checkName = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div className="App">
        <p> League of Legends Champion Guesser </p>
        <p> {this.state.championData} </p>
        <Input style={{width:200}} placeholder="Champion Name" onPressEnter={this._checkName}/>
      </div>
    );
  }
} 

export default App;
