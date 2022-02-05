import React, { Component } from "react";
import PropTypes from "prop-types";
import { Glyphicon } from "react-bootstrap";
import Asset from "./Asset.js";
import { EyeColor, FaceShape, MouthType } from "../../utils/emojiConst";

import { Grid, Row, Col, Panel, Radio, Alert } from 'react-bootstrap';

import '../../css/bootstrap/css/bootstrap.min.css';

class Issue extends Component {

    constructor(props, context) {
        super(props);
        this.emoji = this.props.emoji;
        this.contracts = context.drizzle.contracts;
        this.deedToken = this.contracts.DeedToken;
    }

    handleOptionClick = (e) => {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.emoji = {...this.emoji, ...obj};
        this.props.onEmojiChange(this.emoji);
    }

    mapOptions = (e, name, emoji) => {
        return <Radio key={e.value} 
                    name={name} 
                    value={e.value} 
                    inline={true} 
                    onChange={this.handleOptionClick}
                    checked={emoji === e.value}
                >{e.name}</Radio>
    }

    render() {

        const face = FaceShape.map(f => this.mapOptions(f, 'f', this.props.emoji.f));
        const eye = EyeColor.map(e => this.mapOptions(e, 'e', this.props.emoji.e));
        const mouth = MouthType.map(m => this.mapOptions(m, 'm', this.props.emoji.m));

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
                                <br/>
                                {eye}
                                <br/>
                                {mouth}
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