import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Row } from 'reactstrap'
import CovidCard from './covidCard'
import './countryCard.css';

export default class CountryCard extends Component {
    render() {
        return (
            <Card className="countryCardSize mt-3">
                <CardHeader className="textCenter"> {this.props.selectedCountry.country} </CardHeader>
                <CardBody className="covidCardColor">
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
                    <Row className="">
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
