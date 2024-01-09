// Stencil.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography, Button, ToggleButton, ToggleButtonGroup, Grid, Box, } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FeedBackForm from './feedback/FeedBackForm.jsx';
import FlipIcon from '@mui/icons-material/Flip';
import theme from '../config/theme.js';
import Konva from 'konva';
import { Email } from '@mui/icons-material';

const QBProgressionButtons = [
    { text: 'Check Mark', icon: 'check' },
    { text: 'HOT!' },
    { text: '1', underline: true },
    { text: '2', underline: true },
    { text: '3', underline: true },
    { text: '4', underline: true },
    { text: 'ALERT!' },
    { text: 'PRE' },
];

const QBProgressionButtonStyle = {
    background: '#333',
    color: 'white',
    padding: '1px 5px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.7rem',
    transition: 'text-shadow 0.3s',
    minWidth: '0',
};

const QBProgressionButtonSx = {
    borderColor: '#222',
    ':hover': {
        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
        borderColor: '#222',
    },
};


const colorButtons = [
    theme.palette.pitchBlack.main,
    theme.palette.punky.main,
    theme.palette.mustard.main,
    theme.palette.kellyGreen.main,
    theme.palette.ramsBlue.main,
    theme.palette.purple.main,
    theme.palette.sharpRed.main
    // Add more colors as needed
];

const lineButtons = [
    { id: 1, label: 'straight', type: 'stroke', icon: '/static/assets/stroke-straight.png' },
    { id: 2, label: 'dashed', type: 'stroke', icon: '/static/assets/stroke-dashed.png' },
    { id: 3, label: 'squiggle', type: 'stroke', icon: '/static/assets/stroke-wavy.png' },
    { id: 4, label: 'dotted', type: 'stroke', icon: '/static/assets/stroke-dotted.png' },
    { id: 5, label: 'arrow', type: 'end', icon: '/static/assets/end-arrow.png' },
    { id: 6, label: 'perpendicular', type: 'end', icon: '/static/assets/end-perpendicular.png' },
    { id: 7, label: 'dotted', type: 'end', icon: '/static/assets/end-dotted.png' },
    { id: 8, label: 'straight', type: 'end', icon: '/static/assets/end-straight.png' },
];

const lineButtonStyle = {
    background: '#333',
    color: 'white',
    padding: '0px 5px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.7rem',
    transition: 'text-shadow 0.3s',
    position: 'relative',
    minWidth: '0',
    minHeight: '0',
    top: '10px', // moves the button down
    width: '40px',
    height: '20px',
    borderRadius: '0px',
};



