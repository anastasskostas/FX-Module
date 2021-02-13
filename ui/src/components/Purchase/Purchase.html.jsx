import React from 'react';
import { Button, Step, Stepper, StepLabel, Typography, makeStyles } from '@material-ui/core';

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
                <></>
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
                                <Button variant="contained" color="primary" onClick={handleNext}>
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