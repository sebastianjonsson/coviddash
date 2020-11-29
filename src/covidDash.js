import React, { Component } from 'react'
import { ButtonDropdown, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
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
            covid: this.covid.get(),
            dropDownToggleIsOpen: false
        };

        this.toggleDropDown = this.toggleDropDown.bind(this);
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

    toggleDropDown() {
        this.setState({ dropDownToggleIsOpen: !this.state.dropDownToggleIsOpen });
    }

    render() {
        if (this.state.covid.country === "Sweden") {
            var country = "Sverige";
        }

        this.state.covid.map((country) =>
            console.log(country.country));

        return (
            <Container>
                <Col md={{ span: 6, offset: 5 }}>
                    <Row>
                        <Col className="covidTrackerSize covidTrackerFont">
                            <Row>Corona</Row>
                            <Row>Tracker</Row>
                        </Col>
                    </Row>
                </Col>
                <Col md={{ span: 6, offset: 3 }}>
                    <ButtonDropdown isOpen={this.state.dropDownToggleIsOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle caret color="primary" isOpen={this.toggleDropDown}>
                            Land
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.covid.map((report) =>
                                <DropdownItem>
                                    {report.country}
                                </DropdownItem>
                            )};
                        </DropdownMenu>
                    </ButtonDropdown>
                    <Row className="mt-4">
                        <CovidCard
                            covidText={"Bekräftade"}
                            covidCases={this.state.covid.cases}
                            color={"#08cf08"}
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
            </Container>
        )
    }
}