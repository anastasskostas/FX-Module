import React, { Component } from "react";
import HistoryHtml from "./History.html";
import { getCurrenciesData, getTransactions } from "../../services/Api.service";
import { AddDays, ConvertDateToMilliseconds } from "../../utils/DateFormat";


class HistoryComponent extends Component {

    constructor() {
        super();
        this.state = {
            allTransactions: [],
            transactions: [],
            searchCollapse: false,
            isLoadingTransactions: false,
            isLoadingCurrencies: false,
            transactionDateFrom: null,
            transactionDateTo: null,
            selectedCurrency: null,
            currencies: []
        }
    }

    componentDidMount() {
        this.getInitialData();
    }

    handleSearchCollapse = () => {
        this.setState((prevState) => ({
            searchCollapse: !prevState.searchCollapse
        }));
    }

    getInitialData = () => {
        this.setState({ isLoadingTransactions: true, isLoadingCurrencies: true });
        Promise.all([getTransactions(), getCurrenciesData()]).then(responses => {
            this.setState({
                allTransactions: responses[0].data,
                transactions: responses[0].data,
                time: responses[1].time,
                currencyRates: responses[1].currencyRates,
                currencies: responses[1].currencies
            })
        }).catch(error => {
        }).finally(() => {
            this.setState({ isLoadingTransactions: false, isLoadingCurrencies: false });
        })
    }

    handleDropdownChange = name => value => {
        this.setState({
            [name]: value,
        })
    }

    handleDatePickerChange = (date, text) => {
        this.setState({
            [text]: date
        })
    }

    handleSearch = () => {
        this.setState({ isLoadingTransactions: true });
        const { allTransactions, transactionDateFrom, transactionDateTo, selectedCurrency } = this.state;

        const dateFrom = ConvertDateToMilliseconds(transactionDateFrom)
        const dateTo = ConvertDateToMilliseconds(AddDays(transactionDateTo, 1))

        const transactions = allTransactions.filter(transaction =>
            (!transactionDateFrom || transaction.date > dateFrom) &&
            (!transactionDateTo || transaction.date < dateTo) &&
            (!selectedCurrency || transaction.purchaseCurrency === selectedCurrency?.name)
        )

        this.setState({
            transactions,
            isLoadingTransactions: false
        })
    }

    handleReset = () => {
        this.setState({
            transactionDateFrom: null,
            transactionDateTo: null,
            selectedCurrency: null
        }, () => {
            this.handleSearch();
        })
    }

    render() {
        return (
            <HistoryHtml
                data={this.state}
                handleSearchCollapse={this.handleSearchCollapse}
                handleDatePickerChange={this.handleDatePickerChange}
                handleDropdownChange={this.handleDropdownChange}
                handleSearch={this.handleSearch}
                handleReset={this.handleReset}
            />
        )
    }
}

export default HistoryComponent;