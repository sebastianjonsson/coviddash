import React, { Component } from 'react'
import { Card, CardBody, Row } from 'reactstrap'

export default class CovidCard extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <Row> {this.props.covidText} </Row>
                    <Row> {this.props.covidCases} </Row>
                </CardBody>
            </Card>
        )
    }
}
