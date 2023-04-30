import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
class Movies extends React.Component {

    render() {
        console.log(this.props.data, 'movies');
        return (
            <div>
                {this.props.show && this.props.data.results.map((item, index) => {
                    return <div id='movie' key={index}>

                        <Card  style={{ width: '18rem' }}>

                            <Card.Body>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    <span>{item.overview}</span>
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

export default Movies;