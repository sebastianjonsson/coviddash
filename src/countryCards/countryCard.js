import React, { Component } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import CovidCard from '../covidCard/covidCard';
import './countryCard.css';
import './countryCardMobile.css';

export default class CountryCard extends Component {
    render() {
        var isMobile = this.props.isMobile;
        return (
            <Card className={isMobile ? "countryCardSizeMobile" : "countryCardSize mt-3"}>
                <CardBody className="covidCardColor">
                    <Row>
                        <Col className="text-center covidTextColor">
                            {this.props.selectedCountry.country}
                        </Col>
                    </Row>
                    <Row>
                        <CovidCard
                            covidText={"Cases"}
                            covidCases={this.props.selectedCountry.cases || null}
                            color={"#08cf08"}
                        />
                        <CovidCard
                            covidText={"Tests"}
                            covidCases={this.props.selectedCountry.tests || null}
                            color={"#e6ff01"} />
                    </Row>
                    <Row>
                        <CovidCard
                            covidText={"Critical"}
                            covidCases={this.props.selectedCountry.critical || null}
                            color="#ff01ff"
                        />
                        <CovidCard
                            covidText={"Deaths"}
                            covidCases={this.props.selectedCountry.deaths || null}
                            color="#ff0101" />
                    </Row>
                </CardBody>
            </Card>
        )
    }
}
