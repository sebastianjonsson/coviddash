import React, { Component } from 'react'
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
import ActionCreator from './actions/actionCreator';
import CovidCard from './covidCard';
import { CovidStore } from './stores/covidStore';
import StoreFactory from './stores/storeFactory';
import './covidDash.css';

export default class CovidDash extends Component {
    constructor(props) {
        super(props)

        this.store = StoreFactory.getInstanceOf(CovidStore);

        this.state = {
            covid: this.store.get(),
            dropDownToggleIsOpen: false,
            searchText: '',
            isSelected: ''
        };

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getCovidForCountry = this.getCovidForCountry.bind(this);
    }

    componentDidMount() {
        ActionCreator.loadCovidCountries();

        this.store.subscribe("CovidStore", () => {
            this.setState({ covid: this.store.get() })
        })
    }

    componentWillUnmount() {
        this.store.unsubscribe("CovidStore");
    }

    toggleDropDown() {
        this.setState({ dropDownToggleIsOpen: !this.state.dropDownToggleIsOpen });
    }

    onSearch(event) {
        this.setState({ searchText: event.currentTarget.value });

        this.__filterCountries(event.currentTarget.value.toLowerCase());
    }

    __filterCountries(searchTerm) {
        if (!searchTerm) {
            this.setState({ covid: this.store.get() });

            return;
        }

        var filtered = this.store.get().filter((x) => x.country && x.country.toLowerCase().indexOf(searchTerm) !== -1);

        this.setState({ covid: filtered });
    }

    getCovidForCountry(country) {
        console.log(country);
        this.setState({ isSelected: country});
    }

    render() {
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
                <Col md={{ span: 6, offset: 4 }}>
                    <ButtonDropdown className="dropDownButtonSize" isOpen={this.state.dropDownToggleIsOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle caret color="primary" isOpen={this.toggleDropDown}>
                            {this.state.isSelected ? this.state.isSelected : 'Select a country'}
                        </DropdownToggle>
                        <DropdownMenu className="dropDownSize">
                            <Input
                                className="form-control"
                                value={this.state.searchText}
                                type="text"
                                placeholder="Search..."
                                onChange={this.onSearch}>
                            </Input>
                            {this.state.covid.map((report) =>
                                <DropdownItem onClick={() => this.getCovidForCountry(report.country)}>
                                    {report.country}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
                <Col md={{ span: 6, offset: 3 }}>
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