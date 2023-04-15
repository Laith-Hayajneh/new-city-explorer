import React from 'react';
import axios from 'axios';
import './App.css'
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchedCity: '',
      laith:'laith',
      showMap:false,
      errorMessage:false

    };

  };
  
  // GET https://us1.locationiq.com/v1/search?key=pk.43301b87841c92376db8e188046b8660&q=SEARCH_STRING&format=json


  getLocation=async (e)=> {
    e.preventDefault();
    await this.setState({
      searchedCity: e.target.city.value
    });
    console.log( 'sdsdsdsd');
    console.log(this.state.searchedCity);

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONKEY}&q=${this.state.searchedCity}&format=json`;
    try {
      let resData = await axios.get(url);
      console.log('responws',resData.data);

      this.setState({
        cityData:resData.data[0],
        showMap:true
      })
    } catch  {
      this.setState({
        errorMessage:true
      })
      
    }

  } 


  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <h2>city Name : {this.state.cityData.display_name}</h2>
        <form onSubmit={this.getLocation} id='form1'>
          <input id='citName' type="text" placeholder='name of the city' name='city' />
          <input type="submit" value='search city' />
        </form>

        {this.state.showMap &&  <img id='' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONKEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt="" />}
        {this.state.errorMessage &&
       <p>something error when getting informations</p> }
      </>
    )
  }

};

export default App