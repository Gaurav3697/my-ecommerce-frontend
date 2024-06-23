import { Fragment } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

export default function TestComponents() {
    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <div className="h-screen w-screen m-auto">
            <h1>Test Components</h1>
            <Box sx={{ width: 300 }}>
                <Slider
                    // getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </Box>
            </div>
        </Fragment>
    );
}
