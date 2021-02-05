import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ActionCreator from '../actions/actionCreator';
import { CovidNewsStore } from '../stores/CovidNewsStore';
import StoreFactory from '../stores/storeFactory';
import "./covidNews.css";
import Collapsible from 'react-collapsible';

export default class CovidNews extends Component {
    constructor(props) {
        super(props)

        this.store = StoreFactory.getInstanceOf(CovidNewsStore);

        this.state = {
            news: this.store.get()
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
        console.log(this.state.news);
        return (
            <>
                {this.state.news.map((news) =>
                    <Collapsible className="textColor newsFontSizeMobile" trigger={<Button className="newsFontSizeMobile buttonSize">{news.Title}</Button>}>
                        <p className="textColor newsFontSizeMobile mt-2">
                            {news.Summary}
                        </p>
                    </Collapsible>
                )}
            </>
        )
    }
}
