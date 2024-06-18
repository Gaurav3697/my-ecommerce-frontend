import React, { Fragment } from 'react';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';


const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
        },
        {
            label: <Typography>Confirm Order</Typography>,
        },
        {
            label: <Typography>Payment</Typography>,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <Fragment>
                <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                    {steps.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                                }}
                                icon={item.icon}
                            >
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
        </Fragment>
    )
}

export default CheckOutSteps