// Stencil.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography, Button} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function Stencil(props) {
    const {
        onAddShape,
        setFieldType,
        setZone,
        setRedLine,
        onDeleteAllShapes,
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
    const handleDeleteAllShapes = () => {
        onDeleteAllShapes();
    };

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
    const theme = createTheme({
        palette: {
          punky: {
            main: '#D37733',
            contrastText: '#FFFFFF'
          },
          kellyGreen: {
            main: '#2ABC7A',
            contrastText: '#FFFFFF'
          },
          purple: {
            main: '#7A3E87',
            contrastText: '#FFFFFF'
          },
          sharpRed:{
            main: '#FF1D25',
            contrastText: '#FFFFFF'
          },
          mustard: {
            main: '#E0B555',
            contrastText: '#FFFFFF'
          },
          ramsBlue: {
            main: '#2B76BA',
            contrastText: '#FFFFFF'
          },
          pitchBlack: {
            main: '#000000',
            contrastText: '#FFFFFF'
          },
          matteBlack:{
            main: '#342F2A',
            contrastText: '#FFFFFF'
          },
          stone:{
            main: '#E6E6E6',
            contrastText: '#FFFFFF'
          },
          white:{
            main: '#FFFFFF',
            contrastText: '#FFFFFF'
          },
        },
        // You can customize other aspects of the theme here
        // For example: typography, spacing, breakpoints, etc.
      });

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
                <Typography style={{ fontSize: '12px', color: 'white' }}>{children}</Typography>
            }
            labelPlacement="start"
            style={{ display: 'flex', alignItems: 'center' }}
        />
    );

    return (
        <>
          <ThemeProvider theme={theme}>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                    <Button variant="contained" color = "punky" size="small" onClick={handleAddStar}  sx={{ borderColor: 'white', color: 'white'}} >Add Star</Button>
                    <Button variant="contained" color = "mustard" size="small" onClick={handleAddRectangle}  sx={{ borderColor: 'white', color: 'white' }}>Add Rectangle</Button>
                    <Button variant="text" color = "kellyGreen" size="small" onClick={handleAddCircle}  sx={{ borderColor: 'white', color: 'white' }}>Add Circle</Button>
                    <Button variant="outlined"  color = "ramsBlue" size="small" onClick={handleAddRing}  /*sx={{ borderColor: 'turquoise', color: 'turquoise'}}*/>Add Ring</Button>
                    <Button variant="contained"  color = "purple" size="small" onClick={handleAddOffense2x2}  >2x2</Button>
                    <Button variant="contained"  color="sharpRed" size= "small"   onClick={handleDeleteAllShapes}> Clear All</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white'}}>
                <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Field</h3>
            <div style={{ display: 'flex',justifyContent: "flex-start" , flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-6px'}}>
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
                    {selectedFieldType !== 'blank'  && selectedFieldType === 'nfl' && (<CheckboxOption onChange={handleToggleRedLine} checked={redLine}>NFL Red Line</CheckboxOption>)}
                </div>
                </div>
            </div>
                <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Offense Formation</h3>
                <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Defense Formation</h3>
                <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Lines</h3>
                <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>QB Progression</h3>
                <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Text Tags</h3>
            </div>
                </div>
                </ThemeProvider>
        </>
    );
}

export default Stencil;