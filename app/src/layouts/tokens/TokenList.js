import React, { Component } from "react";
import { Alert, Col, Image, Panel, Row } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";

export function TokenList(props) {
    let tokenList = props.items.map(e => (
        <Row key={e.tokenId}>
            <Col>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title>
                            <Glyphicon glyph="th-large">
                                Asset Image
                            </Glyphicon>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body style={{height: '130px'}}>
                        <div style={{position: 'relative'}}>
                            <Image src={e.f} className="Emoji-img"></Image>
                            <Image src={e.e} className="Emoji-img"></Image>
                            <Image src={e.m} className="Emoji-img"></Image>
                            <p className="Token-desc">
                                Token ID: EMJ - {e.tokenId}
                            </p>
                        </div>
                    </Panel.Body>
                    <Panel.Footer>
                    </Panel.Footer>
                </Panel>
            </Col>
        </Row>
    ))

    if (tokenList.length === 0) {
        tokenList = <Alert bsStyle="warning">
            <strong>You have no token!!! Please mint your own NFT!!!</strong>
        </Alert>
    }

    return tokenList;
}