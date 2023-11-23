import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Ring } from 'react-konva';
import Konva from 'konva';

/* SHAPES! */

const MyCircle = () => {
  const circleRef = useRef();
  const [color, setColor] = useState('orange');
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // Track position

  const handleClick = () => {
    console.log(circleRef.current);
    setColor(Konva.Util.getRandomColor());
  };

  const handleDragMove = () => {
    setPosition({
      x: circleRef.current.x(),
      y: circleRef.current.y(),
    });
  }

  return (
    <Circle
      x={position.x}
      y={position.y}
      radius={50}
      shadowBlur={5}
      fill={color}
      draggable
      ref={circleRef}
      onClick={handleClick}
      onDragMove={handleDragMove}
    />
  );
}

const MyRectangle = () => {
  const rectRef = useRef();
  const [color, setColor] = useState('green');
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Track position

  const handleClick = () => {
    console.log(rectRef.current);
    setColor(Konva.Util.getRandomColor());
  };

  const handleDragStart = () => {
    // Capture initial position on drag start
    const currentPos = {
      x: rectRef.current.x(),
      y: rectRef.current.y(),
    }
    setPosition(currentPos);
    console.log(`Rect from (x:${currentPos.x}, y:${currentPos.y})`)
  };

  const handleDragEnd = () => {
    // Update position on drag end
    const currentPos = {
      x: rectRef.current.x(),
      y: rectRef.current.y(),
    }
    setPosition(currentPos);
    console.log(`Rect to (x:${currentPos.x}, y:${currentPos.y})`)
  };

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
      // opacity={0.5}
      onClick={handleClick}
      ref={rectRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}

const MyRing = () => {
  const ringRef = useRef();
  const [color, setColor] = useState('red');
  const [position, setPosition] = useState({ x: 350, y: 80 }); // Track position

  const handleClick = () => {
    console.log(ringRef.current);
    setColor(Konva.Util.getRandomColor);
  }

  const handleDragStart = () => {
    const currentPos = {
      x: ringRef.current.x(),
      y: ringRef.current.y(),
    }
    setPosition(currentPos);
    console.log(`Ring from (x:${currentPos.x}, y:${currentPos.y})`)
  }

  const handleDragEnd = () => {
    const currentPos = {
      x: ringRef.current.x(),
      y: ringRef.current.y(),
    }
    setPosition(currentPos);
    console.log(`Ring to (x:${currentPos.x}, y:${currentPos.y})`)
  }

  return (
    <Ring
      x={position.x}
      y={position.y}
      fill={color}
      ref={ringRef}
      outerRadius={60}
      innerRadius={40}
      draggable={true}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  )
}


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
