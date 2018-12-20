// All imports
import React, { Component } from 'react';
import { Input, List } from 'antd';
import './App.css';
import Palette from 'react-palette';
import posed from 'react-pose';

// Animation Nation
const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

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

  constructor(props) {
    super(props)
    this.state = {
      champsVisible: {},
      championName: this._generateRandomChamp(),
      champsGuessed: []
    }
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
    const { championName, champsGuessed, champsVisible } = this.state;
    if (championName.toUpperCase() === (e.target.value).toUpperCase()) {
      if (championNames.length === 0) {
        console.log("nice");
      } else {
        const prevChamp = championName;
        this.setState({
          championName: this._generateRandomChamp(),  
          champsGuessed: [...champsGuessed, championName],
          champsVisible: { ...champsVisible, [prevChamp]: false }
        })
        setTimeout(() => {
          this.setState({ champsVisible: { ...this.state.champsVisible, [prevChamp]: true } });
        }, 50);
      }
    }
  }

// Render Things
  render() {
    const { champsVisible } = this.state;
    console.log(this.state);
    console.log(championNames);
    return (
      <div className="App">
        <h2> League of Legends Champion Guesser </h2>
        <h3> ______, {data[this.state.championName].title} </h3>
        <Input style={{width:128, marginBottom:8}} placeholder="Champion Name" onPressEnter={this._checkName}/>
        <div></div>
        <p> You have guessed {this.state.champsGuessed.length} out of 133 </p>
        <List
          grid={{
            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
          }}
          dataSource={this.state.champsGuessed.slice().reverse()}
          renderItem={item => (
            <List.Item >
             <Box key={item} className="box" pose={champsVisible[item] ? 'visible' : 'hidden'}>
                <Palette image={require(`./data/champion/${data[item].img}`)}>
                  {palette => {
                    return (
                      <div style={{ color: palette.vibrant, alignItems:'center', display:'flex', flexDirection:'column' }}>
                        {item}
                        <div></div>
                        <div style={{height:80,width:80,overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:100,
                              borderStyle:'solid',borderWidth:6,borderColor: palette.vibrant}}>
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
