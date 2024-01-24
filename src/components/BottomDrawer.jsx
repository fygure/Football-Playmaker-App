import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonBase from '@mui/material/ButtonBase';
import UpdateIcon from '@mui/icons-material/Update';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as PlayBookSvg } from './assets/playbook-icon.svg';
import openPlaybookIcon from './assets/playbook-icon.svg';
function BottomDrawer(props) {
    const {
        stageRef,
        currentLayerData,
        setCurrentLayerData,
        backgroundImage,
        textTags,
        setTextTags,
        setSelectedTextTags,
        shapes,
        setShapes,
        lines,
        setLines,
        items,
        setItems,
        dialogOpen,
        setDialogOpen,
        dialogTitle,
        setDialogTitle,
        dialogText,
        setDialogText,
        dialogAction,
        setDialogAction,
        selectedItem,
        setSelectedItem,
        openSnackbar,
        setOpenSnackbar,
        snackbarMessage,
        setSnackbarMessage,
        snackbarSeverity,
        setSnackbarSeverity,
        openDialog,
    } = props;

    const [state, setState] = useState({
        bottom: false,
    });

    // const [items, setItems] = useState([]);
    // const [dialogOpen, setDialogOpen] = useState(false);
    // const [dialogTitle, setDialogTitle] = useState('');
    // const [dialogText, setDialogText] = useState('');
    // const [dialogAction, setDialogAction] = useState(null);
    // const [selectedItem, setSelectedItem] = useState(null);
    // const [openSnackbar, setOpenSnackbar] = useState(false);
    // const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    // const [openPlaybookIcon, setOpenPlaybookIcon] = useState(process.env.PUBLIC_URL + '/static/assets/CHLK_Icon_Open_Playbook_small.png');
    //pass in items, setItems, openDialog, setDialogOpen, setSelectedItem, setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity,
    //GOOD

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    //GOOD
    // const openDialog = (title, text, action) => {
    //     setDialogTitle(title);
    //     setDialogText(text);
    //     setDialogAction(() => action);
    //     setDialogOpen(true);
    // };
    //GOOD
    const closeDialog = () => {
        setDialogOpen(false);
    };
    //GOOD
    const handleDialogSubmit = () => {
        dialogAction(dialogText);
        closeDialog();
    };
    //GOOD
    const checkIfDrawerEmpty = () => {
        if (items.length === 0) {
            console.log('Play drawer is empty');
            // //Create empty objects for everything
            const newItem = {
                id: uuidv4(),
                name: 'Untitled',
                backgroundImage: backgroundImage,
                textTagList: [],
                shapeList: [],
                lineList: [],
                //drawingLine: (startPos && endPos)
            };
            setItems([newItem]);
            setCurrentLayerData(newItem);
        }
    };
    //GOOD
    const toggleDrawer = (anchor, open) => (event) => {
        setSelectedTextTags([]);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });

        checkIfDrawerEmpty();

        console.log('Current items in drawer:', items);
        // const stage = stageRef.stageRef.current;
        // const stageJson = stage.toJSON();
        // console.log(stageJson);
    };

    // const addItem = () => {
    //     setSelectedTextTags([]);
    //     openDialog('Add Play', '', (newPlayName) => {
    //         if (newPlayName !== null) {
    //             const itemExists = items.some(item => item.name === newPlayName);
    //             if (itemExists) {
    //                 setSnackbarMessage('A play with this name already exists.');
    //                 setSnackbarSeverity('error');
    //                 setOpenSnackbar(true);
    //             } else if (newPlayName === '') {
    //                 setSnackbarMessage('Please enter a name for the play.');
    //                 setSnackbarSeverity('warning');
    //                 setOpenSnackbar(true);
    //             } else {
    //                 //TODO: Add deep copy of shapes and lines to newItem
    //                 // const shallowCopyTextTags = [...textTags];

    //                 // console.log('Shallow copy comparison:', shallowCopyTextTags[0] === textTags[0]);
    //                 // console.log('Deep copy comparison:', deepCopyTextTags[0] === textTags[0]);
    //                 const deepCopyTextTags = _.cloneDeep(textTags).map(tag => ({ ...tag, id: uuidv4() }));

    //                 let shapeIdMapping = {};
    //                 const deepCopyShapes = _.cloneDeep(shapes).map(shape => {
    //                     const newId = uuidv4();
    //                     shapeIdMapping[shape.id] = newId;
    //                     return { ...shape, id: newId };
    //                 });

    //                 let lineIdMapping = {};
    //                 //Mapping of old line IDs to new line IDs
    //                 const deepCopyLines = _.cloneDeep(lines).map(line => {
    //                     const newId = uuidv4();
    //                     lineIdMapping[line.id] = newId;
    //                     return { ...line, id: newId, attachedShapeId: shapeIdMapping[line.attachedShapeId] };
    //                 });
    //                 //update drawnFromId to new line IDs
    //                 const deepCopyLinesAgain = _.cloneDeep(deepCopyLines).map(line => {
    //                     return { ...line, drawnFromId: lineIdMapping[line.drawnFromId] || line.drawnFromId };
    //                 });

    //                 console.log('Adding play:', newPlayName);
    //                 console.log('||', newPlayName, 'Text Tags:', deepCopyTextTags);
    //                 console.log('||', newPlayName, 'Shapes:', deepCopyShapes);
    //                 console.log('||', newPlayName, 'Lines:', deepCopyLines);
    //                 const newItem = {
    //                     id: uuidv4(),
    //                     name: newPlayName,
    //                     backgroundImage: backgroundImage,
    //                     textTagList: deepCopyTextTags,
    //                     shapeList: deepCopyShapes,
    //                     lineList: deepCopyLinesAgain,
    //                     //drawingLine: (startPos && endPos)
    //                 };
    //                 setItems((prevItems) => [...prevItems, newItem]);
    //                 setTextTags(newItem.textTagList);
    //                 setShapes(newItem.shapeList);
    //                 setLines(newItem.lineList);
    //                 setCurrentLayerData(newItem);
    //                 setSelectedItem(newItem.id);
    //                 setSnackbarMessage('Play added successfully.');
    //                 setSnackbarSeverity('success');
    //                 setOpenSnackbar(true);
    //             }
    //         }
    //     });
    // };
    //GOOD
    const updateItem = (index) => {
        setSelectedTextTags([]);
        openDialog('Update Play', items[index].name, (updatedName) => {
            if (updatedName !== null) {
                const itemExists = items.some((item, i) => item.name === updatedName && i !== index);
                if (itemExists) {
                    setSnackbarMessage('A play with this name already exists.');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                } else if (updatedName === '') {
                    setSnackbarMessage('Please enter a name for the play.');
                    setSnackbarSeverity('warning');
                    setOpenSnackbar(true);
                } else {
                    const deepCopyTextTags = _.cloneDeep(textTags).map(tag => ({ ...tag, id: uuidv4() }));

                    let shapeIdMapping = {};
                    const deepCopyShapes = _.cloneDeep(shapes).map(shape => {
                        const newId = uuidv4();
                        shapeIdMapping[shape.id] = newId;
                        return { ...shape, id: newId };
                    });

                    let lineIdMapping = {};
                    const deepCopyLines = _.cloneDeep(lines).map(line => {
                        const newId = uuidv4();
                        lineIdMapping[line.id] = newId;
                        return { ...line, id: newId, attachedShapeId: shapeIdMapping[line.attachedShapeId] };
                    });
                    const deepCopyLinesAgain = _.cloneDeep(deepCopyLines).map(line => {
                        return { ...line, drawnFromId: lineIdMapping[line.drawnFromId] || line.drawnFromId };
                    });

                    const updatedItem = {
                        ...items[index],
                        name: updatedName,
                        textTagList: deepCopyTextTags,
                        shapeList: deepCopyShapes,
                        lineList: deepCopyLinesAgain,
                    };

                    setItems((prevItems) => prevItems.map((item, i) => i === index ? updatedItem : item));
                    setTextTags(updatedItem.textTagList);
                    setShapes(updatedItem.shapeList);
                    setLines(updatedItem.lineList);
                    setCurrentLayerData(updatedItem);
                    setSelectedItem(updatedItem.id);
                    setSnackbarMessage('Play Updated Successfully.');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                }
            }
        });
    };
    //GOOD
    const removeItem = (index) => {
        setItems(items.filter((item, i) => i !== index));
        checkIfDrawerEmpty();
        setSnackbarMessage('Play Removed.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
    };

    const handleItemClick = (text) => {
        //console.log('IM HERE', text);
        const playName = text.name;
        //Pass playName to a function that can render
        //the stage with that playName as the ID
        console.log('Rendering play:', playName);
        console.log(currentLayerData);

        //Extract the items list and find the item with playName associated
        const item = items.find(item => item.name === playName);

        //Create DEEP COPY of the item in layerData
        const layerData = _.cloneDeep(item);

        setTextTags(layerData.textTagList);
        setShapes(layerData.shapeList);
        setLines(layerData.lineList);
        setCurrentLayerData(layerData);
        setSelectedItem(text.id);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            <Grid container spacing={2}>
                {items.map((text, index) => (
                    <Grid item xs={4} key={text.id}>
                        <ListItem
                            key={index}
                            onKeyDown={toggleDrawer(anchor, false)}
                            onClick={toggleDrawer('bottom', false)}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                updateItem(index);
                            }}
                            style={{
                                padding: '0px 20px',
                                margin: '10px 0',
                            }}
                        >
                            <ButtonBase
                                onClick={() => {
                                    toggleDrawer('bottom', false);
                                    handleItemClick(text);
                                }}
                                style={{
                                    border: '1px solid #000',
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: text.id === selectedItem ? 'lightblue' : 'white',
                                }}
                            >
                                <ListItemText primary={text.name} />
                            </ButtonBase>
                            <IconButton
                                style={{ border: '1px solid #000', margin: '0px 5px', }}
                                edge="end"
                                aria-label="update"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    updateItem(index);
                                }}
                            >
                                <UpdateIcon />
                            </IconButton>
                            <IconButton
                                style={{ border: '1px solid #000', }}
                                edge="end"
                                aria-label="delete"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    removeItem(index);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <div>
            <Button
            variant="contained"
            style={{ backgroundColor: '#333', color: 'white', border: '1px solid white', width: '15vw',  borderRadius: '25px'   }}
            startIcon={<img src={openPlaybookIcon} alt="Open Playbook" style={{ width: '30px', height: '30px' }} />}
            onClick={toggleDrawer('bottom', true)}
            >
            Open Playbook
            </Button>
            <Drawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
            >
                {list('bottom')}
            </Drawer>
            {/* <Button
                variant='contained'
                size='small'
                onClick={addItem}
            >
                {'Add Play'}
            </Button> */}
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={dialogText}
                        onChange={(event) => setDialogText(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default BottomDrawer;