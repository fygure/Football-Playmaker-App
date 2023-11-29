import React, { useState, useRef, useContext, useEffect, createContext } from 'react';
import { Stage, Layer, Rect, Circle, Ring, Text, Star, Transformer } from 'react-konva';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';

// Shape.js
function Shape({ id, shapeType, initialPosition, initialColor, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const [position, setPosition] = useState(initialPosition);

  //console.log(`Shape ${id} is selected: ${isSelected}`);

  const handleDragEnd = (e) => {
    //console.log(e.target.position());
    setPosition(e.target.position());
    onChange(id, { x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // update the state with the new width and height
    // node.scaleX(1);
    // node.scaleY(1);
    onChange(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
      rotation: node.rotation(),
      fill: node.fill(),
      scaleX: scaleX,
      scaleY: scaleY,
      shapeType: shapeType
    });
    console.log(node);
  };

  //Attach transformer to shape manually
  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  switch (shapeType) {
    case 'Rectangle':
      return (
        <>
          <Rect
            ref={shapeRef}
            x={position.x}
            y={position.y}
            width={100}
            height={100}
            fill={initialColor}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked'); }}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformEnd={handleTransformEnd}
            />
          )}
        </>
      );
    case 'Circle':
      return (
        <>
          <Circle
            ref={shapeRef}
            x={position.x}
            y={position.y}
            radius={50}
            fill={initialColor}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked') }}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformEnd={handleTransformEnd}
            />
          )}
        </>
      );
    case 'Ring':
      return (
        <>
          <Ring
            ref={shapeRef}
            x={position.x}
            y={position.y}
            innerRadius={40}
            outerRadius={70}
            fill={initialColor}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked') }}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformEnd={handleTransformEnd}
            />
          )}
        </>
      )
    default:
      return null;
  }
}


// Canvas.js
function Canvas({ shapes, selectedId, onSelect, onChange }) {
  const handleStageClick = (e) => {
    // if clicked on empty area - remove all selections
    if (e.target === e.target.getStage()) {
      onSelect(null);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
    >
      <Layer>
        {shapes.map((shape, i) => (
          <Shape
            key={i}
            id={shape.id}
            shapeType={shape.shapeType}
            initialPosition={shape.initialPosition}
            initialColor={shape.initialColor}
            isSelected={shape.id === selectedId}
            onSelect={onSelect}
            onChange={onChange}
          />
        ))}
      </Layer>
    </Stage>
  );
}

// Stencil.js
function Stencil({ onAddShape }) {
  const handleAddRectangle = () => {
    onAddShape('Rectangle', { x: 20, y: 20 }, 'red');
  };

  const handleAddCircle = () => {
    onAddShape('Circle', { x: 150, y: 150 }, 'blue');
  };

  const handleAddRing = () => {
    onAddShape('Ring', { x: 150, y: 150 }, 'green');
  }

  return (
    <div>
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      <button onClick={handleAddCircle}>Add Circle</button>
      <button onClick={handleAddRing}>Add Ring</button>
    </div>
  );
}
// App.js
function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleAddShape = (shapeType, initialPosition, initialColor) => {
    const newShape = { id: uuidv4(), shapeType, initialPosition, initialColor };
    setShapes([...shapes, newShape]);
  };

  const updateShape = (id, newAttributes) => {
    setShapes(shapes.map(shape => shape.id === id ? { ...shape, ...newAttributes } : shape));
  };

  return (
    <>
      <Stencil onAddShape={handleAddShape} />
      <Canvas
        shapes={shapes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onChange={updateShape}
      />
    </>
  );
}


export default App;