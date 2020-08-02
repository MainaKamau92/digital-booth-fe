import React, {Component} from "react";
import axios from 'axios';

import {
    ArrowDownCircleFill,
    PersonCircle,
    GeoAlt,
    HouseFill,
    PersonCheck,
} from 'react-bootstrap-icons';
import RatingComponent from "./Rating";
import RatingDisplayComponent from "./displayRating";
import Alert from "./Alert";

const AUTH_TOKEN = "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibWFpbmFrIiwiZXhwIjoxNjA2MTUyNjE0fQ.YYSN_mDMRBpINwfP1Gzm48A8FQg6_7xsBXnMo8JES5Y"
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


class Senators extends Component {
    state = {
        info: {},
        senators: [],
        pageNumbers: [],
        currentPage: 0,
        rating: 0,
        edit: false,
        clickedComp: null
    }

    numbers = (num) => {
        const numsArray = []
        for (let i = 0; i < num; i++) {
            numsArray.push(i)
        }
        numsArray.shift()
        return numsArray
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


    componentWillMount() {
        axios.get(`http://127.0.0.1:8000/api/v1/votes?seat=senate`)
            .then(
                (response) => {
                    this.setState({
                        senators: response.data,
                        info: {
                            count: response.headers.count,
                            pages: response.headers.pages,
                            next: response.data.next,
                            prev: response.data.previous
                        },
                        pageNumbers: this.numbers(response.headers.pages)
                    })
                }
            )
    }

    handleClick = (page) => {
        this.setState({
            currentPage: page
        })
        axios.get(`http://127.0.0.1:8000/api/v1/senators?page=${page}`)
            .then(
                (response) => {
                    this.setState({
                        senators: response.data
                    })
                }
            )
    }


    render() {
        const {senators, pageNumbers, currentPage, edit, clickedComp} = this.state
        console.log(this.state)
        return (
            <div className="container">
                <Alert/>

                <div className="row mx-auto mt-5">
                    {
                        senators ? senators.map(senator =>
                            <section key={senator.senator.id}>
                                <div className="card p-0 h-100">
                                    <div className="card-body p-0">
                                        <div className="text-center profile-image-div border-bottom my-auto mx-auto">
                                            <img className="profile-image" src={senator.senator.img_url} alt="profile"/>
                                        </div>
                                        <div className="profile-bio text-left pl-2 mt-3">
                                            <PersonCircle className="mb-2"/>
                                            <p className="profile-name">{senator.senator.name.replace("Sen.", "")}</p>
                                            <GeoAlt className="mb-2"/>
                                            <p className="profile-county">{senator.senator.county}</p>
                                            <HouseFill className="mb-2"/>
                                            <p className="profile-party">{senator.senator.party}</p>
                                            <PersonCheck className="mb-2"/>
                                            <p className="profile-field-status">{senator.senator.field_status}</p>
                                        </div>
                                    </div>
                                    {
                                        edit && (clickedComp === senator.senator.id) ?
                                            <RatingComponent key={senator.senator.id} politician={senator.senator.id}
                                                             toggleRead={() => this.toggleRead(senator.senator.id)}
                                                             toggleToast={() => this.toggleToast()}
                                            /> :
                                            <RatingDisplayComponent key={senator.id}
                                                                    toggleEdit={() => this.toggleEdit(senator.senator.id)}
                                                                    rating={senator.rating}/>
                                    }

                                    <div className="card-footer mb-2 border-top pt-2 pl-0 bg-transparent">
                                        <div className="row mx-auto">
                                            <div className="col">
                                                <p>Raters: 100</p>
                                            </div>
                                            <div className="col"></div>
                                            <div className="col mr-auto">
                                                <ArrowDownCircleFill/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : null
                    }
                </div>
                <nav aria-label="Page navigation example" className="mt-5 w-50">
                    <ul className="pagination">
                        {
                            pageNumbers.map((page) => <li
                                className={`page-item ${currentPage === page ? 'active' : null}`} key={page}
                                onClick={() => this.handleClick(page)}><span
                                className="page-link">{page}</span></li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Senators;