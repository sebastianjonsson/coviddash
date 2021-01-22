import React, { Component } from 'react'
import ActionCreator from '../actions/actionCreator';
import { CovidNewsStore } from '../stores/CovidNewsStore'
import StoreFactory from '../stores/storeFactory'

export default class CovidNews extends Component {
    constructor(props) {
        super(props)

        this.store = StoreFactory.getInstanceOf(CovidNewsStore);

        this.state = {
            news: this.store.get(),
        }
    }

    componentDidMount() {
        ActionCreator.loadCovidNews();

        this.store.subscribe("CovidNewsStore", () => {
            this.setState({ news: this.store.get() })
        });
    }

    componentWillUnmount() {
        this.store.unsubscribe("CovidNewsStore");
    }

    render() {
        return (
            <>
            </>
        )
    }
}
