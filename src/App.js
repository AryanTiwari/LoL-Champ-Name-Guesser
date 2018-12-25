// All imports
import React, { Component } from 'react';
import { Input, List } from 'antd';
import './App.css';
import Palette from 'react-palette';
import posed from 'react-pose';
import moment from 'moment';

// Animation Nation
const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

var timer;

// Gets data and all the champ names
const championData = require('./data/championData.json').data;
var championNames = Object.keys(championData);

// Makes data object with champions and their title and images
let data = {}
for (const name of championNames) {
  data[championData[name].name] = {
    title: championData[name].title,
    img: championData[name].image.full  
  }
}

// Sets championNames to have names with images and titles
championNames = Object.keys(data);

// App Class
class App extends Component {

// State of things
  constructor(props) {
    super(props)
    this.state = {
      champsVisible: {},
      championName: this._generateRandomChamp(),
      champsGuessed: [],
      seconds: 0,
    }
  } 

// Start Timer
  componentDidMount() {
    timer = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1
      })
    }, 1000)
  }

// Generate Random Champion
  _generateRandomChamp = () => {
    const randomNumber = Math.round(Math.random() * (championNames.length - 1));
    const randomChampion = championNames[randomNumber];
    championNames.splice(randomNumber, 1);
    return randomChampion;
  }

// Check Input
  _checkName = (e) => {
    const { championName, champsGuessed, champsVisible, seconds } = this.state;
    // If the input is correct
    if (championName.toUpperCase() === (e.target.value).toUpperCase()) {
      e.target.value = "";
      const prevChamp = championName;
      this.setState({
        championName: this._generateRandomChamp(),  
        champsGuessed: [...champsGuessed, championName],
        champsVisible: { ...champsVisible, [prevChamp]: false }
      })
      setTimeout(() => {
        this.setState({ champsVisible: { ...champsVisible, [prevChamp]: true } });
      }, 500);
    }
  }

// Render Things
  render() {
    const { champsVisible, championName,seconds,champsGuessed} = this.state;
    let display;

    // Display champion name and input or won message and stop timer
    if(championNames.length === 0) {
      display = <h2> You guessed all the champions!</h2>
      clearInterval(timer)
    } else {
      display = 
      <div>
        <h3> ______, {data[championName].title} </h3>
        <Input style={{width:127, marginBottom:8}} 
          placeholder="Champion Name" 
          onPressEnter={this._checkName}/>
      </div>
    }

    // Rendering all the stuff
    return (
      <div className="App">
        <h2> League of Legends Champion Guesser </h2>
        {display}
        <p> Timer: {moment(seconds*1000).format('m:ss')}</p>
        <div></div>
        <p> You have guessed {champsGuessed.length} out of {championNames.length + champsGuessed.length} </p>
      
        {/* Champion Icon List*/}
        <List
          grid={{
            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
          }}
          dataSource={champsGuessed.slice().reverse()}
          renderItem={item => (
            <List.Item key={item}>
             <Box key={item} className="box" pose={champsVisible[item] ? 'visible' : 'hidden'}>
                <Palette image={require(`./data/champion/${data[item].img}`)}>
                  {palette => {
                    return (
                      <div class='listItems' style={{ color: palette.vibrant  }}>
                        {item}
                        <div></div>
                        {data[item].title}
                        <div style={{marginBottom:6}}></div>
                        <div class ='championIcons' style={{borderColor: palette.vibrant}}>
                          <img
                            alt={item}
                            style={{height:81,width:81}}  
                            src={ require(`./data/champion/${data[item].img}`) } 
                          />
                        </div>
                      </div>
                    )
                  }}
                </Palette>
              </Box>
            </List.Item>
          )}
        />

      </div>
    );
  }
} 

export default App;
