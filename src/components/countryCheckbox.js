import React, { Component } from 'react'
import { Input } from 'reactstrap'

export default class CountryCheckbox extends Component {
    render() {
        return (
            <Input
                type="checkbox"
                checked={this.props.checked}
                country={this.props.country}
                onChange={this.props.onChange}
            />
        )
    }
}
