import React, { Component } from "react";
import PurchaseHtml from "./Purchase.html";

import { getCurrenciesData } from "../../services/Api.service";

class PurchaseComponent extends Component {

    constructor() {
        super();
        this.state = {
            time: '',
            purchaseAmount: "",
            sellAmount: "0.00",
            currencyRates: {},
            currencies: [],
            selectedCurrency: null,
            selectedRate: null,
            isLoadingCurrencies: false,
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

    handleDropdownChange = (name, value) => {
        const { currencyRates } = this.state;
        const selectedRate = value && (1 / currencyRates[value.name]).toFixed(4);

        this.setState({
            [name]: value,
            purchaseAmount: "",
            selectedRate,
            sellAmount: "0.00"
        })
    }

    handleAmountChange = (e, text) => {
        const input = e.target.value;

        if (!input) {
            this.setState({
                [text]: input,
                sellAmount: "0.00"
            })
        } else {
            if (/^[1-9]\d*$/.test(input)) {
                const { currencyRates, selectedRate } = this.state;
                const convertedEURAmount = selectedRate * input;
                const rateEURToGBP = currencyRates['GBP'];
                const sellAmount = (rateEURToGBP * convertedEURAmount).toFixed(2);

                this.setState({
                    [text]: input,
                    sellAmount: sellAmount
                })
            }
        }
    }

    isButtonDisabled = (activeStep) => {
        if ((activeStep === 0 && this.state.purchaseAmount)) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <PurchaseHtml
                data={this.state}
                handleDropdownChange={this.handleDropdownChange}
                handleAmountChange={this.handleAmountChange}
                isButtonDisabled={this.isButtonDisabled}
            />
        )
    }
}

export default PurchaseComponent;