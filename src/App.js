import React from 'react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Senators from "./components/Senators";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Senator from "./components/Senator";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path="/senators" component={Senators}/>
                    <Route exact path="/senators/:id" component={Senator}/>
                </Switch>
                {/*<Footer/>*/}

            </BrowserRouter>

        </div>
    );
}

export default App;
