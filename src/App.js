import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { Stage, Layer, Rect, Circle, Ring, Text, Star } from 'react-konva';
import Konva from 'konva';
///////////////////////////////////////////////////////////////////////
//CONTEXTS (allows data sharing across component tree w/o passing props)
///////////////////////////////////////////////////////////////////////
const HistoryContext = createContext();
///////////////////////////////////////////////////////////////////////
//HOOKS
///////////////////////////////////////////////////////////////////////
// Custom Hook for common shape functionalities
const useShape = (shapeType, initialPosition, initialColor) => {
  const shapeRef = useRef(null);
  const [color, setColor] = useState(initialColor);
  const [position, setPosition] = useState(initialPosition);
  const [visibility, setVisibility] = useState(true);
  //const history = useContext(HistoryContext);

  const handleClick = (e) => {
    //console.log(shapeRef.current);
    setColor(Konva.Util.getRandomColor());
  };

  const handleDragStart = () => {
    const currentPos = {
      x: shapeRef.current.x(),
      y: shapeRef.current.y(),
    };
    setPosition(currentPos);
    console.log(`${shapeType} from (x:${currentPos.x}, y:${currentPos.y})`);
  };

  const handleDragEnd = () => {
    const currentPos = {
      x: shapeRef.current.x(),
      y: shapeRef.current.y(),
    };
    setPosition(currentPos);
    console.log(`${shapeType} to (x:${currentPos.x}, y:${currentPos.y})`);

    //history.addToHistory({ shapeType, shapeRef, position: currentPos })
  };

  const handleDblClick = () => {
    console.log(`${shapeType} double clicked!`)
  }

  //Hides shape
  const handleRightClick = (e) => {
    e.evt.preventDefault(true);
    setVisibility(false);
    //console.log(e.target.getStage());
    console.log(`${shapeType} Removed`);
  };

  const setPositionExternal = (newPosition) => {
    setPosition(newPosition);
  };

  return {
    shapeRef,
    color,
    position,
    visibility,
    handleClick,
    handleDragStart,
    handleDragEnd,
    handleDblClick,
    handleRightClick,
    setPositionExternal,
  };
};
// FIXME: Custom Hook for undo/redo actions
// PERHAPS: implement these funcitons inside the useShape hook?
// PERHAPS: you want a general history for every action, you need shapeRef for sure and update it
// const useHistory = (shapeRef) => {
//   const [history, setHistory] = useState([]);
//   const [historyIndex, setHistoryIndex] = useState(0);

//   const addToHistory = (newState) => {
//     //Slice returns new array of old array's [0, historyIndex + 1)
//     const newHistory = history.slice(0, historyIndex + 1);
//     newHistory.push(newState);
//     setHistory(newHistory);
//     setHistoryIndex(historyIndex + 1);
//     console.log(newHistory);
//   };

//   const undo = () => {
//     console.log('undo');
//     console.log(history.slice(-1));
//     if (historyIndex <= 0) return;
//     setHistoryIndex(historyIndex - 1);
//   };

//   const redo = () => {
//     console.log('redo');
//     if (historyIndex >= history.length - 1) return;
//     setHistoryIndex(historyIndex + 1);
//   };


//   return {
//     history,
//     addToHistory,
//     undo,
//     redo,
//   };
// };
///////////////////////////////////////////////////////////////////////
//SHAPES (Each shape functionality is from hook: useShape)
/* 
  There are also:
    Wedge
    Arc
    Ellipse
    Image
    Line
*/
///////////////////////////////////////////////////////////////////////
const MyCircle = () => {
  const shapeType = 'Circle';
  const { shapeRef, color, position, visibility,
    handleClick, handleDragStart, handleDragEnd,
    handleDblClick, handleRightClick }
    = useShape(
      shapeType,
      { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      'orange',
    );


  return (
    <Circle
      x={position.x}
      y={position.y}
      radius={50}
      shadowBlur={5}
      fill={color}
      draggable
      ref={shapeRef}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
      onContextMenu={handleRightClick}
      visible={visibility}
    />
  );
};

const MyRectangle = () => {
  const shapeType = 'Rectangle';
  const { shapeRef, color, position, visibility,
    handleClick, handleDragStart, handleDragEnd,
    handleDblClick, handleRightClick }
    = useShape(
      shapeType,
      { x: 50, y: 50 },
      'green'
    );

  return (
    <Rect
      x={position.x}
      y={position.y}
      width={50}
      height={50}
      fill={color}
      stroke="orange"
      strokeWidth={12}
      strokeRadius={12}
      cornerRadius={12}
      shadowBlur={5}
      onClick={handleClick}
      ref={shapeRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
      onContextMenu={handleRightClick}
      visible={visibility}
    />
  );
};

const MyRing = () => {
  const shapeType = 'Ring';
  const { shapeRef, color, position, visibility,
    handleClick, handleDragStart, handleDragEnd,
    handleDblClick, handleRightClick }
    = useShape(
      shapeType,
      { x: 350, y: 80 },
      'red'
    );

  return (
    <Ring
      x={position.x}
      y={position.y}
      fill={color}
      ref={shapeRef}
      shadowBlur={5}
      outerRadius={60}
      innerRadius={40}
      draggable={true}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
      onContextMenu={handleRightClick}
      visible={visibility}
    />
  );
};

const MyStar = () => {
  const shapeType = 'Star';
  const { shapeRef, color, position, visibility,
    handleClick, handleDragStart, handleDragEnd,
    handleDblClick, handleRightClick }
    = useShape(
      shapeType,
      { x: 200, y: 200 },
      'purple'
    );

  return (
    <Star
      x={position.x}
      y={position.y}
      outerRadius={60}
      innerRadius={35}
      fill={color}
      ref={shapeRef}
      draggable={true}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDblClick={handleDblClick}
      shadowBlur={5}
      stroke={"red"}
      onContextMenu={handleRightClick}
      visible={visibility}
    />
  );
}

///////////////////////////////////////////////////////////////////////
//APP
///////////////////////////////////////////////////////////////////////
function App() {
  //const history = useHistory();

  return (
    <>
      {/* <HistoryContext.Provider value={history}> */}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try interacting with the shapes" draggable />
          {/* <Text text="undo" y={20} onClick={() => { history.undo(); }} /> */}
          {/* <Text text="redo" x={40} y={20} onClick={() => { history.redo(); }} /> */}
          {/* <Text text="add" x={80} y={20} onClick={() => { history.addToHistory({}); }} /> */}
          <MyRectangle />
          <MyCircle />
          <MyRing />
          <MyStar />
        </Layer>
      </Stage>
      {/* </HistoryContext.Provider> */}
    </>
  );
}

export default App;
