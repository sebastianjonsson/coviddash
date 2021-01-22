import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import ActionCreator from '../actions/actionCreator';
import { CovidStore } from '../stores/covidStore';
import StoreFactory from '../stores/storeFactory';
import './covidDash.css';
import './covidDashMobile.css';
import logo from '.././image/corona.jpg';
import CountryDropDownSelect from '../components/countryDropDownSelect';
import CountryCard from '../countryCards/countryCard';
import CovidTable from '../covidTable/covidTable';
import CovidNews from '../covidNews/covidNews';

export default class CovidDash extends Component {
    constructor(props) {
        super(props)

        this.store = StoreFactory.getInstanceOf(CovidStore);

        this.state = {
            covid: this.store.get(),
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
                <Col md={{ span: 1, offset: 2 }}>
                    <CountryDropDownSelect
                        countries={this.state.covid.map((country => country.country))}
                        defaultvalue={"Sweden"}
                        onChange={this.handleChange}
                        isMobile={false}
                    />
                    <Row>
                        {this.state.selectedCountriesStats.map((selectedCountry, index) =>
                            <CountryCard
                                key={index}
                                selectedCountry={selectedCountry}
                                isMobile={false}
                            />
                        )}
                    </Row>
                </Col>
            </Container>
        }
        else {
            dash =
                <Container>
                    <Col xs={{ offset: 2 }}>
                        <Row>
                            <Col className="covidTrackerSizeMobile covidTrackerFontMobile ml-2">
                                Corona Tracker
                            <img src={logo} width="90" height="90" alt=""></img>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="mt-1">
                        <CountryDropDownSelect
                            countries={this.state.covid.map((country => country.country))}
                            defaultvalue={"Sweden"}
                            onChange={this.handleChange}
                            isMobile={true}
                        />
                    </Col>
                    <Col className="mt-3">
                        <CovidTable
                            countries={this.state.selectedCountriesStats}
                        />
                    </Col>
                    <Col>
                        <CovidNews />
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