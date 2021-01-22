import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { toCommas } from '../components/helper';
import './covidCard.css';
import './covidCardMobile.css';

export default class CovidCard extends Component {
    render() {
        var numbers = this.props.covidCases;

        if (numbers !== null) {
            numbers = toCommas(numbers);
        }

        return (
            <>
                <Col className="covidTextColor covidTextFont covidFontSize">
                    <Row>
                        <Col className="text-center mt-3">
                            {this.props.covidText}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ color: this.props.color }} className="text-center">
                            {numbers ? numbers : "No data"}
                        </Col>
                    </Row>
                </Col>
            </>
        )
    }
}
