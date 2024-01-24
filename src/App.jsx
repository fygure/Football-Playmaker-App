// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import StageDimensionsContext from './contexts/StageDimensionsContext';
import Canvas from './components/Canvas';
import Stencil from './components/Stencil';
import useShapes from './hooks/useShapes';
import useTextTags from './hooks/useTextTags';
import useBackground from './hooks/useBackground';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import CloseIcon from '@mui/icons-material/Close';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsTrash3Fill } from "react-icons/bs";
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import { PiFileJpg } from "react-icons/pi";
import { PiFilePng } from "react-icons/pi";
import FontDownloadOffIcon from '@mui/icons-material/FontDownloadOff';
import { AiOutlineDeleteColumn } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import './App.css';
import useLines from './hooks/useLines';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
////////////////////////////////////////////////////////////////////////////////////////
/*
TODO: undo/redo
TODO: orientation
TODO: selection rectangle
TODO: add item to playbook button (lift from BottomDrawer);
*/
////////////////////////////////////////////////////////////////////////////////////////
function App({ signOut, setCurrentUser, showAuthenticator, setShowAuthenticator }) {
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  const [colorButtonPressCount, setColorButtonPressCount] = useState(0);
  const [strokeTypeButtonPressCount, setStrokeTypeButtonPressCount] = useState(0);
  const [strokeEndButtonPressCount, setStrokeEndButtonPressCount] = useState(0);
  const [selectedShapes, setSelectedShapes] = useState([]); //This is for Selection Rectangle
  const [selectedTextTags, setSelectedTextTags] = useState([]);
  const [selectedLineID, setSelectedLineID] = useState('$');
  const [selectedColor, setSelectedColor] = useState(theme.palette.pitchBlack.main); //default color
  const [selectedLineStroke, setSelectedLineStroke] = useState('straight'); // default straight line
  const [selectedLineEnd, setSelectedLineEnd] = useState('straight'); // default arrow line end
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [currentLayerData, setCurrentLayerData] = useState(null);
  const { backgroundImage, fieldType, setFieldType, setZone, zone, setRedLine, redLine } = useBackground();
  const { shapes, setShapes, addFormation, addShape, updateShape, deleteShape, deleteFormation, deleteAllShapes, hideShapeContextMenu, flipAllShapes } = useShapes(imageRef);
  const { textTags, setTextTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags } = useTextTags(imageRef);
  const { lines, startPos, endPos, startDrawing, draw, stopDrawing, deleteAllLines, setLines, deleteLine, updateLine } = useLines(imageRef, setSelectedLineID, selectedLineID);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTimeoutId, setTooltipTimeoutId] = useState(null);
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogAction, setDialogAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDownloadPNG = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    var link = document.createElement('a');
    if (currentLayerData === null) {
      link.download = 'untitled.png';
    } else {
      link.download = `${currentLayerData.name}.png`
    }
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJPG = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 3, mimeType: "image/jpg" });
    var link = document.createElement('a');
    if (currentLayerData === null) {
      link.download = 'untitled.jpg';
    } else {
      link.download = `${currentLayerData.name}.jpg`
    }
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleDeleteAll = () => {
    deleteAllShapes();
    deleteAllTextTags();
    deleteAllLines();
  };

  const handleDeleteDefenseFormation = () => {
    setShapes(shapes.filter(shape => !shape.formationType.toLowerCase().startsWith('defense')));
  }
  const handleDeleteOffenseFormation = () => {
    setShapes(shapes.filter(shape => !shape.formationType.toLowerCase().startsWith('offense')));
  }
  const handleDeleteAllTextTags = () => {
    deleteAllTextTags();
  };

  const handleDeleteAllLines = () => {
    deleteAllLines();
  };

  const handleToggleSpeedDial = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen);
  };

  const handleSignOut = async () => {
    try {
      setCurrentUser(null);
      setShowAuthenticator(!showAuthenticator);
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const actions = [
    { name: "Delete All", icon: <BsTrash3Fill size={20} />, action: handleDeleteAll },
    { name: "Download PNG", icon: < PiFilePng size={25} />, action: handleDownloadPNG },
    { name: "Download JPG", icon: < PiFileJpg size={25} />, action: handleDownloadJPG },
    { name: "Delete Offense Formation", icon: <FlashOffIcon size={30} />, action: handleDeleteOffenseFormation },
    { name: "Delete Defense Formation", icon: <RemoveModeratorIcon />, action: handleDeleteDefenseFormation },
    { name: "Delete All Text Tags", icon: <FontDownloadOffIcon />, action: handleDeleteAllTextTags },
    { name: "Delete All Lines", icon: <AiOutlineDeleteColumn size={20} />, action: handleDeleteAllLines },
    { name: "Sign Out", icon: <LuLogOut size={25} />, action: handleSignOut },
  ];


  const handleMouseEnter = (index) => {
    const timeoutId = setTimeout(() => {
      setTooltipOpen(prevState => ({ ...prevState, [index]: true }));
    }, 400); // delay time
    setTooltipTimeoutId(timeoutId);
  };

  const handleMouseLeave = (index) => {
    clearTimeout(tooltipTimeoutId);
    const timeoutId = setTimeout(() => {
      setTooltipOpen(prevState => ({ ...prevState, [index]: false }));
    }, 300); // delay time
    setTooltipTimeoutId(timeoutId);
  };



  const openDialog = (title, text, action) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogAction(() => action);
    setDialogOpen(true);
  };

  const handleOnClickAddPlay = () => {
    console.log("Add Play Clicked");
    setSelectedTextTags([]);
    openDialog('Add Play', '', (newPlayName) => {
      if (newPlayName !== null) {
        const itemExists = items.some(item => item.name === newPlayName);
        if (itemExists) {
          setSnackbarMessage('A play with this name already exists.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        } else if (newPlayName === '') {
          setSnackbarMessage('Please enter a name for the play.');
          setSnackbarSeverity('warning');
          setOpenSnackbar(true);
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
          setSnackbarMessage('Play added successfully.');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        }
      }
    });
  };





  return (
    <>
      {/* <button onClick={() => { signOut(); setCurrentUser(null); setShowAuthenticator(!showAuthenticator) }}>Sign out</button> */}
      {/* <div id="signInDiv"></div> */}
      <ThemeProvider theme={theme}>
        <StageDimensionsContext.Provider value={{ stageDimensions }}>
          <>
            {/* <Button onClick={(e) => handleSignOut(e)}>Sign Out</Button> */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0vw',
              padding: '0vw',
              height: '100vh',
              width: '100vw',
            }}>
              <div className="custom-scrollbar">
                <Stencil
                  shapes={shapes}
                  setShapes={setShapes}
                  textTags={textTags}
                  setTextTags={setTextTags}
                  setSelectedTextTags={setSelectedTextTags}
                  currentLayerData={currentLayerData}
                  setCurrentLayerData={setCurrentLayerData}
                  onAddFormation={addFormation}
                  onAddShape={addShape}
                  onAddTextTag={addTextTag}
                  fieldType={fieldType}
                  setFieldType={setFieldType}
                  setZone={setZone}
                  zone={zone}
                  setRedLine={setRedLine}
                  redLine={redLine}
                  onDeleteAllShapes={deleteAllShapes}
                  onChangeFormation={deleteFormation} //deletes all other formation shapes except one chosen
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedLineStroke={selectedLineStroke}
                  setSelectedLineStroke={setSelectedLineStroke}
                  selectedLineEnd={selectedLineEnd}
                  setSelectedLineEnd={setSelectedLineEnd}
                  onDeleteAllTextTags={deleteAllTextTags}
                  onDeleteAllLines={deleteAllLines}
                  setColorButtonPressCount={setColorButtonPressCount}
                  setStrokeTypeButtonPressCount={setStrokeTypeButtonPressCount}
                  setStrokeEndButtonPressCount={setStrokeEndButtonPressCount}
                  stageRef={stageRef}
                  flipAllTextTags={flipAllTextTags}
                  flipAllShapes={flipAllShapes}
                  backgroundImage={backgroundImage}
                  lines={lines}
                  setLines={setLines}
                  items={items}
                  setItems={setItems}
                  dialogOpen={dialogOpen}
                  setDialogOpen={setDialogOpen}
                  dialogTitle={dialogTitle}
                  setDialogTitle={setDialogTitle}
                  dialogText={dialogText}
                  setDialogText={setDialogText}
                  dialogAction={dialogAction}
                  setDialogAction={setDialogAction}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  openSnackbar={openSnackbar}
                  setOpenSnackbar={setOpenSnackbar}
                  snackbarMessage={snackbarMessage}
                  setSnackbarMessage={setSnackbarMessage}
                  snackbarSeverity={snackbarSeverity}
                  setSnackbarSeverity={setSnackbarSeverity}
                  openDialog={openDialog}
                />
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1.8,
                padding: '1vw',
                maxWidth: 'calc(80%)',
                marginRight: '0vw',
                borderTop: '1px solid black',
                borderRight: '1px solid black',
                borderBottom: '1px solid black',
                height: '100%',
                backgroundColor: '#1e1e1e', // See parent div
              }}>
                <Canvas
                  imageRef={imageRef}
                  selectedLineID={selectedLineID}
                  setSelectedLineID={setSelectedLineID}
                  currentLayerData={currentLayerData}
                  setCurrentLayerData={setCurrentLayerData}
                  colorButtonPressCount={colorButtonPressCount}
                  strokeTypeButtonPressCount={strokeTypeButtonPressCount}
                  setStrokeTypeButtonPressCount={setStrokeTypeButtonPressCount}
                  strokeEndButtonPressCount={strokeEndButtonPressCount}
                  setStrokeEndButtonPressCount={setStrokeEndButtonPressCount}
                  selectedLineEnd={selectedLineEnd}
                  setSelectedLineEnd={setSelectedLineEnd}
                  lines={lines}
                  setLines={setLines}
                  startPos={startPos}
                  endPos={endPos}
                  startDrawing={startDrawing}
                  draw={draw}
                  stopDrawing={stopDrawing}
                  deleteAllLines={deleteAllLines}
                  onLineChange={updateLine}
                  onLineDelete={deleteLine}
                  shapes={shapes}
                  selectedShapes={selectedShapes}
                  setSelectedShapes={setSelectedShapes}
                  onShapeChange={updateShape}
                  onShapeDelete={deleteShape}
                  onHideContextMenu={hideShapeContextMenu}
                  textTags={textTags}
                  selectedTextTags={selectedTextTags}
                  setSelectedTextTags={setSelectedTextTags}
                  onTextTagChange={updateTextTag}
                  onTextTagDelete={deleteTextTag}
                  onHideTextTagContextMenu={hideTextTagContextMenu}
                  selectedColor={selectedColor}
                  selectedLineStroke={selectedLineStroke}
                  backgroundImage={backgroundImage}
                  setStageDimensions={setStageDimensions}
                  stageRef={stageRef}
                />
                <SpeedDial
                  ariaLabel="SpeedDial"
                  icon={isSpeedDialOpen ? <CloseIcon sx={{ color: 'red' }} /> : <MoreVertIcon sx={{ color: 'black' }} />}
                  direction={'down'}
                  FabProps={{ size: 'small', color: 'white' }}
                  onClick={handleToggleSpeedDial}
                  open={isSpeedDialOpen}
                  sx={{ position: 'fixed', top: '20px', right: '15px', marginTop: '15px', marginRight: '2.5vw' }} // Update this line
                >
                  {actions.map((action, index) => (
                    <SpeedDialAction
                      key={`dial-${index}`}
                      icon={action.icon}
                      onClick={action.action}
                      tooltipTitle={tooltipOpen[index] ? action.name : ""}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    />
                  ))}
                </SpeedDial>
                <SpeedDial
                  ariaLabel="AddPlay"
                  sx={{ position: 'fixed', bottom: '60px', right: '15px', marginTop: '15px', marginRight: '2.5vw' }}
                  icon={<IoIosAdd color='#2B76BA' style={{ fontSize: '30px' }} />}
                  FabProps={{ size: 'small', color: 'white' }}
                  onClick={handleOnClickAddPlay}
                />
              </div>
            </div>
          </>
        </StageDimensionsContext.Provider>
      </ThemeProvider >
    </>
  );
}
export default App;