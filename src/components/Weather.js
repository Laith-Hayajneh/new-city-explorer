import React from 'react';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    render() {
        console.log(this.props.data, 'w2232323');
        return (
            <div>
               
                {this.props.data.map(item => {
                   return <div>
                        
                        
                        {item.date}
                        <p></p>
                        <p>{item.desscription}</p>
                    </div>

                })}
               
            </div>
        );
    }
}

export default Weather;