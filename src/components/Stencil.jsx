// Stencil.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';

function Stencil(props) {
    const {
        onAddShape,
        setFieldType,
        setZone,
        setRedLine
    } = props;

    const [selectedFieldType, setSelectedFieldType] = useState('college');
    const [redZone, setLocalRedZone] = useState('middle');
    const [redLine, setLocalRedLine] = useState(false);

    // Basic shape handlers
    const handleAddStar = () => {
        onAddShape('Star', 'yellow');
    };
    const handleAddRectangle = () => {
        onAddShape('Rectangle', 'red');
    };
    const handleAddCircle = () => {
        onAddShape('Circle', 'blue');
    };
    const handleAddRing = () => {
        onAddShape('Ring', 'green');
    }

    // Field handlers
    const handleSetFieldType = (e) => {
        setFieldType(e.target.value);
        setSelectedFieldType(e.target.value);
    };

    const handleToggleZone = () => {
        const newZone = redZone === 'middle' ? 'redzone' : 'middle';
        setLocalRedZone(newZone);
        setZone(newZone);
    };

    const handleToggleRedLine = () => {
        const newRedLine = !redLine;
        setLocalRedLine(newRedLine);
        setRedLine(newRedLine);
    };

    // Formation handlers
    const handleAddOffense2x2 = () => {
        onAddShape('offense2x2', 'orange');
    }

    // Components for the stencil
    const Button = ({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    );

    const RadioOption = ({ name, value, onChange, children }) => (
        <label style={{
            fontSize: '12px',
            border: '1px solid white',
            display: 'inline-block',
            fontFamily: 'Inter, sans-serif',
            padding: '5px',
            margin: '5px',
            backgroundColor: selectedFieldType === value ? 'white' : '#333',
            color: selectedFieldType === value ? '#333' : 'white'
        }}>
            <input type="radio" name={name} value={value} onChange={onChange} style={{ display: 'none' }} />
            <p style={{ margin: 0 }}>{children}</p>
        </label>
    );

    const CheckboxOption = ({ onChange, children, checked }) => (
        <FormControlLabel
            control={<Switch size="small" onChange={onChange} checked={checked} style={{ color: 'white' }} />}
            label={
                <Typography style={{ fontSize: '12px', color: 'white' }}>
                    {children}
                </Typography>
            }
            labelPlacement="start"
            style={{ display: 'flex', alignItems: 'center' }}
        />
    );

    return (
        <>
            <Button onClick={handleAddStar}>Add Star</Button>
            <Button onClick={handleAddRectangle}>Add Rectangle</Button>
            <Button onClick={handleAddCircle}>Add Circle</Button>
            <Button onClick={handleAddRing}>Add Ring</Button>
            <Button onClick={handleAddOffense2x2}>2x2</Button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white' }}>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Field</h3>


                <div style={{ display: 'flex', justifyContent: "flex-start", flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-6px' }}>
                        <div>
                            <RadioOption name="fieldType" value="hs" onChange={handleSetFieldType} >HIGH SCHOOL</RadioOption>
                            <RadioOption name="fieldType" value="college" onChange={handleSetFieldType}>COLLEGE</RadioOption>
                            <RadioOption name="fieldType" value="nfl" onChange={handleSetFieldType}>NFL</RadioOption>
                            <RadioOption name="fieldType" value="blank" onChange={handleSetFieldType}>BLANK</RadioOption>
                        </div>
                        <div style={{ display: 'flex', gap: '35px', padding: '10px', marginLeft: '-20px' }}>
                            {selectedFieldType !== 'blank' && (
                                <CheckboxOption onChange={handleToggleZone} checked={redZone === 'redzone'}>
                                    Red Zone
                                </CheckboxOption>
                            )}
                            {selectedFieldType !== 'blank' && selectedFieldType === 'nfl' && (<CheckboxOption onChange={handleToggleRedLine} checked={redLine}>NFL Red Line</CheckboxOption>)}
                        </div>
                    </div>
                </div>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Offense Formation</h3>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Defense Formation</h3>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Lines</h3>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>QB Progression</h3>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Text Tags</h3>
            </div>
        </>
    );
}

export default Stencil;