import React, { Component } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { toCommas } from './components/helper';
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

        var dash;
        if (!this.state.matches) {
            dash =
                <Card className="covidCardSize border-0 ml-4">
                    <CardBody style={{ color: this.props.color }} className="covidCardColor">
                        <Row>
                            <Col className="textCenter covidTextColor covidTextFont covidFontSizeText">
                                {this.props.covidText}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="textCenter covidTextFont covidFontSizeNumbers">
                                {numbers ? numbers : "No data"}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
        }

        else {
            dash =
                <Card className="covidCardSizeMobile mt-2 border-0">
                    <CardBody style={{ color: this.props.color }} className="covidCardColor">
                        <Row>
                            <Col className="textCenter covidTextColor covidTextFont covidFontSizeTextMobile">
                                {this.props.covidText}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="textCenter covidTextFont covidFontSizeNumbersMobile">
                                {numbers ? numbers : "No data"}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
        }

        return (
            <>
                {dash}
            </>
        )
    }
}
