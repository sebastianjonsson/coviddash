import React, { Component } from 'react';
import Select from 'react-select';
import { mapArrayToSelect, mapToSelect } from './helper';

export default class CountryDropDownSelect extends Component {
    render() {
        var countries = mapArrayToSelect(this.props.countries);
        var defaultCountry = mapToSelect(this.props.defaultvalue)

        return (
            <Select
                className={!this.props.isMobile ? "dropDownButtonSize ml-5" : null}
                defaultValue={defaultCountry}
                options={countries}
                isMulti
                onChange={this.props.onChange}
            />
        )
    }
}
