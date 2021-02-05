import React, { Component } from 'react'
import { Row, Table } from 'reactstrap'
import { toCommas } from '../components/helper';
import './covidTable.css';

export default class CovidTable extends Component {
    render() {
        return (
            <Row className="tableSize">
                <Table dark>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th style={{ color: "#08cf08" }}>Cases</th>
                            <th style={{ color: "#e6ff01" }}>Tests</th>
                            <th style={{ color: "#ff0101" }}>Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.countries.map((selectedCountry, index) =>
                            <tr key={index}>
                                <th scope="row">{selectedCountry.country}</th>
                                <td className="covidFontSizeMobile">{toCommas(selectedCountry.cases)}</td>
                                <td className="covidFontSizeMobile">{toCommas(selectedCountry.tests)}</td>
                                <td className="covidFontSizeMobile">{toCommas(selectedCountry.deaths)}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        )
    }
}
