import React, { Component } from 'react';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from 'reactstrap';
import '../covidDash.css';

export default class CountryDropdown extends Component {
    render() {
        return (
            <ButtonDropdown className="dropDownButtonSize" isOpen={this.props.toggleOpen} toggle={this.props.toggle}>
                <DropdownToggle caret color="primary">
                    {this.props.isSelected ? this.props.isSelected : 'Select a country'}
                </DropdownToggle>
                <DropdownMenu className="dropDownSize">
                    <Input
                        className="form-control"
                        value={this.props.value}
                        type="text"
                        placeholder="Search..."
                        onChange={this.props.onChange}>
                    </Input>
                    {this.props.covidCountries.map((report) =>
                        <DropdownItem onClick={() => this.props.getCountry(report.country)}>
                            {report.country}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}
