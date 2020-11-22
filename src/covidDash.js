import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Row } from 'reactstrap';
import ActionCreator from './actions/actionCreator';
import CovidCard from './covidCard';
import { CovidStore } from './stores/covidStore';
import StoreFactory from './stores/storeFactory';

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
        return (
            <>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFUmehnneHwuzye9MHBLtT0S7Uk8gipZ7SxQ&usqp=CAU" alt=""></img>
                <Card>
                    <CardHeader>
                        <Row>{this.state.covid.country}</Row>
                        <Row>Invånare: {this.state.covid.population}</Row>
                    </CardHeader>
                    <CardBody>
                        <CovidCard
                            covidText={"Bekräftade"}
                            covidCases={this.state.covid.cases}
                        />
                        <CovidCard
                            covidText={"Testade"}
                            covidCases={this.state.covid.tests} />
                        <CovidCard
                            covidText={"Kritiskt sjuka"}
                            covidCases={this.state.covid.critical} />

                        <CovidCard
                            covidText={"Döda"}
                            covidCases={this.state.covid.deaths} />
                    </CardBody>
                </Card>
            </>
        )
    }
}