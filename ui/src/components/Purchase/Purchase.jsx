import React, { Component } from "react";
import PurchaseHtml from "./Purchase.html";

import { getCurrenciesData, purchaseCurrency } from "../../services/Api.service";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import config from "../../config/config";
import { displayNotification } from '../../utils/CallsInterceptor.jsx';

const EXPIRED_TIMEOUT = 60 * 30; // Expire after 30 minutes
const WARNING_TIMEOUT = 60 * 2; // Last 120 seconds

class PurchaseComponent extends Component {

    constructor() {
        super();
        this.state = {
            dateTime: '',
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
            isPlainText: false,
            acceptTransaction: false,
            time: {},
            seconds: EXPIRED_TIMEOUT
        }
        this.timer = 0;
    }

    componentDidMount() {
        this.getInitialData();
        this.setInitialTimer();
    }

    getInitialData = () => {
        this.setState({ isLoadingCurrencies: true });
        getCurrenciesData().then(response => {
            this.setState({
                dateTime: response.time,
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

    usePlainText = () => {
        this.setState({
            isPlainText: true,
            formattedNote: '',
            formattedNoteLength: 0
        })
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
            clearInterval(this.timer);
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
            this.getInitialData(); //Get "new" currency rates
            this.setState({
                seconds: EXPIRED_TIMEOUT
            }, () => {
                this.setInitialTimer();
            })
        })
    }


    // Functions for timer
    setInitialTimer = () => {
        this.timer = 0;
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at two last minutes.
        if (seconds === WARNING_TIMEOUT) {
            displayNotification({ statusText: config.WARNING_SESSION_BODY }, true, config.WARNING_SESSION);
        }
        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            displayNotification({ statusText: config.EXPIRED_SESSION_BODY }, true, config.EXPIRED_SESSION);
            this.props.history.replace('/home');
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <PurchaseHtml
                data={this.state}
                handleDropdownChange={this.handleDropdownChange}
                handleAmountChange={this.handleAmountChange}
                handleInputChange={this.handleInputChange}
                updateEditorState={this.updateEditorState}
                usePlainText={this.usePlainText}
                handleConfirmCheckboxChange={this.handleConfirmCheckboxChange}
                confirmTransaction={this.confirmTransaction}
                resetData={this.resetData}
                isButtonDisabled={this.isButtonDisabled}
            />
        )
    }
}

export default PurchaseComponent;