import React, { Component } from 'react';
import PropType from 'prop-types';
import { Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

class SendToken extends Component {

    constructor(props, context) {
        super(props);
        this.state = context.drizzle.store.getState();
        this.contracts = context.drizzle.contracts;
        this.deedToken = this.contracts.DeedToken;
    }

    handleSubmit = () => {
        const tokenId = this.props.tokenId;
        const buttonType = this.props.buttonType;
        const from = this.state.accounts[0];
        const to = this.toAddress.value;

        if (buttonType === 'T') { // transferFrom
            this.deedToken.methods.transferFrom.cacheSend(from, to, tokenId);
            return;
        }
        if (buttonType === 'A') {
            this.deedToken.methods.approve.cacheSend(from, to);
            return;
        }
        return;
    }

    render () {
        if (this.props.flag) {
            console.log("FLAGGGGG", this.props.flag)
            return (
                <form inline style={{marginBottom: "5px"}}>
                    <FormGroup controlled="addr">
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl type="text" 
                                        label="Text" 
                                        placeholder="Enter Ethereum Address" 
                                        style={{width: "366px"}}
                                        inputRef={ref => this.toAddress = ref}>
                            </FormControl>
                        </InputGroup>{' '}
                        <Button type="button" onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>
                </form>
            )
        }
        return <br/>
    }
}

SendToken.contextTypes = {
    drizzle: PropType.object
}

export default SendToken;
