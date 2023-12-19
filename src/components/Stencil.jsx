// Stencil.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography, Button, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';

function Stencil(props) {
    const {
        onAddShape,
        fieldType,
        setFieldType,
        setZone,
        zone,
        setRedLine,
        redLine,
        onDeleteAllShapes,
    } = props;
    const [selectedOffenseFormation, setSelectedOffenseFormation] = useState(""); 
    const [selectedDefenseFormation, setSelectedDefenseFormation] = useState("");
    const [RFormation, setRFormation] = useState(false);

    const handleOffenseFormationToggleGroup = (e) => {
        var newFormation = e.target.value;
        setSelectedOffenseFormation(newFormation);

        (RFormation) ? newFormation+='R' : newFormation+='L';
        console.log(newFormation);
        if (newFormation === 'bunchL') {
            onAddShape('bunchL', 'orange');
        }
        else if (newFormation === 'bunchR') {

        }
        else if (newFormation === '3x1L')
        {

        }
        else if (newFormation === '3x1R') {
        }
        else if (newFormation === 'emptyL') {

        }
        else if(newFormation === 'emptyR') {

        }
        else if (newFormation === 'custom') {

        }


    };

    const handleToggleOffenseR = () => {
        const newRFormation = !RFormation;
        setRFormation(newRFormation);
    };

    const handleSetDefenseFormationToggleGroup = (e) => {
        var newFormation = e.target.value;
        setSelectedDefenseFormation(newFormation);
        
        if(newFormation === '4-3')
        {

        }
        else if (newFormation === '3-4') {

        }
        else if (newFormation === '4-2-5') {

        }
        else if (newFormation === '3-3Stack') {

        }
        else if (newFormation === 'custom') {

        }
    };

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
        const newFieldType = e.target.value;
        setFieldType(newFieldType);
    };
    const handleToggleRedZone = () => {
        const newZone = zone === 'middle' ? 'redzone' : 'middle';
        // console.log(newZone);
        setZone(newZone);
    };
    const handleToggleRedLine = () => {
        const newRedLine = !redLine;
        setRedLine(newRedLine);
    };

    // Formation handlers
    const handleAddOffense2x2 = () => {
        onAddShape('offense2x2', 'orange');
    }

    //TODOS:
    //handleAddOffenseEmptyLeft
    //handleAddOffenseEmptyRight
    //handleAddOffenseBunchLeft
    //handleAddOffenseBunchRight
    //handleAddOffenseCustom (just put all players on the 30 yd line)

    const handleAddOffense3x1 = () => {
        (RFormation) ? onAddShape('offense3x1R', 'orange') : onAddShape('offense3x1L', 'orange');
    }

    // Components for the stencil
    const CheckboxOption = ({ onChange, children, checked }) => (
        <FormControlLabel
            control={<Switch size="small" onChange={onChange} checked={checked} style={{ color: 'white', display: 'flex' }} />}
            label={
                <Typography style={{ fontSize: '12px', color: 'white', fontFamily: 'Inter, sans-serif' }}>{children}</Typography>
            }
            labelPlacement="start"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        />
    );

    return (
        <>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <Button variant="outlined" color="punky" size="small" onClick={handleAddStar} sx={{ padding: '1px 5px', borderRadius: '0px', fontSize: '0.7rem' }}>Add Star</Button>
                    <Button variant="outlined" color="mustard" size="small" onClick={handleAddRectangle} sx={{ padding: '1px 5px', borderRadius: '0px', fontSize: '0.7rem' }}>Add Rectangle</Button>
                    <Button variant="outlined" color="kellyGreen" size="small" onClick={handleAddCircle} sx={{ padding: '1px 5px', borderRadius: '0px', fontSize: '0.7rem' }}>Add Circle</Button>
                    <Button variant="outlined" color="ramsBlue" size="small" onClick={handleAddRing} sx={{ padding: '1px 5px', borderRadius: '0px', fontSize: '0.7rem' }}>Add Ring</Button>
                    <Button variant="outlined" color="purple" size="small" onClick={handleAddOffense2x2} sx={{ padding: '1px 5px', borderRadius: '0px', fontSize: '0.7rem' }}>2x2</Button>
                    <Button variant="outlined" color="sharpRed" size="small" onClick={handleDeleteAllShapes} sx={{ padding: '1px 5px', borderRadius: '0px', fontSize: '0.7rem' }}>Clear All</Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white' }}>
                    <h3 style={{ marginBottom: '2px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Field</h3>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <ToggleButtonGroup onChange={handleSetFieldType} exclusive aria-label="field type" sx={{ gap: '10px', flexWrap: 'wrap' }}>
                                    <ToggleButton value="hs" aria-label="high school" style={{
                                        background: fieldType === "hs" ? 'white' : '#333',
                                        color: fieldType === "hs" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        HIGH SCHOOL
                                    </ToggleButton>
                                    <ToggleButton value="college" aria-label="college" style={{
                                        background: fieldType === "college" ? 'white' : '#333',
                                        color: fieldType === "college" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        COLLEGE
                                    </ToggleButton>
                                    <ToggleButton value="nfl" aria-label="nfl" style={{
                                        background: fieldType === "nfl" ? 'white' : '#333',
                                        color: fieldType === "nfl" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        NFL
                                    </ToggleButton>
                                    <ToggleButton value="blank" aria-label="blank" style={{
                                        background: fieldType === "blank" ? 'white' : '#333',
                                        color: fieldType === "blank" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        BLANK
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <div style={{ display: 'flex', gap: '25px', padding: '10px', marginLeft: '-25px', flexWrap: 'wrap' }}>
                                {fieldType !== 'blank' && (
                                    <CheckboxOption onChange={handleToggleRedZone} checked={ zone ==='redzone'}>Red Zone</CheckboxOption>
                                )}
                                {fieldType !== 'blank' && fieldType=== 'nfl' && (<CheckboxOption onChange={handleToggleRedLine} checked={redLine}>NFL Red Line</CheckboxOption>)}
                            </div>

                        </div>
                    </div>




                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <h3 style={{ marginBottom: '0px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Offense Formation
                            <div style={{ display: 'flex', justifyContent: "flex-start", marginLeft: '-22px', alignItems: 'center', padding: '10px', fontWeight: 500 }}>
                                <CheckboxOption onChange={handleToggleOffenseR} checked={RFormation}> L</CheckboxOption>
                                <span style={{ display: 'flex', marginLeft: '11px', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}> R </span>
                            </div>
                        </h3>
                    </div>

                    <div style={{ display: 'flex', justifyContent: "flex-start", flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <ToggleButtonGroup onChange={handleOffenseFormationToggleGroup} exclusive aria-label="offense formation" style={{ gap: '10px', flexWrap: 'wrap' }}>
                                    <ToggleButton value="bunch" aria-label="BUNCH" style={{ 
                                        background: selectedOffenseFormation === "bunch" ? 'white' : '#333',
                                        color:  selectedOffenseFormation === "bunch" ?  '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>

                                        BUNCH
                                    </ToggleButton>
                                    <ToggleButton value="3x1" aria-label="3X1" style={{
                                        background: selectedOffenseFormation === "3x1" ? 'white' : '#333',
                                        color: selectedOffenseFormation === "3x1" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        3X1
                                    </ToggleButton>
                                    <ToggleButton value="empty" aria-label="EMPTY" style={{
                                        background: selectedOffenseFormation === "empty" ? 'white' : '#333',
                                        color:  selectedOffenseFormation === "empty" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        EMPTY
                                    </ToggleButton>


                                    <ToggleButton value="2x2" aria-label="2X2" onClick={handleAddOffense2x2} style={{
                                        background: selectedOffenseFormation === "2x2" ? 'white' : '#333',
                                        color:  selectedOffenseFormation === "2x2" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        2X2
                                    </ToggleButton>

                                    <ToggleButton value="custom" aria-label="blank" style={{
                                        background: selectedOffenseFormation === "custom" ? 'white' : '#333',
                                        color: selectedOffenseFormation === "custom" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        CUSTOM
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>


                    <h3 style={{ marginBottom: '2px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Defense Formation</h3>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <ToggleButtonGroup onChange={handleSetDefenseFormationToggleGroup} exclusive aria-label="defense formation" sx={{ gap: '10px', flexWrap: 'wrap' }}>
                                    <ToggleButton value="4-3" aria-label="4-3" style={{
                                        background: selectedDefenseFormation === "4-3" ? 'white' : '#333',
                                        color: selectedDefenseFormation === "4-3" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        4-3
                                    </ToggleButton>
                                    <ToggleButton value="3-4" aria-label="3-4" style={{
                                        background: selectedDefenseFormation === "3-4" ? 'white' : '#333',
                                        color: selectedDefenseFormation === "3-4" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        3-4
                                    </ToggleButton>
                                    <ToggleButton value="4-2-5" aria-label="4-2-5" style={{
                                        background: selectedDefenseFormation === "4-2-5" ? 'white' : '#333',
                                        color: selectedDefenseFormation === "4-2-5" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        4-2-5
                                    </ToggleButton>
                                    <ToggleButton value="3-3Stack" aria-label="3-3Stack" style={{
                                        background: selectedDefenseFormation === "3-3Stack" ? 'white' : '#333',
                                        color: selectedDefenseFormation === "3-3Stack" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        3-3 STACK
                                    </ToggleButton>
                                    <ToggleButton value="custom" aria-label="blank" style={{
                                        background: selectedDefenseFormation === "custom" ? 'white' : '#333',
                                        color: selectedDefenseFormation === "custom" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                                    }}
                                        sx={{
                                            ':hover': {
                                                background: 'white',
                                                color: '#333',
                                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        CUSTOM
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>




                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Lines</h3>



                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>QB Progression</h3>


                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Text Tags</h3>



                </div>
            </div>
        </>
    );
}

export default Stencil;