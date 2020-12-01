import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import ActionCreator from './actions/actionCreator';
import CovidCard from './covidCard';
import { CovidStore } from './stores/covidStore';
import StoreFactory from './stores/storeFactory';
import './covidDash.css';
import { CovidStatsStore } from './stores/covidStatsStore';
import CountryDropdown from './components/countryDropdown';

export default class CovidDash extends Component {
    constructor(props) {
        super(props)

        this.store = StoreFactory.getInstanceOf(CovidStore);
        this.store.stats = StoreFactory.getInstanceOf(CovidStatsStore);

        this.state = {
            covid: this.store.get(),
            dropDownToggleIsOpen: false,
            searchText: '',
            isSelected: '',
            covidStats: []
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
        this.setState({ isSelected: country });

        ActionCreator.loadCovidStats(country);

        this.store.stats.subscribe("CovidStatsStore", () => {
            this.setState({ covidStats: this.store.stats.get() })
        })
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
                    <CountryDropdown
                        toggleOpen={this.state.dropDownToggleIsOpen}
                        toggle={this.toggleDropDown}
                        isSelected={this.state.isSelected}
                        value={this.state.searchText}
                        onChange={this.onSearch}
                        covidCountries={this.state.covid}
                        getCountry={this.getCovidForCountry}
                    />
                </Col>
                <Col md={{ span: 6, offset: 3 }}>
                    <Row className="mt-4">
                        <CovidCard
                            covidText={"Bekräftade"}
                            covidCases={this.state.covidStats.cases || null}
                            color={"#08cf08"}
                        />
                        <CovidCard
                            covidText={"Testade"}
                            covidCases={this.state.covidStats.tests || null}
                            color={"#e6ff01"} />
                    </Row>
                    <Row className="mt-5">
                        <CovidCard
                            covidText={"Kritiskt sjuka"}
                            covidCases={this.state.covidStats.critical || null}
                            color="#ff01ff" />

                        <CovidCard
                            covidText={"Döda"}
                            covidCases={this.state.covidStats.deaths || null}
                            color="#ff0101" />
                    </Row>
                </Col>
            </Container>
        )
    }
}