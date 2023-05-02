import React from 'react';
import axios from 'axios';
import './App.css'
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './components/Movies';
import Button from 'react-bootstrap/Button';

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
      flag2: true,
      moviesData:[]

    };

  };

  // GET https://us1.locationiq.com/v1/search?key=pk.43301b87841c92376db8e188046b8660&q=SEARCH_STRING&format=json


  getLocation = async (e) => {
    e.preventDefault();
    await this.setState({
      searchedCity: e.target.city.value
    });
    // console.log('sdsdsdsd');
    console.log(this.state.searchedCity);

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONKEY}&q=${this.state.searchedCity}&format=json`;
    await this.getWeather();
    await this.getMoviesHandler();

    try {
      let resData = await axios.get(url);
      // console.log('responws', resData.data);

      this.setState({
        cityData: resData.data[0],
        showMap: true
      })
    } catch {
      this.setState({
        errorMessage: true
      })
      console.log('error getting new data')

    }

  };


  getWeather = async () => {

    //the request from the server local
    //http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
    // console.log('get weather', this.state.searchedCity);
    let serverUrl = `http://localhost:3001/weather?city=${this.state.searchedCity}`;

    let resDataFromServer = await axios.get(serverUrl);

    // console.log('info from server', resDataFromServer);
   await  this.setState({
      flag2: false,
      weatherNew: resDataFromServer.data
    });
    // console.log(this.state.flag2, 'flageee');
    // console.log(this.state.weatherNew, 'this weather');

    // } catch (error) {
    //   console.log('cant recieve from server');
    // }


  };

  ///for movies
  getMoviesHandler=async ()=>{
    console.log('getting movies data from server');
    let movieUrl = `http://localhost:3001/movie?city=${this.state.searchedCity}`;
    let moviesDataFromServer=await axios.get(movieUrl)
    await this.setState({
      moviesData:moviesDataFromServer.data
    })


  }


  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <h2>city Name : {this.state.cityData.display_name}</h2>
        <form onSubmit={this.getLocation} id='form1'>
          {/* <form onSubmit={()=>{this.getLocation();this.getWeather}} id='form1'> */}
          <input id='citName' type="text" placeholder='name of the city' name='city' />
          <Button type="submit" value='search city' >search city</Button>
        </form>

        {this.state.showMap && <img id='' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONKEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt="" />}
        {this.state.errorMessage &&
          <p>something error when getting informations</p>}

        {/* <p> { this.state.weatherNew}asdasd</p> */}
 
        
        {/* <button onClick={this.getWeather}>weather</button> */}
        <Weather data={this.state.weatherNew} show={this.state.showMap}/>
        <h2>Movies related to your search</h2>
        <Movies data={this.state.moviesData}  show={this.state.showMap}/>
      </>
    )
  }

};

export default App