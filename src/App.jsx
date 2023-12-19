// App.jsx
import React, { useState, useRef } from 'react';
import StageDimensionsContext from './contexts/StageDimensionsContext';
import Canvas from './components/Canvas';
import Stencil from './components/Stencil';
import useShapes from './hooks/useShapes';
import useBackground from './hooks/useBackground';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
////////////////////////////////////////////////////////////////////////////////////////
/* 
TODO: add undo/redo 
TODO: add selection rectangle
TODO: add boundary on stage/canvas s.t. you cannot drag a shape off the canvas
TODO: save and load feature (requires database)
*/
////////////////////////////////////////////////////////////////////////////////////////
function App() {
  const imageRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });
  const { backgroundImage, fieldType, setFieldType, setZone, zone, setRedLine, redLine } = useBackground();
  const { shapes, addFormation, addShape, updateShape, deleteShape, deleteFormation, deleteAllShapes, hideShapeContextMenu } = useShapes(stageDimensions, imageRef);

  //TODO: implement selection rectangle starting by adding all clicked shapes to selectedShapeIds
  const [selectedShapeIds, setSelectedShapeIds] = useState([]);


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
            <div style={{ flex: 0.2, padding: '1vw', minWidth: '15%', border: '1px solid black', height: '100%', overflow: 'auto', backgroundColor: '#333' }}>
              <Stencil
                onAddFormation={addFormation}
                onAddShape={addShape}
                fieldType={fieldType}
                setFieldType={setFieldType}
                setZone={setZone}
                zone={zone}
                setRedLine={setRedLine}
                redLine={redLine}
                onDeleteAllShapes={deleteAllShapes}
                onChangeFormation={deleteFormation} //deletes all other formation shapes except one chosen
              />
            </div>
            <div style={{
              display: 'flex',
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
              backgroundColor: '#f5f5f5', // See parent div
            }}>
              <Canvas
                imageRef={imageRef}
                shapes={shapes}
                selectedId={selectedId}
                selectedShapeIds={selectedShapeIds}
                setSelectedShapeIds={setSelectedShapeIds}
                onSelect={setSelectedId}
                onChange={updateShape}
                onDelete={deleteShape}
                onHideContextMenu={hideShapeContextMenu}
                backgroundImage={backgroundImage}
                setStageDimensions={setStageDimensions}
              />
            </div>
          </div>
        </StageDimensionsContext.Provider>
      </ThemeProvider>
    </>
  );
}
export default App;