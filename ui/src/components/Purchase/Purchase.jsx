import React, { Component } from "react";
import PurchaseHtml from "./Purchase.html";

import { getCurrenciesData, purchaseCurrency } from "../../services/Api.service";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

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
            formattedNote: "",
            formattedNoteLength: 0,
            editorState: EditorState.createEmpty(),
            acceptTransaction: false,
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

    // Step 1 functions
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

    // Step 2 functions
    handleInputChange = (e, text) => {
        this.setState({
            [text]: e.target.value
        })
    }

    updateEditorState = (editorState) => {
        this.setState({
            editorState
        })

        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const formattedNote = draftToHtml(
            rawContentState
        );
        const contentStateLength = contentState.getPlainText().length

        this.setState({
            editorState,
            formattedNoteLength: contentStateLength,
            formattedNote
        });
    }

    // Step 3 functions
    handleConfirmCheckboxChange = (event) => {
        this.setState({
            acceptTransaction: event.target.checked
        })
    }

    confirmTransaction = () => {
        const data = {
            purchaseCurrency: this.state.selectedCurrency.name,
            purchaseAmount: this.state.purchaseAmount,
            formattedNote: this.state.formattedNote,
            sellAmount: this.state.sellAmount,
            date: Date.now()
        }

        purchaseCurrency(data).then(() => {
        }).catch(error => {
        })
    }

    isButtonDisabled = (activeStep) => {
        if ((activeStep === 0 && this.state.purchaseAmount) || activeStep === 1 || (activeStep === 2 && this.state.acceptTransaction)) {
            return false;
        }
        return true;
    }

    resetData = () => {
        this.setState({
            purchaseAmount: "",
            sellAmount: "0.00",
            selectedCurrency: null,
            selectedRate: null,
            formattedNote: "",
            formattedNoteLength: 0,
            acceptTransaction: false,
            editorState: EditorState.createEmpty()
        }, () => {
            //Get "new" currency rates - set timeouts again
            this.getInitialData();
        })
    }

    render() {
        return (
            <PurchaseHtml
                data={this.state}
                handleDropdownChange={this.handleDropdownChange}
                handleAmountChange={this.handleAmountChange}
                handleInputChange={this.handleInputChange}
                updateEditorState={this.updateEditorState}
                handleConfirmCheckboxChange={this.handleConfirmCheckboxChange}
                confirmTransaction={this.confirmTransaction}
                resetData={this.resetData}
                isButtonDisabled={this.isButtonDisabled}
            />
        )
    }
}

export default PurchaseComponent;