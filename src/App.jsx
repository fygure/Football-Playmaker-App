// App.jsx
import React, { useState, useRef} from 'react';
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
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import './App.css';
import useLines from './hooks/useLines';
import { v4 as uuidv4 } from 'uuid';
////////////////////////////////////////////////////////////////////////////////////////
/*
TODO: add undo/redo
TODO: footer navbar
TOOD: orientation
*/
////////////////////////////////////////////////////////////////////////////////////////
function App() {
  const undo = useRef({index: 0, values: []});
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  const [colorButtonPressCount, setColorButtonPressCount] = useState(0);
  const [strokeTypeButtonPressCount, setStrokeTypeButtonPressCount] = useState(0);
  const [strokeEndButtonPressCount, setStrokeEndButtonPressCount] = useState(0);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedTextTags, setSelectedTextTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState(theme.palette.pitchBlack.main); //default color
  const [selectedLineStroke, setSelectedLineStroke] = useState('straight'); // default straight line
  const [selectedLineEnd, setSelectedLineEnd] = useState('arrow'); // default arrow line end
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const { backgroundImage, fieldType, setFieldType, setZone, zone, setRedLine, redLine } = useBackground();
  const { shapes, setShapes, addFormation, addShape, updateShape, deleteShape, deleteFormation, deleteAllShapes, hideShapeContextMenu } = useShapes(imageRef);
  const { textTags, setTextTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags } = useTextTags(imageRef);
  const { lines, startPos, endPos, startDrawing, draw, stopDrawing, deleteAllLines, setLines, deleteLine, updateLine } = useLines(imageRef);


  //TODO: Name of download should be play's name from user input
  // requires footer navbar
  const handleDownload = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    var link = document.createElement('a');
    link.download = 'stage.jpeg'; //.png also
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const logHistory = (values) =>{
    for(var i =0; i< undo.current.index; i++)
            undo.current.values.pop();
      undo.current.index = 0;
      undo.current.values.push(values);
  }

  const preformUndo = (index) => {
    if(undo.current.values[index].type === "shape"){
      undoShape(index);
    }else {
      undoText(index);
    }
  }

  const undoText = (index) => {
    const text = textTags.find(s => s.id === undo.current.values[index].id);
    text.initialPosition = {x: undo.current.values[index].x, y: undo.current.values[index].y};
    text.x = undo.current.values[index].x;
    text.y = undo.current.values[index].y;
    text.key = uuidv4();
    updateTextTag(text.id, text);
  }

  const undoShape = (index) => {
    const shape = shapes.find(shape => shape.id === undo.current.values[index].id);
    shape.initialPosition = {x: undo.current.values[index].x, y: undo.current.values[index].y};
    shape.x = undo.current.values[index].x;
    shape.y = undo.current.values[index].y;
    shape.key = uuidv4();
    updateShape(shape.id, shape);
  }

  
  const handleUndo = () => {
    if(undo.current.index >= undo.current.values.length){
      return;
    }
    const index = undo.current.values.length-1-undo.current.index;
    preformUndo(index);
    undo.current.index += 1;
  }

  

  const handleRedo = () => {
    if(undo.current.index ===0) {
      return;
    }
    const index = undo.current.values.length-undo.current.index;
    preformUndo(index);
    undo.current.index -= 1;
  }

  const handleDeleteAll = () => {
    deleteAllShapes();
    deleteAllTextTags();
    deleteAllLines();
  };

  const handleToggleSpeedDial = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen);
  };


  const actions = [
    { icon: <DeleteForeverOutlinedIcon />, action: handleDeleteAll },
    { icon: <DownloadIcon />, action: handleDownload },
  ];


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
                logHistory={logHistory}
                // redo={redo}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
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
                logHistory={logHistory}
                imageRef={imageRef}
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
                  />
                ))}
              </SpeedDial>
            </div>
          </div>
        </StageDimensionsContext.Provider>
      </ThemeProvider>
    </>
  );
}
export default App;