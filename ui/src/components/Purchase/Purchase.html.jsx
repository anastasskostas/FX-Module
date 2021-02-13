import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Button, Step, Stepper, StepLabel, Typography, makeStyles } from '@material-ui/core';
import Select from 'react-select'
import { currencySymbols } from '../../utils/CurrencySymbols';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Currency', 'Notes', 'Confirm'];
}

function getStepContent(stepIndex, props) {
    switch (stepIndex) {
        case 0:
            return (
                <Row className="justify-content-md-center">
                    <Col lg="6" md="9" xs="12">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="font-weight-bold">Buy</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend style={{ width: props.data.selectedCurrency ? 200 : "100%" }}>
                                        <Select
                                            value={props.data.selectedCurrency}
                                            options={props.data.currencies}
                                            onChange={(e) => props.handleDropdownChange('selectedCurrency', e)}
                                            getOptionLabel={(option) => {
                                                return (
                                                    <>
                                                        <span className={`align-middle mr-2 currency-flag currency-flag-${option.name.toLowerCase()}`}></span>
                                                        <span>{option.name}({currencySymbols[option.name]})</span>
                                                    </>
                                                )
                                            }}
                                            getOptionValue={(option) => option.name}
                                            isClearable={true}
                                            isSearchable={false}
                                            styles={customStyles}
                                            isLoading={props.data.isLoadingCurrencies}
                                            placeholder="Select currency"
                                        />
                                    </InputGroup.Prepend>
                                    {props.data.selectedCurrency &&
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter amount"
                                            aria-label="purchaseAmount"
                                            value={props.data.purchaseAmount}
                                            onChange={(event) => { props.handleAmountChange(event, 'purchaseAmount') }}
                                            isInvalid={props.data.insufficientBalance}
                                            disabled={!props.data.selectedCurrency}
                                            autoComplete="off"
                                        />
                                    }
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="font-weight-bold">Sell</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text style={{ width: 200 }}>
                                            <span className={`align-middle mr-2 currency-flag currency-flag-gbp`}></span>
                                            <span>GBP</span>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="number"
                                        placeholder=""
                                        aria-label="sellAmount"
                                        aria-describedby="basic-addon1"
                                        value={props.data.sellAmount}
                                        disabled={true}
                                        autoComplete="off"
                                    />
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Latest updated time: {props.data.time}
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            );
        case 1:
            return (
                <></>
            )
        case 2:
            return (
                <></>
            )
        default:
            return 'Unknown stepIndex';
    }
}

const customStyles = {
    container: (provided) => ({
        ...provided,
        width: '100%'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "whitesmoke"
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "whitesmoke"
    }),
}

function PurchaseHtml(props) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>Transaction is completed.</Typography>
                        <Button variant="contained" color="primary" onClick={handleReset}>Buy Again</Button>
                    </div>
                ) : (
                        <div>
                            <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep, props)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext} disabled={props.isButtonDisabled(activeStep)}>
                                    {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default PurchaseHtml;