function Stencil(props) {
    const {
        // undo,
        // redo,
        onChangeLineStroke,
        onChangeLineEnd,
        onAddFormation,
        onAddShape,
        onAddTextTag,
        fieldType,
        setFieldType,
        setZone,
        zone,
        setRedLine,
        redLine,
        onDeleteAllShapes,
        onChangeFormation,
        selectedColor,
        setSelectedColor,
        selectedLineStroke,
        setSelectedLineStroke,
        selectedLineEnd,
        setSelectedLineEnd,
        onDeleteAllTextTags,
        onDeleteAllLines,
        setColorButtonPressCount,
        setStrokeEndButtonPressCount,
        setStrokeTypeButtonPressCount,
        stageRef,
        flipAllTextTags,
    } = props;

    const [selectedOffenseFormation, setSelectedOffenseFormation] = useState("");
    const [selectedDefenseFormation, setSelectedDefenseFormation] = useState("");
    const [toggleOffenseLeftRight, setToggleOffenseLeftRight] = useState(false); // false = Left
    const [toggleDefenseLeftRight, setToggleDefenseLeftRight] = useState(false);
    const [selectedColorButton, setSelectedColorButton] = useState(0); // 0 is first index of colorButtons array
    const [selectedStrokeButton, setSelectedStrokeButton] = useState(lineButtons.findIndex(button => button.label === 'straight' && button.type === 'stroke'));
    const [selectedFeedback, setSelectedFeedback] = useState(false);
    const [selectedEndButton, setSelectedEndButton] = useState(lineButtons.findIndex(button => button.label === 'straight' && button.type === 'end') - lineButtons.findIndex(button => button.type === 'end'));
  
    const shapeColor = 'white';

    function handleDownload() {
        var dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
        var link = document.createElement('a');
        link.download = 'stage.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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

    const handleAddPlayer = (e) => {
        //console.log(e.target.value);
        const newPlayer = e.target.value;
        onAddShape(newPlayer, shapeColor);
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
    const handleDeleteAll = () => {
        onDeleteAllShapes();
        onDeleteAllTextTags();
        onDeleteAllLines();
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

    // QB Progression handlers
    const handleAddQBProgression = (buttonText) => {
        //console.log(buttonText);
        handleAddTextTag({ target: { value: buttonText } }, selectedColor);
    };

    // Text Tag handlers
    const handleAddTextTag = (e) => {
        const newText = e.target.value;
        //console.log(newText);
        // setSelectedText(newText);
        onAddTextTag(newText, selectedColor);
    };

    //Orientation handlers
    const handleOrientation = (e) => {
        const newOrientation = e.target.value;
        // console.log('handle orientation',newOrientation);
        flipAllTextTags(newOrientation);
    };

    const handleColorButtonPress = () => {
        setColorButtonPressCount(prevCount => prevCount + 1);
    };

    const handleStrokeTypeButtonPress = () => {
        setStrokeTypeButtonPressCount(prevCount => prevCount + 1);
    };

    const handleStrokeEndButtonPress = () => {
        setStrokeEndButtonPressCount(prevCount => prevCount + 1);
    };

    //     const [selectedFeedback, setSelectedFeedback] = useState(false);

    const handleFeedbackFormOpen = () => {
        setSelectedFeedback(true);
    };

    const handleFeedbackFormClose = () => {
        setSelectedFeedback(false);
    };

    const handleFeedbackSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const feedback = event.target.elements.feedback.value;
        console.log(`Submission received: ${email} ${feedback}`);
        setSelectedFeedback(false);
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white' }}>

                    <Button onClick={() => { }} variant='contained'>Undo</Button>
                    <Button onClick={() => { }} variant='contained'>Redo</Button>

                    <h3 style={{ marginBottom: '2px', marginTop: '2px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Field
                    </h3>
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
                            <div style={{ display: 'flex', gap: '25px', padding: '10px', marginLeft: '-26px', marginTop: '-6px', flexWrap: 'wrap' }}>
                                {fieldType !== 'blank' && (
                                    <CheckboxOption onChange={handleToggleRedZone} checked={zone === 'redzone'}>Red Zone</CheckboxOption>
                                )}
                                {(fieldType === 'nfl' || fieldType === 'college') && (
                                    <CheckboxOption onChange={handleToggleRedLine} checked={redLine}>Red Line</CheckboxOption>
                                )}
                            </div>
                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <h3 style={{
                            marginBottom: '2px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            marginTop: '-5px',
                            maxWidth: '100%',
                            marginRight: '10px',
                            whiteSpace: 'normal',
                        }}>
                            Offense Formation
                        </h3>
                        <Button
                            color="white"
                            value="OffenseExtra"
                            sx={{
                                background: '#333', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s',
                                ':hover': {
                                    textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                },
                                textDecoration: 'underline',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                            onClick={handleAddPlayer}
                        >
                            +Add Player
                        </Button>
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
                            <div style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row', marginLeft: '-26px', marginTop: '-6px', marginRight: '-16px', alignItems: 'center', padding: '10px', fontWeight: 500 }}>

                                {selectedOffenseFormation !== '2x2' && selectedOffenseFormation !== 'Custom' && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckboxOption onChange={handleToggleOffenseLeftRight} checked={toggleOffenseLeftRight}> L</CheckboxOption>
                                        <span style={{ display: 'flex', marginLeft: '10px', marginBottom: '0px', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}> R </span>
                                    </div>
                                )}

                                {/* <div style={{ display: 'flex', justifyContent: "space-between", marginLeft: '0px', marginTop: '0px', paddingLeft: '0' }}>
                                    <Button
                                        color="white"
                                        sx={{
                                            background: '#333', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s',
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                            '&:focus': {
                                                outline: 'none',
                                            },
                                        }}
                                        onClick={() => { console.log("Adding offensive player") }}
                                    >
                                        +Add Player
                                    </Button>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <h3 style={{
                            marginBottom: '2px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            marginTop: '-5px',
                            maxWidth: '100%',
                            marginRight: '10px',
                            whiteSpace: 'normal',
                        }}>
                            Defense Formation
                        </h3>
                        <Button
                            color="white"
                            value="DefenseExtra"
                            sx={{
                                background: '#333', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s',
                                ':hover': {
                                    textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                },
                                textDecoration: 'underline',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                            onClick={handleAddPlayer}
                        >
                            +Add Player
                        </Button>
                    </div>
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
                            <div style={{ display: 'flex', justifyContent: "space-between", marginLeft: '-26px', marginTop: '-6px', alignItems: 'center', padding: '10px', fontWeight: 500, marginRight: '-13px' }}>
                                {selectedDefenseFormation !== 'Custom' && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckboxOption onChange={handleToggleDefenseLeftRight} checked={toggleDefenseLeftRight}>L</CheckboxOption>
                                        <span style={{ display: 'flex', marginLeft: '10px', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}> R </span>
                                    </div>
                                )}
                                {/* <div style={{ display: 'flex', justifyContent: "space-between", marginLeft: '0px', marginTop: '0px' }}>
                                    <Button
                                        color="white"
                                        sx={{
                                            background: '#333', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s',
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                            '&:focus': {
                                                outline: 'none',
                                            },
                                        }}
                                        onClick={() => { console.log("Adding defensive player") }}
                                    >
                                        +Add Player
                                    </Button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <h3 style={{ marginBottom: '0px', marginTop: '-5px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Color</h3>
                    <Box sx={{ flexGrow: 1, marginLeft: '-4px', marginTop: '-5px', marginBottom: '-20px' }}>
                        <Grid container spacing={0}>
                            {colorButtons.map((color, index) => (
                                <Grid item xs={"auto"} key={index}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: color,
                                            borderRadius: '50%',
                                            padding: '10px',
                                            minWidth: '10px',
                                            margin: '5px',
                                            '&:hover': {
                                                backgroundColor: color,
                                                boxShadow: '0 0 10px 2px white',
                                            },
                                            border: selectedColorButton === index ? '2px solid white' : 'none',
                                        }}
                                        onClick={() => {
                                            //console.log(color);
                                            setSelectedColor(color);
                                            setSelectedColorButton(index);
                                            handleColorButtonPress();
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Lines</h3>
                    <Box sx={{ flexGrow: 1, marginLeft: '0px', marginTop: '-5px', }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Grid container spacing={0}>
                                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', paddingRight: '5px' }}>Stroke</h3>
                                    {lineButtons
                                        .filter((button) => button.type === 'stroke')
                                        .map((button, index) => (
                                            <Grid item xs={"auto"} key={button.id}>
                                                <Button
                                                    variant="text"
                                                    style={{
                                                        ...lineButtonStyle,
                                                        borderRadius: '25px',
                                                        marginRight: '5px',
                                                        border: selectedStrokeButton === index ? '2px solid white' : 'none'
                                                    }}
                                                    sx={{
                                                        '&:hover': {
                                                            boxShadow: '0px 0px 10px 2px white',
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setSelectedLineStroke(button.label);
                                                        handleStrokeTypeButtonPress();
                                                        console.log(button.type, button.label);
                                                        setSelectedStrokeButton(index);
                                                    }}
                                                >
                                                    <img src={button.icon} alt={button.label} style={{ width: '100%', height: 'auto' }} />
                                                </Button>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={0}>
                                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', paddingRight: '5px' }}>End</h3>
                                    {lineButtons
                                        .filter((button) => button.type === 'end')
                                        .map((button, index) => (
                                            <Grid item xs={"auto"} key={button.id}>
                                                <Button
                                                    variant="text"
                                                    style={{
                                                        ...lineButtonStyle,
                                                        borderRadius: '25px',
                                                        marginRight: '5px',
                                                        border: selectedEndButton === index ? '2px solid white' : 'none'
                                                    }}
                                                    sx={{
                                                        '&:hover': {
                                                            boxShadow: '0px 0px 10px 2px white',
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setSelectedLineEnd(button.label);
                                                        handleStrokeEndButtonPress();
                                                        console.log(button.type, button.label);
                                                        setSelectedEndButton(index);
                                                    }}
                                                >
                                                    <img src={button.icon} alt={button.label} style={{ width: '100%', height: 'auto' }} />
                                                </Button>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        QB Progression
                    </h3>
                    <Box sx={{ flexGrow: 1, marginLeft: '-3px' }}>
                        <Grid container spacing={0}>
                            <Grid item xs={"auto"}>
                                {QBProgressionButtons.slice(0, -2).map((button, index) => (
                                    <Button
                                        key={index}
                                        value={button.text}
                                        variant="text"
                                        style={{
                                            ...QBProgressionButtonStyle,
                                            textDecoration: ['1', '2', '3', '4'].includes(button.text) ? 'underline' : 'none',
                                            marginRight: '2px',
                                        }}
                                        sx={QBProgressionButtonSx}
                                        size="small"
                                        onClick={() => handleAddQBProgression(button.text)}
                                    >
                                        {button.text === 'Check Mark' ? <TaskAltIcon fontSize="small" /> : button.text}
                                    </Button>
                                ))}
                            </Grid>
                            <Grid item xs={"auto"}>
                                {QBProgressionButtons.slice(-2).map((button, index) => (
                                    <Button
                                        key={index}
                                        value={button.text}
                                        variant="text"
                                        style={{
                                            ...QBProgressionButtonStyle,
                                            textDecoration: ['1', '2', '3', '4'].includes(button.text) ? 'underline' : 'none',
                                            marginRight: '2px',
                                        }}
                                        sx={QBProgressionButtonSx}
                                        size="small"
                                        onClick={() => handleAddQBProgression(button.text)}
                                    >
                                        {button.text}
                                    </Button>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>


                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Text Tags
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <ToggleButtonGroup onChange={handleAddTextTag} exclusive aria-label="text tag" sx={{ gap: '5px', flexWrap: 'wrap', marginLeft: '-4px' }}>
                                    <ToggleButton value="TEMPO" aria-label="tempo" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        TEMPO
                                    </ToggleButton>
                                    <ToggleButton value="SPRAY" aria-label="spray" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        SPRAY
                                    </ToggleButton>
                                    <ToggleButton value="STEM" aria-label="stem" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        STEM
                                    </ToggleButton>
                                    <ToggleButton value="FREE" aria-label="free" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        FREE
                                    </ToggleButton>
                                    <ToggleButton value="NOW" aria-label="now" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        NOW
                                    </ToggleButton>
                                    <ToggleButton value="MOR" aria-label="mor" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        MOR
                                    </ToggleButton>
                                    {/* This is for editable text!!! */}
                                    <ToggleButton value="CUSTOM" aria-label="custom" style={{
                                        background: '#333', color: 'white', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s', borderRadius: '5px'
                                    }}
                                        sx={{
                                            ':hover': {
                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                            },
                                        }}>
                                        CUSTOM
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                    {/* I NEED to use list shapes AND textTags */}
                    <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500, marginTop: '0' }}>
                        Orientation
                    </h3>

                    <Box sx={{ flexGrow: 1, marginLeft: '-3px', marginBottom: '-20px' }}>
                        <Grid container spacing={0}>
                            <Grid item xs={"auto"}>
                                {['Up/Down', 'Left/Right'].map((orientation, index) => (
                                    <Button
                                        key={index}
                                        value={orientation}
                                        variant="text"
                                        style={{
                                            ...QBProgressionButtonStyle,
                                            marginRight: '2px',
                                        }}
                                        sx={QBProgressionButtonStyle}
                                        size="small"
                                        onClick={handleOrientation}
                                        startIcon={
                                            orientation === 'Up/Down' ?
                                                <FlipIcon style={{ transform: 'rotate(90deg)' }} /> :
                                                <FlipIcon />
                                        }
                                    >
                                        {orientation}
                                    </Button>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>

                    <Button
                        color="white"
                        value="feedback"
                        style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            padding: '1px 3px',
                            textAlign: 'left', // align text to the left
                            fontSize: '0.5rem', // make text smaller
                            border: 'none', // remove border
                            width: 'fit-content', // adjust width to fit content
                        }}
                        sx={{
                            background: '#333', borderColor: '#333', padding: '1px 5px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', transition: 'text-shadow 0.3s',
                            ':hover': {
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                            },
                            // textDecoration: 'underline',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                        onClick={handleFeedbackFormOpen}
                    >
                        Share Feedback!
                    </Button>
                    <FeedBackForm open={selectedFeedback} handleFeedbackFormClose={handleFeedbackFormClose} handleFeedbackFormSubmit={handleFeedbackSubmit}></FeedBackForm>

                    <Box sx={{ flexGrow: 1, marginLeft: '-4px', marginTop: '-5px', marginBottom: '-20px' }}>
                        <Grid container spacing={0}>
                        </Grid>
                    </Box>

                </div>
            </div >
        </>
    );
}

export default Stencil;