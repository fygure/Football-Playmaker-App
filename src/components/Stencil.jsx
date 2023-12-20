// Stencil.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography, Button, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';

function Stencil(props) {
    const {
        onAddFormation,
        onAddShape,
        fieldType,
        setFieldType,
        setZone,
        zone,
        setRedLine,
        redLine,
        onDeleteAllShapes,
        onChangeFormation,
    } = props;
    const [selectedOffenseFormation, setSelectedOffenseFormation] = useState("");
    const [selectedDefenseFormation, setSelectedDefenseFormation] = useState("");
    const [toggleOffenseLeftRight, setToggleOffenseLeftRight] = useState(false); // false = Left 
    const [toggleDefenseLeftRight, setToggleDefenseLeftRight] = useState(false);

    const shapeColor = 'white';

    // Formation handlers
    const handleOffenseFormationToggleGroup = (e) => {
        var newFormation = e.target.value;
        setSelectedOffenseFormation(newFormation);

        if (newFormation === '2x2') {
            onAddFormation('offense2x2', shapeColor);
        } else if (newFormation === 'Bunch') {
            (toggleOffenseLeftRight) ? onAddFormation('offenseBunchR', shapeColor) : onAddFormation('offenseBunchL', shapeColor);
        } else if (newFormation === '3x1') {
            (toggleOffenseLeftRight) ? onAddFormation('offense3x1R', shapeColor) : onAddFormation('offense3x1L', shapeColor);
        }
        else if (newFormation === 'Empty') {
            (toggleOffenseLeftRight) ? onAddFormation('offenseEmptyR', shapeColor) : onAddFormation('offenseEmptyL', shapeColor);
        }
        else if (newFormation === 'Custom') {
            onAddFormation('offenseCustom', shapeColor);
        }
    };

    const handleSetDefenseFormationToggleGroup = (e) => {
        var newFormation = e.target.value;
        setSelectedDefenseFormation(newFormation);

        if (newFormation === '4-3') {
            (toggleDefenseLeftRight) ? onAddFormation('defense4-3R', shapeColor) : onAddFormation('defense4-3L', shapeColor);
        }
        else if (newFormation === '3-4') {
            (toggleDefenseLeftRight) ? onAddFormation('defense3-4R', shapeColor) : onAddFormation('defense3-4L', shapeColor);
        }
        else if (newFormation === '4-2-5') {
            (toggleDefenseLeftRight) ? onAddFormation('defense4-2-5R', shapeColor) : onAddFormation('defense4-2-5L', shapeColor);
        }
        else if (newFormation === '3-3Stack') {
            (toggleDefenseLeftRight) ? onAddFormation('defense3-3StackR', shapeColor) : onAddFormation('defense3-3StackL', shapeColor);
        }
        else if (newFormation === 'Custom') {
            onAddFormation('defenseCustom', shapeColor);
        }
    };

    // Toggle handlers
    const handleToggleOffenseLeftRight = () => {
        const newtoggleOffenseLeftRight = !toggleOffenseLeftRight;
        setToggleOffenseLeftRight(newtoggleOffenseLeftRight);
        const suffix = newtoggleOffenseLeftRight ? 'R' : 'L';

        //console.log(selectedOffenseFormation, suffix);
        if (['3x1', 'Bunch', 'Empty'].includes(selectedOffenseFormation)) {
            onAddFormation(`offense${selectedOffenseFormation}${suffix}`, shapeColor);
        }
    };

    const handleToggleDefenseLeftRight = () => {
        const newtoggleDefenseLeftRight = !toggleDefenseLeftRight;
        setToggleDefenseLeftRight(newtoggleDefenseLeftRight);
        const suffix = newtoggleDefenseLeftRight ? 'R' : 'L';


        if (['3-3Stack', '4-2-5', '4-3', '3-4'].includes(selectedDefenseFormation)) {
            console.log(selectedDefenseFormation, suffix);
            onAddFormation(`defense${selectedDefenseFormation}${suffix}`, shapeColor);
        }
    };

    // Delete handlers
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
                                    <CheckboxOption onChange={handleToggleRedZone} checked={zone === 'redzone'}>Red Zone</CheckboxOption>
                                )}
                                {fieldType !== 'blank' && fieldType === 'nfl' && (<CheckboxOption onChange={handleToggleRedLine} checked={redLine}>NFL Red Line</CheckboxOption>)}
                            </div>

                        </div>
                    </div>




                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <h3 style={{ marginBottom: '0px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Offense Formation
                            <div style={{ display: 'flex', justifyContent: "flex-start", marginLeft: '-22px', alignItems: 'center', padding: '10px', fontWeight: 500 }}>
                                <CheckboxOption onChange={handleToggleOffenseLeftRight} checked={toggleOffenseLeftRight}> L</CheckboxOption>
                                <span style={{ display: 'flex', marginLeft: '11px', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}> R </span>
                            </div>
                        </h3>
                    </div>

                    <div style={{ display: 'flex', justifyContent: "flex-start", flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <ToggleButtonGroup onChange={handleOffenseFormationToggleGroup} exclusive aria-label="offense formation" style={{ gap: '10px', flexWrap: 'wrap' }}>
                                    <ToggleButton value="Bunch" aria-label="BUNCH" style={{
                                        background: selectedOffenseFormation === "Bunch" ? 'white' : '#333',
                                        color: selectedOffenseFormation === "Bunch" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
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
                                    <ToggleButton value="Empty" aria-label="EMPTY" style={{
                                        background: selectedOffenseFormation === "Empty" ? 'white' : '#333',
                                        color: selectedOffenseFormation === "Empty" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
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


                                    <ToggleButton value="2x2" aria-label="2X2" style={{
                                        background: selectedOffenseFormation === "2x2" ? 'white' : '#333',
                                        color: selectedOffenseFormation === "2x2" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
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

                                    <ToggleButton value="Custom" aria-label="blank" style={{
                                        background: selectedOffenseFormation === "Custom" ? 'white' : '#333',
                                        color: selectedOffenseFormation === "Custom" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
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


                    <h3 style={{ marginBottom: '2px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Defense Formation
                        <div style={{ display: 'flex', justifyContent: "flex-start", marginLeft: '-22px', alignItems: 'center', padding: '10px', fontWeight: 500 }}>
                            <CheckboxOption onChange={handleToggleDefenseLeftRight} checked={toggleDefenseLeftRight}> L</CheckboxOption>
                            <span style={{ display: 'flex', marginLeft: '11px', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}> R </span>
                        </div>
                    </h3>
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
                                    <ToggleButton value="Custom" aria-label="blank" style={{
                                        background: selectedDefenseFormation === "Custom" ? 'white' : '#333',
                                        color: selectedDefenseFormation === "Custom" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius: '0px', fontSize: '0.7rem', transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
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