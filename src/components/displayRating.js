import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import axios from "axios";
import {
    Pencil
} from 'react-bootstrap-icons';

class RatingDisplayComponent extends Component {

    state = {
        votes: [],
        updated: false
    }
    

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/v1/votes?seat=senate`)
            .then(response => {
                this.setState({
                    votes: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <div className="mx-auto">
                <div className="row">
                    <ReactStars
                        count={5}
                        onChange={this.handleChange}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                        value={this.props.rating}
                    />
                    <Pencil className="mt-2 pl-1" onClick={this.props.toggleEdit}/>
                </div>

            </div>
        )
    }
}

export default RatingDisplayComponent;