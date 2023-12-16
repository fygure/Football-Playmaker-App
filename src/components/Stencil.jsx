// Stencil.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography, Button,ToggleButton,ToggleButtonGroup, Grid} from '@mui/material';

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


    const [selectedOffenseFormation, setOffenseFormation] = useState(null);



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
    // const handleSetFieldType = (event, newFieldType) => {
    //     if (newFieldType !== null) {
    //         setFieldType(newFieldType);
    //         setSelectedFieldType(newFieldType);
    //     }
    // };

    const handleSetOffenseFormation = (e) => {
        console.log(e.target.value);
        setOffenseFormation(selectedOffenseFormation);
    };


    const handleToggleOffenseR = (e) => {
        console.log(e.target.value);
       
    };



    const handleToggleRedZone = () => {
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
    //OLD RADIO BUTTONS
    // const RadioOption = ({ name, value, onChange, children }) => (
    //     <label style={{
    //         fontSize: '12px',
    //         border: '1px solid white',
    //         display: 'inline-block',
    //         fontFamily: 'Inter, sans-serif',
    //         padding: '5px',
    //         margin: '5px',
    //         backgroundColor: selectedFieldType === value ? 'white' : '#333',
    //         color: selectedFieldType === value ? '#333' : 'white'
    //     }}>
    //         <input type="radio" name={name} value={value} onChange={onChange} style={{ display: 'none' }} />
    //         <p style={{ margin: 0 }}>{children}</p>
    //     </label>
    // );




    const CheckboxOption = ({ onChange, children, checked }) => (
        <FormControlLabel
            control={<Switch size="small" onChange={onChange} checked={checked} style={{ color: 'white' }} />}
            label={
                <Typography style={{ fontSize: '12px', color: 'white', fontFamily: 'Inter, sans-serif' }}>{children}</Typography>
            }
            labelPlacement="start"
            style={{ display: 'flex', alignItems: 'center' }}
        />
    );



    return (
        <>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <Button variant="outlined" color="white" size="small" onClick={handleAddStar} sx= {{ padding: '1px 5px',borderRadius:'0px',fontSize: '0.7rem'}} >Add Star</Button>
                    <Button variant="outlined" color="white" size="small" onClick={handleAddRectangle} sx= {{ padding: '1px 5px',borderRadius:'0px',fontSize: '0.7rem'}} >Add Rectangle</Button>
                    <Button variant="outlined" color="white" size="small" onClick={handleAddCircle} sx= {{ padding: '1px 5px',borderRadius:'0px',fontSize: '0.7rem'}} >Add Circle</Button>
                    <Button variant="outlined" color="white" size="small" onClick={handleAddRing} sx= {{ padding: '1px 5px',borderRadius:'0px',fontSize: '0.7rem'}} >Add Ring</Button>
                    <Button variant="outlined" color="white" size="small" onClick={handleAddOffense2x2} sx= {{ padding: '1px 5px',borderRadius:'0px',fontSize: '0.7rem'}}  >2x2</Button>
                    <Button variant="outlined" color="sharpRed" size="small" onClick={handleDeleteAllShapes} sx= {{ padding: '1px 5px',borderRadius:'0px',fontSize: '0.7rem'}} > Clear All</Button>
                </div>



                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white' }}>
                    <h3 style={{ marginBottom: '2px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Field</h3>
                    <div style={{ display: 'flex', justifyContent: "flex-start", flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    {/* <RadioOption name="fieldType" value="hs" onChange={handleSetFieldType} >HIGH SCHOOL</RadioOption>
                                    <RadioOption name="fieldType" value="college" onChange={handleSetFieldType}>COLLEGE</RadioOption>
                                    <RadioOption name="fieldType" value="nfl" onChange={handleSetFieldType}>NFL</RadioOption>
                                    <RadioOption name="fieldType" value="blank" onChange={handleSetFieldType}>BLANK</RadioOption> */}
                                    <ToggleButtonGroup onChange={handleSetFieldType} exclusive aria-label="field type" sx = {{gap: '10px'}}>
                                    <ToggleButton value="hs" aria-label="high school" style={{background: selectedFieldType === "hs" ? 'white' : '#333',
                color: selectedFieldType === "hs" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius:'0px',fontSize: '0.7rem' }}>
                                        HIGH SCHOOL
                                    </ToggleButton>
                                    <ToggleButton value="college" aria-label="college" style={{ background: selectedFieldType === "college" ? 'white' : '#333',
                color: selectedFieldType === "college" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        COLLEGE
                                    </ToggleButton>
                                    <ToggleButton value="nfl" aria-label="nfl" style={{ background: selectedFieldType === "nfl" ? 'white' : '#333',
                color: selectedFieldType === "nfl" ? '#333' : 'white', border: '1px solid white',padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        NFL
                                    </ToggleButton>
                                    <ToggleButton value="blank" aria-label="blank" style={{ background: selectedFieldType === "blank" ? 'white' : '#333',
                color: selectedFieldType === "blank" ? '#333' : 'white', border: '1px solid white',padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        BLANK
                                    </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>    


                                <div style={{ display: 'flex', gap: '35px', padding: '10px', marginLeft: '-20px' }}>
                                    {selectedFieldType !== 'blank' && (
                                        <CheckboxOption onChange={handleToggleRedZone} checked={redZone === 'redzone'}>Red Zone</CheckboxOption>
                                    )}

                                    {selectedFieldType !== 'blank' && selectedFieldType === 'nfl' && (<CheckboxOption onChange={handleToggleRedLine} checked={redLine}>NFL Red Line</CheckboxOption>)}
                                </div>

                        </div>
                    </div>




                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Offense Formation
                    </h3>
                    <div style={{ gap: '35px', marginLeft: '-10px', marginTop: '20px' }}>
                        <CheckboxOption onChange={handleToggleRedZone} checked={redZone === 'redzone'}>
                        L
                        </CheckboxOption>
                    </div>
                    </div>
                    {/* <div style={{ display: 'flex', gap: '35px', marginLeft: '-20px', marginTop: '-10px' }}>
                    <CheckboxOption onChange={handleToggleOffenseR} checked={selectedOffenseFormation === "right"}>
                        L
                    </CheckboxOption>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', marginTop: '10px' }}>R</p>
                    </div> */}
                        



                        <div style={{ display: 'flex', justifyContent: "flex-start", flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <ToggleButtonGroup onChange={handleSetOffenseFormation} exclusive aria-label="offense formation" style = {{gap: '10px'}}>
                                    <ToggleButton value="bunch" aria-label="BUNCH" style={{background: selectedOffenseFormation === "bunch"? 'white' : '#333',
                color: selectedOffenseFormation === "bunch" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif', borderRadius:'0px',fontSize: '0.7rem' }}>
                                        BUNCH
                                    </ToggleButton>
                                    <ToggleButton value="3x1" aria-label="3X1" style={{ background: selectedOffenseFormation === "3x1" ? 'white' : '#333',
                color: selectedOffenseFormation === "3x1" ? '#333' : 'white', border: '1px solid white', padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        3X1
                                    </ToggleButton>
                                    <ToggleButton value="empty" aria-label="EMPTY" style={{ background: selectedOffenseFormation === "empty"  ? 'white' : '#333',
                color: selectedOffenseFormation === "empty" ? '#333' : 'white', border: '1px solid white',padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        EMPTY
                                    </ToggleButton>


                                    <ToggleButton value="2x2" aria-label="2X2" onClick={handleAddOffense2x2}  style={{ background: '#333', color: 'white', border: '1px solid white',padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        2X2
                                    </ToggleButton>
                                        
                                    <ToggleButton value="custom" aria-label="blank" style={{ background: selectedOffenseFormation === "custom"  ? 'white' : '#333',
                color: selectedOffenseFormation === "custom"  ? '#333' : 'white', border: '1px solid white',padding: '1px 5px', fontFamily: 'Inter, sans-serif',borderRadius:'0px',fontSize: '0.7rem' }}>
                                        CUSTOM
                                    </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>    



                                
                            </div>
                        </div>



                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Defense Formation</h3>



                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Lines</h3>



                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>QB Progression</h3>


                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Text Tags</h3>



                </div>
            </div>
        </>
    );
}

export default Stencil;