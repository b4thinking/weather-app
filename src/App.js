import React from 'react';
import './App.css';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [], 
      temp: 0,
      cOrF: "F",
      currentTemp: "C",
      url: "https://fcc-weather-api.glitch.me/api/current?lon=35&lat=105"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      if ("geolocation" in navigator) {
        console.log("Available");
      } else {
        console.log("Not Available");
      }

    {/* navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        console.log("getCurrentPosition Success " + lat + lng) // logs position correctly
        this.setState({
          url: "https://fcc-weather-api.glitch.me/api/current?lon=" + lng + "&lon=" + lat
        })
      },
      (error) => {
        console.error(JSON.stringify(error))
      }
    ) */}
  fetch(this.state.url)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          data: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    .then(() => {
      this.setState({temp: this.state.data.main.temp.toFixed(0)})
    })
    };

  tempInfo = () => {
      if (this.props.cOrF === "F"){
          return this.props.tempF
      }else{
          return this.props.tempC
      }
  }

  handleClick = () => {
      if (this.state.cOrF === "C"){
          this.setState({
              cOrF: "F",
              currentTemp: "C",
              temp: this.state.data.main.temp.toFixed(0)
          })
        } else{
          this.setState({
              cOrF: "C",
              currentTemp: "F",
              temp: (this.state.data.main.temp * 1.8 + 32).toFixed(0)
          })
      }
}


render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }else {
      return (
        <div>
         <div> <img src = {this.state.data.icon}></img></div>
          <div>
            <p> It is {this.state.temp}{this.state.currentTemp} outside with {this.state.data.weather[0].description}.</p>
          </div>
          <button onClick={this.handleClick}>Change to temperature to {this.state.cOrF}</button>
        </div>);
    }
  }
}
export default App;
