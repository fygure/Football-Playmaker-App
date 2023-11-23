import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Ring, Text } from 'react-konva';
import Konva from 'konva';

// Custom Hook for common shape functionalities
const useShape = (shapeType, initialPosition, initialColor) => {
  const shapeRef = useRef();
  const [color, setColor] = useState(initialColor);
  const [position, setPosition] = useState(initialPosition);

  const handleClick = () => {
    console.log(shapeRef.current);
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

  return {
    shapeRef,
    color,
    position,
    handleClick,
    handleDragStart,
    handleDragEnd,
  };
};

const MyCircle = () => {
  const { shapeRef, color, position, handleClick, handleDragStart, handleDragEnd } = useShape(
    'Circle',
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
    />
  );
};

const MyRectangle = () => {
  const { shapeRef, color, position, handleClick, handleDragStart, handleDragEnd } = useShape(
    'Rectangle',
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
    />
  );
};

const MyRing = () => {
  const { shapeRef, color, position, handleClick, handleDragStart, handleDragEnd } = useShape(
    'Ring',
    { x: 350, y: 80 },
    'red'
  );

  return (
    <Ring
      x={position.x}
      y={position.y}
      fill={color}
      ref={shapeRef}
      outerRadius={60}
      innerRadius={40}
      draggable={true}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};

function App() {
  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try interacting with the shapes" />
          <MyRectangle />
          <MyCircle />
          <MyRing />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
