import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import axios from "axios";


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast("Rating recorded successfully!");

class RatingComponent extends Component {

    state = {
        rate: '',
        senator: 0,
        loaderOn: false
    }


    handleChange = (newRating) => {
        this.setState({
            rate: parseInt(newRating),
            senator: this.props.politician
        })
    }
    toggleLoaderOn = () => {
        this.setState({
            loaderOn: true
        })
    }
    toggleLoaderOff = () => {
        this.setState({
            loaderOn: false
        })
    }
    handleSubmit = () => {
        this.toggleLoaderOn()
        axios.post(`http://127.0.0.1:8000/api/v1/votes`, this.state)
            .then(response => {
                if (response.status === 201) {
                    this.props.toggleRead()
                    this.toggleLoaderOff()
                    notify()
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const {loaderOn} = this.state
        return (
            <div>
                <ReactStars classNames="mx-auto"
                            count={5}
                            onChange={this.handleChange}
                            size={24}
                            activeColor="#ffd700"
                />
                <div className="btn btn-primary btn-sm col text-center" onClick={this.handleSubmit}>
                    {
                        loaderOn ? <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> : `Rate`
                    }


                </div>
            </div>
        )
    }
}

export default RatingComponent