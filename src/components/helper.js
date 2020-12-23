export function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function mapArrayToSelect(countries) {
    countries = countries.map(country => ({
        label: country,
        value: country
    }))

    return countries;
}

export function mapToSelect(country) {
    country = [{
        label: country,
        value: country
    }]

    return country;
}