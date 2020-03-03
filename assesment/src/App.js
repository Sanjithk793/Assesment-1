import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Container from './container/container'
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// 3de3f49df51a24ee56ac82d572d18dcd
// (localStorage.getItem('cities').indexOf('Chennai') != -1 ? true: false): false
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      data: [],
      fetchedData:[]
    }
  }

  buttonClickHandler = (e, city) => {
    this.setState({
      cities: this.state.cities.concat([city])
    })
  }
  clearStorage = () => {
    localStorage.clear();
  }
  getDataHandler = () => {
    this.state.cities.map((city) => {
      if (this.state.data.indexOf(city) == -1) {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3de3f49df51a24ee56ac82d572d18dcd").then((response) => {
          console.log(response)
          let dataObj = {
            cityName: response.data.name,
            weather: response.data.weather[0].main
          };
          this.setState({
            data: this.state.data.concat([city]),
            fetchedData: this.state.fetchedData.concat(dataObj)
          });
          localStorage.setItem(city, this.state.data)
        }).catch((err) => {
          console.log(err);
        });
      }
    })
  }

  render() {
    let content = null;
    return (
      <div className="App">
        <div>
          London <input type="checkbox" defaultChecked={
            localStorage.getItem('London') ? true: false
          } onClick={(e) => this.buttonClickHandler(e, "London")} />
          <br />
          Chennai <input type="checkbox" defaultChecked={
            localStorage.getItem('Chennai') ? true: false
          } onClick={(e) => this.buttonClickHandler(e, "Chennai")} />
          <br />
          Mumbai <input type="checkbox" defaultChecked={
            localStorage.getItem('Mumbai') ? true: false
          } onClick={(e) => this.buttonClickHandler(e, "Mumbai")} />
          <br />
          <button onClick={this.getDataHandler}>Get Weather Data</button>
          <button onClick={this.clearStorage}>Clear Storage</button>
        </div>
      </div>
    );
  }
}

export default App;
