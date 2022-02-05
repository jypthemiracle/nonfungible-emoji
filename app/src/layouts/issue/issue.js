import React, { Component } from "react";
import PropTypes from "prop-types";
import { Glyphicon } from "react-bootstrap";
import Asset from "./Asset.js";
import { FaceShape } from "../../utils/emojiConst";

import { Grid, Row, Col, Panel, Radio, Alert } from 'react-bootstrap';

import '../../css/bootstrap/css/bootstrap.min.css';

class Issue extends Component {

    constructor(props, context) {
        super(props);
        this.emoji = this.props.emoji;
        this.contracts = context.drizzle.contracts;
        this.deedToken = this.contracts.DeedToken;
    }

    handleOptionClick = () => {
        //
    }

    //     this.dataKey = this.deedToken.methods.totalSupply.cacheCall();
    // componentDidMount = () => {
    // }

    // handleClick = () => {
    //     this.totalSupply = this.props.DeedToken.totalSupply[this.dataKey].value;
    // }

    // handleSayHello = () => {
    //     this.props.onClickSayHello(this.input.value);

    // }

    render() {

        const face = FaceShape.map(f => {
            return <Radio value={f.value} 
            checked={this.props.emoji.f === f.value}
            onChange={this.handleOptionClick()} name="f" key={f.value} inline={true} >{f.name}
            </Radio>
        })

        return (
            <Grid fluid={true} className="container">
                <Row>
                    <Col>
                        <Asset emoji={this.props.emoji}></Asset>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Panel bsStyle="success">
                            <Panel.Heading>
                                <Panel.Title>
                                    <Glyphicon glyph="file" /> Token Creation
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="custom-align-center">
                                {face}
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

// legacy context API
// The legacy API will continue working for all 16.x releases.
Issue.contextTypes = {
    drizzle: PropTypes.object
}

export default Issue;