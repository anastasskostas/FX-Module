import React from 'react';
import { Button as BootstrapButton, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Button, Step, Stepper, StepLabel, Typography, makeStyles } from '@material-ui/core';
import Select from 'react-select'
import { currencySymbols } from '../../utils/CurrencySymbols';
import RichEditor from '../Shared/RichEditor/RichEditor';
import ReactHtmlParser from 'react-html-parser';

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
                            <Form.Group controlId="formBuy">
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

                            <Form.Group controlId="formSell">
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
                                    Latest updated time: {props.data.dateTime}
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            );
        case 1:
            return (
                <Row className="justify-content-md-center">
                    <Col xs="12" lg="8">
                        {props.data.isPlainText ?
                            <Form>
                                <Form.Group controlId="formNote">
                                    <Form.Control maxLength="160" as="textarea" rows="5" type="text" value={props.data.formattedNote} placeholder="Add a note..." onChange={(event) => { props.handleInputChange(event, 'formattedNote') }} />
                                    <Form.Text className="text-danger">
                                        {props.data.formattedNote.length} characters (Maximum 160).
                                    </Form.Text>
                                </Form.Group>
                            </Form> :
                            <div className="editorContainer">
                                <div className="editors">
                                    <RichEditor editorState={props.data.editorState} updateEditorState={props.updateEditorState} />
                                    <span className="text-danger">{props.data.formattedNoteLength} characters (Maximum 160).</span>
                                </div>

                                <BootstrapButton className="float-right" variant="link" onClick={props.usePlainText}>Issue? Use plain text.</BootstrapButton>
                            </div>
                        }
                    </Col>
                </Row>
            )
        case 2:
            return (
                <>
                    <Row className="justify-content-md-center">
                        <Col xs="2" sm="2" md="1"><strong>Buy:</strong></Col>
                        <Col xs="10" sm="6" md="6">{props.data.selectedCurrency.name} {parseFloat(props.data.purchaseAmount).toFixed(2)}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs="2" sm="2" md="1"><strong>Sell:</strong></Col>
                        <Col xs="10" sm="6" md="6">GBP {props.data.sellAmount}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs="2" sm="2" md="1"><strong>Note:</strong></Col>
                        <Col xs="10" sm="6" md="6">{ReactHtmlParser(props.data.formattedNote)}</Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs="12" md="8">
                            <input
                                type="checkbox"
                                name="confirm-transaction-checkbox"
                                checked={props.data.acceptTransaction}
                                onChange={(event) => props.handleConfirmCheckboxChange(event)}
                                className="mr-2 pointer"
                            />
                            <label>
                                Complete purchase? <span className="text-danger">*</span>
                            </label>
                        </Col>
                    </Row>
                </>
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
        if (activeStep === steps.length - 1) {
            props.confirmTransaction()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        props.resetData();
    };

    return (
        <div className={classes.root}>
            <div className="text-right">Time Remaining: {props.data.time.m < 10 && '0'}{props.data.time.m}:{props.data.time.s < 10 && '0'}{props.data.time.s}</div>
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