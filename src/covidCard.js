import React, { Component } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import './covidCard.css';

export default class CovidCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Card className="covidCardSize border-0 ml-5 mr-5">
                <CardBody style={{color: this.props.color}} className="covidCardColor">
                    <Row>
                        <Col className="textCenter covidTextColor covidTextFont covidFontSizeText">
                            {this.props.covidText}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="textCenter covidTextFont covidFontSizeNumbers">
                            {this.props.covidCases}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}
