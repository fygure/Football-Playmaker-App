import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

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
    } = props;

    const [state, setState] = useState({
        bottom: false,
    });

    const [items, setItems] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogText, setDialogText] = useState('');
    const [dialogAction, setDialogAction] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const openDialog = (title, text, action) => {
        setDialogTitle(title);
        setDialogText(text);
        setDialogAction(() => action);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleDialogSubmit = () => {
        dialogAction(dialogText);
        closeDialog();
    };

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

    const addItem = () => {
        setSelectedTextTags([]);
        openDialog('Add Play', '', (newPlayName) => {
            if (newPlayName !== null) {
                const itemExists = items.some(item => item.name === newPlayName);
                if (itemExists) {
                    alert('A play with this name already exists.');
                } else if (newPlayName === '') {
                    alert('Please enter a name for the play.');
                } else {
                    //TODO: Add deep copy of shapes and lines to newItem
                    // const shallowCopyTextTags = [...textTags];

                    // console.log('Shallow copy comparison:', shallowCopyTextTags[0] === textTags[0]);
                    // console.log('Deep copy comparison:', deepCopyTextTags[0] === textTags[0]);
                    const deepCopyTextTags = _.cloneDeep(textTags).map(tag => ({ ...tag, id: uuidv4() }));

                    let shapeIdMapping = {};
                    const deepCopyShapes = _.cloneDeep(shapes).map(shape => {
                        const newId = uuidv4();
                        shapeIdMapping[shape.id] = newId;
                        return { ...shape, id: newId };
                    });

                    let lineIdMapping = {};
                    //Mapping of old line IDs to new line IDs
                    const deepCopyLines = _.cloneDeep(lines).map(line => {
                        const newId = uuidv4();
                        lineIdMapping[line.id] = newId;
                        return { ...line, id: newId, attachedShapeId: shapeIdMapping[line.attachedShapeId] };
                    });
                    //update drawnFromId to new line IDs
                    const deepCopyLinesAgain = _.cloneDeep(deepCopyLines).map(line => {
                        return { ...line, drawnFromId: lineIdMapping[line.drawnFromId] || line.drawnFromId };
                    });

                    console.log('Adding play:', newPlayName);
                    console.log('||', newPlayName, 'Text Tags:', deepCopyTextTags);
                    console.log('||', newPlayName, 'Shapes:', deepCopyShapes);
                    console.log('||', newPlayName, 'Lines:', deepCopyLines);
                    const newItem = {
                        id: uuidv4(),
                        name: newPlayName,
                        backgroundImage: backgroundImage,
                        textTagList: deepCopyTextTags,
                        shapeList: deepCopyShapes,
                        lineList: deepCopyLinesAgain,
                        //drawingLine: (startPos && endPos)
                    };
                    setItems((prevItems) => [...prevItems, newItem]);
                    setTextTags(newItem.textTagList);
                    setShapes(newItem.shapeList);
                    setLines(newItem.lineList);
                    setCurrentLayerData(newItem);
                    setSelectedItem(newItem.id);
                }
            }
        });
    };

    const removeItem = (index) => {
        setItems(items.filter((item, i) => i !== index));
        checkIfDrawerEmpty();
    };

    const renameItem = (index) => {
        //console.log(items[index].name);
        openDialog('Rename Play', items[index].name, (newName) => {
            if (newName !== null) {
                // Check if a list item with the same name already exists
                const itemExists = items.some((item, i) => item.name === newName && i !== index);
                if (itemExists) {
                    // If a list item with the same name exists, show an error message
                    alert('A list item with this name already exists.');
                } else {
                    // If no list item with the same name exists, rename the item
                    setItems((prevItems) => prevItems.map((item, i) => i === index ? { ...item, name: newName } : item));
                }
            }
        });
    };

    //TODO: add button on play item to save current changes to play
    const handleItemClick = (text) => {
        console.log('IM HERE', text);
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
                                renameItem(index);
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
                variant='contained'
                size='small'
                onClick={toggleDrawer('bottom', true)}
            >
                {'Open PlayBook'}
            </Button>
            <Button
                variant='contained'
                size='small'
                onClick={addItem}
            >
                {'Add Play'}
            </Button>
            <Drawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
            >
                {list('bottom')}
            </Drawer>
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
        </div>
    );
}

export default BottomDrawer;