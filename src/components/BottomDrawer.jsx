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

function BottomDrawer(props) {
    const {
        stageRef,
        currentLayerData,
        setCurrentLayerData,

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

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });

        console.log('Current items in drawer:', items);
        // const stage = stageRef.stageRef.current;
        // const stageJson = stage.toJSON();
        // console.log(stageJson);
    };

    const addItem = () => {
        openDialog('Add Play', '', (newPlayName) => {
            if (newPlayName !== null) {
                // Check if a list item with the same name already exists
                const itemExists = items.some(item => item.name === newPlayName);
                if (itemExists) {
                    // If a list item with the same name exists, show an error message
                    alert('A play with this name already exists.');
                } else {
                    // If no list item with the same name exists, add the new item
                    const newItem = { id: uuidv4(), name: newPlayName };
                    setItems((prevItems) => [...prevItems, newItem]);
                }
            }
        });
    };

    const removeItem = (index) => {
        setItems(items.filter((item, i) => i !== index));
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

    const handleItemClick = (text) => {
        const playName = text.name;
        //Pass playName to a function that can render 
        //the stage with that playName as the ID
        console.log('Rendering play:', playName);

        console.log(currentLayerData);

        const layerData = {
            playName: playName,
        }

        setCurrentLayerData(layerData);
        console.log(layerData);
        setSelectedItem(text.id);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            <Grid container spacing={2}>
                {items.map((text, index) => (
                    <Grid item xs={4}>
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