import React, {Component} from 'react';
import axios from "axios";
import {ArrowDownCircleFill, GeoAlt, HouseFill, PersonCheck, PersonCircle} from "react-bootstrap-icons";
import RatingComponent from "./Rating";
import RatingDisplayComponent from "./displayRating";


class Senator extends Component{
    state = {
        senator: "",
        edit: false,
        rating: 0,
        clickedComp: null
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://127.0.0.1:8000/api/v1/votes?seat=senate`)
            .then(
                (response) => {
                    this.setState({
                        senator: response.data,
                    })
                }
            )
    }
    toggleEdit = (clickeCompId) => {
        this.setState({
            edit: true,
            clickedComp: clickeCompId
        })
    }
    toggleRead = (clickeCompId) => {
        this.setState({
            edit: false,
            clickedComp: clickeCompId
        })
    }


    render() {
        console.log(this.state)
        const {senator, edit, clickedComp} = this.state
        return(
            <div>
                {
                    senator ?
                        <div className="card mt-5 w-25 mx-auto">
                            <div className="text-center profile-image-div border-bottom my-auto mx-auto mt-2 mb-2">
                                <img className="profile-image" src={senator.img_url} alt="profile"/>
                            </div>
                                <div className="card-body text-left mt-2">
                                    <PersonCircle className="mb-2"/>
                                    <p className="profile-name">{senator.name.replace("Sen.", "")}</p>
                                    <GeoAlt className="mb-2"/>
                                    <p className="profile-county">{senator.county}</p>
                                    <HouseFill className="mb-2"/>
                                    <p className="profile-party">{senator.party}</p>
                                    <PersonCheck className="mb-2"/>
                                    <p className="profile-field-status">{senator.field_status}</p>
                                </div>
                            {
                                edit && (clickedComp === senator.id) ?
                                    <RatingComponent key={senator.id} politician={senator.id}
                                                     toggleRead={() => this.toggleRead(senator.id)}
                                                     toggleToast={() => this.toggleToast()}
                                    /> :
                                    <RatingDisplayComponent key={senator.id}
                                                            toggleEdit={() => this.toggleEdit(senator.id)}
                                                            rating={senator.rating}/>
                            }
                        </div>
                    : null
                }
            </div>
        )
    }
}

export default Senator;