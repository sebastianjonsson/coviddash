import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ActionCreator from './actions/actionCreator';
import CovidCard from './covidCard';
import { CovidStore } from './stores/covidStore';
import StoreFactory from './stores/storeFactory';
import './covidDash.css';

export default class CovidDash extends Component {
    constructor(props) {
        super(props)

        this.covid = StoreFactory.getInstanceOf(CovidStore);

        this.state = {
            covid: this.covid.get()
        }
    }

    componentDidMount() {
        ActionCreator.loadCovid();

        this.covid.subscribe("CovidStore", () => {
            this.setState({ covid: this.covid.get() })
        })
    }

    componentWillUnmount() {
        this.covid.unsubscribe("CovidStore");
    }

    render() {
        if (this.state.covid.country === "Sweden") {
            var country = "Sverige";
        }
        return (
            <Col md={{ span: 6, offset: 3 }}>
                <Row>{country} Invånare: {this.state.covid.population}</Row>
                <Row>
                    <CovidCard
                        covidText={"Bekräftade"}
                        covidCases={this.state.covid.cases}
                        color = {"#08cf08"}
                    />
                    <CovidCard
                        covidText={"Testade"}
                        covidCases={this.state.covid.tests}
                        color={"#e6ff01"} />
                </Row>
                <Row className="mt-5">
                    <CovidCard
                        covidText={"Kritiskt sjuka"}
                        covidCases={this.state.covid.critical}
                        color="#ff01ff" />

                    <CovidCard
                        covidText={"Döda"}
                        covidCases={this.state.covid.deaths}
                        color="#ff0101" />
                </Row>
            </Col>
        )
    }
}