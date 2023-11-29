import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Ring, Text, Star } from 'react-konva';
import Konva from 'konva';

///////////////////////////////////////////////////////////////////////
//HOOKS
///////////////////////////////////////////////////////////////////////
// Custom Hook for common shape functionalities
const useShape = (shapeType, initialPosition, initialColor) => {
  const shapeRef = useRef(null);
  const [color, setColor] = useState(initialColor);
  const [position, setPosition] = useState(initialPosition);
  const [visibility, setVisibility] = useState(true);

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
  };
};


///////////////////////////////////////////////////////////////////////
//SHAPES
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
      'orange'
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


function App() {
  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try interacting with the shapes" draggable />
          <MyRectangle />
          <MyCircle />
          <MyRing />
          <MyStar />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
