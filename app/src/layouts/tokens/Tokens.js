import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from 'react-bootstrap';

import '../../css/bootstrap/css/bootstrap.min.css'
import '../../App.css'
import getImgSrc from "../../utils/emojiUtils";

class Tokens extends Component { 

    state = {
        items: []
    }
    
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.deedToken = this.contracts.DeedToken;
    }

    getTokenList = async () => {
        const totalSupply = await this.deedToken.methods.totalSupply().call();
        let items = await [...Array(totalSupply).keys()].reduce(async (acc, cur, idx) => {
            let t = await this.deedToken.methods.tokenByIndex(idx).call();
            if (await this.deedToken.methods.ownerOf(t).call() === this.props.accounts[0]) {
                let asset = await this.deedToken.methods.allTokens(t).call();
                console.log(asset)
                acc.push({
                    f: getImgSrc(asset.x, 'f'),
                    e: getImgSrc(asset.y, 'e'),
                    m: getImgSrc(asset.z, 'm'),
                    tokenId: t
                });
            }
            return acc
        }, [])

        console.log(items);


        // let items;
        // let t;
        // let asset = null;
        // // being instead of using cacheCall, one can use call with async-await pattern in language level
        // const totalSupply = await this.deedToken.methods.totalSupply().call();
        // for (let j = 0; j < totalSupply; j++) {
        //     t = await this.deedToken.methods.tokenByIndex(j).call();
        //     if (await this.deedToken.methods.ownerOf(t).call() === this.props.accounts[0]) {
        //         asset = await this.deedToken.methods.allTokens(t).call();
        //         console.log(asset)
        //         items.push({
        //             f: getImgSrc(asset.x, 'f'),
        //             e: getImgSrc(asset.y, 'e'),
        //             m: getImgSrc(asset.z, 'm'),
        //             tokenId: t
        //         });
        //     }
        // }
        this.setState({items})
    }
    
    componentDidMount() {
        console.log(this.deedToken);
        this.getTokenList();
    }

    render() {
        return (
            <Grid fluid={true} className="container">
                <div>Token List</div>
            </Grid>
        )
    }
}

Tokens.contextTypes = {
    drizzle: PropTypes.object
}

export default Tokens;