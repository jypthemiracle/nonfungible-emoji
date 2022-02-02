import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainContainer from './MainContainer';
// import IpfsContainer from "./layouts/ipfs/IpfsContainer";


class Home extends Component {
    render() {
        return (
            <div>
                <Route exact path={"/"} component={MainContainer}/>
            </div>
        );
    }
}

export default Home