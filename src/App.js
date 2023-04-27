import React from 'react';
import axios from 'axios';
import './App.css'
import Weather from './components/Weather';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchedCity: '',
      laith: 'laith',
      showMap: false,
      errorMessage: false,
      lat: '',
      lon: '',
      weatherNew: [],
      flag2: true

    };

  };

  // GET https://us1.locationiq.com/v1/search?key=pk.43301b87841c92376db8e188046b8660&q=SEARCH_STRING&format=json


  getLocation = async (e) => {
    e.preventDefault();
    await this.setState({
      searchedCity: e.target.city.value
    });
    console.log('sdsdsdsd');
    console.log(this.state.searchedCity);

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONKEY}&q=${this.state.searchedCity}&format=json`;

    try {
      let resData = await axios.get(url);
      console.log('responws', resData.data);
      await this.getWeather();

      this.setState({
        cityData: resData.data[0],
        showMap: true
      })
    } catch {
      this.setState({
        errorMessage: true
      })

    }

  };


  getWeather = async () => {

    //the request from the server local
    //http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
    console.log('get weather', this.state.searchedCity);
    let serverUrl = `http://localhost:3001/weather?searchQuery=${this.state.searchedCity}`;

    let resDataFromServer = await axios.get(serverUrl);

    console.log('info from server', resDataFromServer);
   await  this.setState({
      flag2: false,
      weatherNew: resDataFromServer.data
    });
    console.log(this.state.flag2, 'flageee');
    console.log(this.state.weatherNew, 'this weather');

    // } catch (error) {
    //   console.log('cant recieve from server');
    // }


  }


  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <h2>city Name : {this.state.cityData.display_name}</h2>
        <form onSubmit={this.getLocation} id='form1'>
          {/* <form onSubmit={()=>{this.getLocation();this.getWeather}} id='form1'> */}
          <input id='citName' type="text" placeholder='name of the city' name='city' />
          <input type="submit" value='search city' />
        </form>

        {this.state.showMap && <img id='' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONKEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt="" />}
        {this.state.errorMessage &&
          <p>something error when getting informations</p>}

        {/* <p> { this.state.weatherNew}asdasd</p> */}
        weather date:
        
        {/* <button onClick={this.getWeather}>weather</button> */}
        <Weather data={this.state.weatherNew}/>
      </>
    )
  }

};

export default App