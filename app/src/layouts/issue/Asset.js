import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Glyphicon, Panel } from "react-bootstrap";
import getImgSrc from "../../utils/emojiUtils";

const Asset = (props) => {

    const faceImg = getImgSrc(props.emoji.f, 'f');

    const eyeImg = getImgSrc(props.emoji.e, 'e');

    const mouthImg = getImgSrc(props.emoji.m, 'm');

    const AssetImg = <Panel bsStyle="primary">
        <Panel.Heading>
            <Panel.Title>
                <Glyphicon glyph="th-large">
                    Asset Image
                </Glyphicon>
            </Panel.Title>
        </Panel.Heading>
        <Panel.Body style={{height: '130px'}}>
            <div style={{position: 'relative'}}>
                <Image src={faceImg} width="150" height="100" className="Emoji-img"></Image>
                <Image src={eyeImg}  width="150" height="100" className="Emoji-img"></Image>
                <Image src={mouthImg}  width="150" height="100" className="Emoji-img"></Image>
            </div>
        </Panel.Body>
    </Panel>

    return AssetImg;
}

export default Asset;