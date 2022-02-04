import React, { Component } from "react";
import { generateStore } from "@drizzle/store";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";
import { BrowserRouter as Router } from "react-router-dom";

import drizzleOptions from "./drizzleOptions";
import Home from "./home";

import "./App.css";
import store from './store';

class App extends Component {
    
    render() {
        return (
            <DrizzleProvider options={drizzleOptions} store={store}>
                <LoadingContainer>
                    <Router>
                        <Home/>
                    </Router>
                </LoadingContainer>
            </DrizzleProvider>
        );
    }
}

export default App;