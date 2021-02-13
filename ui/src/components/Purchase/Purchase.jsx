import React, { Component } from "react";
import PurchaseHtml from "./Purchase.html";

import { getCurrenciesData } from "../../services/Api.service";

class PurchaseComponent extends Component {

    constructor() {
        super();
        this.state = {
            time: '',
            currencyRates: {},
            currencies: [],
        }
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData = () => {
        this.setState({ isLoadingCurrencies: true });
        getCurrenciesData().then(response => {
            this.setState({
                time: response.time,
                currencyRates: response.currencyRates,
                currencies: response.currencies
            })
        }).catch(error => {
        }).finally(() => {
            this.setState({ isLoadingCurrencies: false });
        })
    }


    render() {
        return (
            <PurchaseHtml
                data={this.state}
            />
        )
    }
}

export default PurchaseComponent;