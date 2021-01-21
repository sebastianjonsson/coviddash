import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { toCommas } from '../components/helper';
import './covidCard.css';
import './covidCardMobile.css';

export default class CovidCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: window.matchMedia("(max-width: 768px)").matches
        }
    }

    componentDidMount() {

        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(max-width: 768px)").addListener(handler);
    }

    render() {
        var numbers = this.props.covidCases;

        if (numbers !== null) {
            numbers = toCommas(numbers);
        }

        var cards;
        if (!this.state.matches) {
            cards =
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
        }

        else {
            cards =
                <>
                    <Col className="covidTextColor covidFontSizeMobile">
                        <Row>
                            <Col className="text-center mt-1">
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
        }

        return (
            <>
                {cards}
            </>
        )
    }
}
