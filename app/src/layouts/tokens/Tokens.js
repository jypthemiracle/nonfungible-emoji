import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from 'react-bootstrap';

import '../../css/bootstrap/css/bootstrap.min.css'
import '../../App.css'
import getImgSrc from "../../utils/emojiUtils";
import { TokenList } from "./TokenList";

class Tokens extends Component { 

    state = {
        items: [],
        flag: false,
        tokenId: null,
        buttonType: null
    }
    
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.deedToken = this.contracts.DeedToken;
    }

    getTokenList = async () => {
        // TODO: why not undefined?
        // const totalSupply = parseInt(await this.deedToken.methods.totalSupply().call());
        // let items = await [...Array(totalSupply).keys()].reduce(async (acc, cur, idx) => {
        //     const prevResult = await acc.then();
        //     console.log("idx", idx)
        //     let t = await this.deedToken.methods.tokenByIndex(idx).call();
        //     if (await this.deedToken.methods.ownerOf(t).call() === this.props.accounts[0]) {
        //         let asset = await this.deedToken.methods.allTokens(t).call();
        //         let now = {
        //             f: getImgSrc(asset.x, 'f'),
        //             e: getImgSrc(asset.y, 'e'),
        //             m: getImgSrc(asset.z, 'm'),
        //             tokenId: t
        //         };
        //         (await prevResult).push(now);
        //         return Promise.resolve(prevResult);
        //     }
        // }, Promise.resolve([]))

        // console.log(items);


        let items = [];
        let t;
        let asset = null;
        // being instead of using cacheCall, one can use call with async-await pattern in language level
        const totalSupply = await this.deedToken.methods.totalSupply().call();
        for (let j = 0; j < totalSupply; j++) {
            t = await this.deedToken.methods.tokenByIndex(j).call();
            if (await this.deedToken.methods.ownerOf(t).call() === this.props.accounts[0]) {
                asset = await this.deedToken.methods.allTokens(t).call();
                console.log(asset)
                items.push({
                    f: getImgSrc(asset.x, 'f'),
                    e: getImgSrc(asset.y, 'e'),
                    m: getImgSrc(asset.z, 'm'),
                    tokenId: t
                });
            }
        }
        this.setState({items})
        return items;
    }
    
    componentDidMount() {
        console.log(this.deedToken);
        this.getTokenList();
    }

    handleTransfer = (e) => {
        this.showInputAddress(e.target.id, 'T');
    }

    showInputAddress = (tokenId, buttonType) => {
        if (!this.state.flag) {
            this.setState({
                flag: true,
                tokenId,
                buttonType
            })
            return;
        }
        this.setState({
            flag: false,
            tokenId,
            buttonType
        })
        return;
    }

    handleBurn = (e) => {
        console.log('YEAH', e.target);
        const tokenId = e.target.id;
        this.deedToken.methods.burn.cacheSend(tokenId);
    }

    render() {
        return (
            <Grid fluid={true} className="container">
                <TokenList items={this.state.items} 
                    flag={this.state.flag} 
                    tokenId={this.state.tokenId} 
                    buttonType={this.state.buttonType} 
                    handleTransfer={this.handleTransfer} 
                    handleBurn={this.handleBurn}>
                </TokenList>
            </Grid>
        )
    }
}

Tokens.contextTypes = {
    drizzle: PropTypes.object
}

export default Tokens;