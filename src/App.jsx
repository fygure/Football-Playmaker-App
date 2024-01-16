// App.jsx
import React, { useState, useRef } from 'react';
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
import  {AiOutlineDeleteColumn}  from "react-icons/ai";
////////////////////////////////////////////////////////////////////////////////////////
import { IoIosAdd } from "react-icons/io";
import BottomDrawer from './components/BottomDrawer';
////////////////////////////////////////////////////////////////////////////////////////
import './App.css';
import useLines from './hooks/useLines';
import { set } from 'lodash';
////////////////////////////////////////////////////////////////////////////////////////
/*
TODO: add undo/redo
TODO: footer navbar
TOOD: orientation
*/
////////////////////////////////////////////////////////////////////////////////////////
function App() {
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  const [colorButtonPressCount, setColorButtonPressCount] = useState(0);
  const [strokeTypeButtonPressCount, setStrokeTypeButtonPressCount] = useState(0);
  const [strokeEndButtonPressCount, setStrokeEndButtonPressCount] = useState(0);
  const [selectedShapes, setSelectedShapes] = useState([]); //This is for Selection Rectangle
  const [selectedTextTags, setSelectedTextTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState(theme.palette.pitchBlack.main); //default color
  const [selectedLineStroke, setSelectedLineStroke] = useState('straight'); // default straight line
  const [selectedLineEnd, setSelectedLineEnd] = useState('straight'); // default arrow line end
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [currentLayerData, setCurrentLayerData] = useState(null);
  const { backgroundImage, fieldType, setFieldType, setZone, zone, setRedLine, redLine } = useBackground();
  const { shapes, setShapes, addFormation, addShape, updateShape, deleteShape, deleteFormation, deleteAllShapes, hideShapeContextMenu, flipAllShapes } = useShapes(imageRef);
  const { textTags, setTextTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags } = useTextTags(imageRef);
  const { lines, startPos, endPos, startDrawing, draw, stopDrawing, deleteAllLines, setLines, deleteLine, updateLine, flipAllLines } = useLines(imageRef,shapes);


  //TODO: Name of download should be play's name from user input
  // requires footer navbar
  const handleDownloadPNG = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    var link = document.createElement('a');
    link.download = 'stage.jpeg'; //.png also
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJPG = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 3, mimeType: "image/jpg" });
    var link = document.createElement('a');
    link.download = 'stage.jpg';
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

  const handleToggleSpeedDial = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen);
  };

  const handleDeleteAllTextTags = () => {
    deleteAllTextTags();
  };

  const handleDeleteAllLines = () => {
    deleteAllLines();
  };


  const actions = [
    { name:"Delete All" , icon: <BsTrash3Fill size={20}   />, action: handleDeleteAll },
    { name: "Download PNG.", icon: < PiFilePng size={25} />, action: handleDownloadPNG },
    { name: "Download JPG.", icon: < PiFileJpg size={25} />, action: handleDownloadJPG },
    { name:"Delete Offense Formation" , icon: <FlashOffIcon  size={30}/>, action: handleDeleteOffenseFormation},
    { name: "Delete Defense Formation" , icon: <RemoveModeratorIcon />, action: handleDeleteDefenseFormation },
    { name: "Delete All Text Tags", icon: <FontDownloadOffIcon />, action: handleDeleteAllTextTags},
    { name: "Delete All Lines", icon: <AiOutlineDeleteColumn size={20}/>, action: handleDeleteAllLines},
  ];

const handleOnClickButton = () =>
{
  console.log("Button Clicked");

};

const [tooltipOpen, setTooltipOpen] = useState(false);
const [tooltipTimeoutId, setTooltipTimeoutId] = useState(null);

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



  return (
    <>
      <ThemeProvider theme={theme}>
        <StageDimensionsContext.Provider value={{ stageDimensions }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1vw',
            height: '90vh',
            width: '98vw',
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
                flipAllLines={flipAllLines}
                backgroundImage={backgroundImage}
                lines={lines}
                setLines={setLines}
              />
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1.8,
              padding: '1vw',
              maxWidth: 'calc(80% - 4vw)',
              marginRight: '2vw',
              borderTop: '1px solid black',
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              height: '100%',
              backgroundColor: '#dcdcdc', // See parent div
            }}>
              <Canvas
                imageRef={imageRef}
                currentLayerData={currentLayerData}
                setCurrentLayerData={setCurrentLayerData}
                colorButtonPressCount={colorButtonPressCount}
                strokeTypeButtonPressCount={strokeTypeButtonPressCount}
                strokeEndButtonPressCount={strokeEndButtonPressCount}
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
                selectedLineEnd={selectedLineEnd}
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
                sx={{ position: 'fixed', bottom: '60px', right: '20px',  marginTop: '15px', marginRight: '2.5vw' }}
                icon={<IoIosAdd color = '#2B76BA' style={{ fontSize: '30px' }}/>}
                FabProps={{ size: 'small', color: 'white' }}
                onClick = {handleOnClickButton}
              />
            </div>
          </div>
        </StageDimensionsContext.Provider>
      </ThemeProvider>
    </>
  );
}
export default App;