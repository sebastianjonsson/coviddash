import React, { Component } from 'react';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from 'reactstrap';
import '../covidDash.css';
import '../covidDashMobile.css';
import CountryCheckbox from './countryCheckbox';

export default class CountryDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: window.matchMedia("(max-width: 768px)").matches,
            checked: false
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(max-width: 768px)").addListener(handler);
    }

    onChange(event) {
        var checked = event.target.checked;

        this.setState({ checked: checked });
    }

    render() {
        var dropdown;
        if (!this.state.matches) {
            dropdown = <ButtonDropdown className="dropDownButtonSize" isOpen={this.props.toggleOpen} toggle={this.props.toggle}>
                <DropdownToggle caret color="primary">
                    {this.props.isSelected ? this.props.isSelected : 'Select a country'}
                </DropdownToggle>
                <DropdownMenu className="dropDownSize">
                    <DropdownItem header>
                        <Input
                            type='button'
                            value="Compare selected"
                        />
                        <Input
                            className="form-control"
                            value={this.props.value}
                            type="text"
                            placeholder="Search..."
                            onChange={this.props.onChange}>
                        </Input>
                    </DropdownItem>
                    <DropdownItem divider />
                    {this.props.covidCountries.map((report) =>
                        <DropdownItem key={report.country} onClick={() => this.props.getCountry(report.country)}>
                            <CountryCheckbox
                                checked={this.state.checked}
                                onChange={this.onChange}
                                country={report.country}
                            />
                            {report.country}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </ButtonDropdown>
        }
        else {
            dropdown = <ButtonDropdown className="dropDownButtonSizeMobile" isOpen={this.props.toggleOpen} toggle={this.props.toggle}>
                <DropdownToggle caret color="primary">
                    {this.props.isSelected ? this.props.isSelected : 'Select a country'}
                </DropdownToggle>
                <DropdownMenu className="dropDownSizeMobile">
                    <Input
                        className="form-control"
                        value={this.props.value}
                        type="text"
                        placeholder="Search..."
                        onChange={this.props.onChange}>
                    </Input>
                    {this.props.covidCountries.map((report) =>
                        <DropdownItem key={report.country} onClick={() => this.props.getCountry(report.country)}>
                            {report.country}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </ButtonDropdown>
        }
        return (
            <>
                {dropdown}
            </>
        )
    }
}
