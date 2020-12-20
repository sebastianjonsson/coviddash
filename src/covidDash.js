import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import ActionCreator from './actions/actionCreator';
import CovidCard from './covidCard';
import { CovidStore } from './stores/covidStore';
import StoreFactory from './stores/storeFactory';
import './covidDash.css';
import './covidDashMobile.css';
import logo from './image/corona.jpg';
import CountryDropDownSelect from './components/countryDropDownSelect';
import CountryCard from './countryCard';

export default class CovidDash extends Component {
    constructor(props) {
        super(props)

        this.store = StoreFactory.getInstanceOf(CovidStore);

        this.state = {
            covid: this.store.get(),
            covidStats: [],
            matches: window.matchMedia("(max-width: 768px)").matches,
            selectedCountriesStats: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.FindCountriesStatsBySelected = this.FindCountriesStatsBySelected.bind(this);
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(max-width: 768px)").addListener(handler);

        ActionCreator.loadCovidCountries();

        this.store.subscribe("CovidStore", () => {
            this.setState({ covid: this.store.get() })
            var data = this.FindCountriesStatsBySelected(this.state.covid, "Sweden");
            this.setState({ selectedCountriesStats: [data] });
        });
    }

    componentWillUnmount() {
        this.store.unsubscribe("CovidStore");
    }

    FindCountriesStatsBySelected(countryStatsArray, selectedCountries) {
        console.log(countryStatsArray, selectedCountries);
        return countryStatsArray.find((countryStats) => {
            return countryStats.country === selectedCountries;
        })
    }

    handleChange(event) {
        if (!event) {
            this.setState({ selectedCountriesStats: [] })
            return;
        }
        var countryStatsArray = this.state.covid;
        var data = event.map((country => this.FindCountriesStatsBySelected(countryStatsArray, country.value)));
        this.setState({ selectedCountriesStats: data });
    }

    render() {
        console.log(this.state.selectedCountriesStats);
        var dash;
        if (!this.state.matches) {
            dash = <Container className="mt-5">
                <Col md={{ offset: 3 }}>
                    <Row className="ml-3">
                        <Col className="covidTrackerSize covidTrackerFont">
                            <Row>Corona Tracker</Row>
                        </Col>
                    </Row>
                </Col>
                    <Col md={{span: 1, offset: 2}}>
                        {/* <img className="ml-3" src={logo} width="250" alt=""></img> */}
                        <CountryDropDownSelect
                            countries={this.state.covid.map((country => country.country))}
                            defaultvalue={"Sweden"}
                            onChange={this.handleChange}
                        />
                        <Row>
                            {this.state.selectedCountriesStats.map((selectedCountry) =>
                                <CountryCard
                                    selectedCountry={selectedCountry}
                                />
                            )}
                        </Row>
                    </Col>
            </Container >
        }
        else {
            dash = <Container>
                <Col className="ml-2">
                    <Col className="covidTrackerSizeMobile covidTrackerFontMobile">
                        <Row>Corona Tracker</Row>
                    </Col>
                </Col>
                <Col xs={{ offset: 3 }}>
                    <Row>
                        <img className="ml-4" src={logo} width="150" height="150" alt=""></img>
                    </Row>
                </Col>
                <Col className="ml-2">
                </Col>
                <Col>
                    <Row>
                        <CovidCard
                            covidText={"Cases"}
                            covidCases={this.state.covidStats.cases || null}
                            color={"#08cf08"}
                        />
                        <CovidCard
                            covidText={"Tests"}
                            covidCases={this.state.covidStats.tests || null}
                            color={"#e6ff01"} />
                    </Row>
                    <Row className="mt-5">
                        <CovidCard
                            covidText={"Critical"}
                            covidCases={this.state.covidStats.critical || null}
                            color="#ff01ff" />

                        <CovidCard
                            covidText={"Deaths"}
                            covidCases={this.state.covidStats.deaths || null}
                            color="#ff0101" />
                    </Row>
                </Col>
            </Container>
        }
        return (
            <>
                {dash}
            </>
        )
    }
}