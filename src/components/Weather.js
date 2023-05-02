import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        // console.log(this.props.data, 'w2232323');
        return (
            <div>
                       <h2>weather data</h2>:
                {this.props.show && this.props.data.data.map((item, index) => {
                    return <div id='cards' key={index}>
                        <Card style={{ width: '18rem' }}>
                           
                            <Card.Body>
                                <Card.Title>{this.props.data.city_name}</Card.Title>
                                <Card.Text>
                                <span>{item.weather.description}</span>
                                <span>{item.datetime}</span>
                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>



                   
                      
                    </div>

                })}

            </div>
        );
    }
}

export default Weather;