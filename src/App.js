import React, { useState, useRef, useContext, useEffect, createContext } from 'react';
import { Stage, Layer, Group, Rect, Circle, Ring, Text, Star, Transformer } from 'react-konva';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';

// ContextMenu.js
function ContextMenu({ position, onDelete }) {
  return (
    <Group
      x={position.x}
      y={position.y}
    >
      <Rect
        width={100}
        height={30}
        fill="white"
        stroke="black"
      />
      <Text
        text="Delete"
        width={100}
        padding={5}
        align="center"
        verticalAlign="middle"
        onClick={onDelete}
      />
    </Group>
  );
}

// Shape.js
function Shape({ id, shapeType, initialPosition, initialColor, isSelected, onSelect, onChange, onDelete }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  console.log(`Shape ${id} is selected: ${isSelected}`);
//   useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (showContextMenu && event.target.tagName.toLowerCase() !== 'text') {
//       setShowContextMenu(false);
//     }
//   };

//   window.addEventListener('mousedown', handleClickOutside);

//   return () => {
//     window.removeEventListener('mousedown', handleClickOutside);
//   };
// }, [showContextMenu]);
  

  const handleRightClick = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    setContextMenuPosition({ x: mousePos.x - 10, y: mousePos.y -10 });
    setShowContextMenu(true);
  };

  const handleDeleteClick = () => {
    setShowContextMenu(false);
    onDelete(id);
  };

  const handleDragEnd = (e) => {
    setShowContextMenu(false);
    
    //console.log(e.target.position());
    setPosition(e.target.position());
    onChange(id, { x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = () => {
    setShowContextMenu(false);
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    // update the state with the new width and height
    // node.scaleX(1);
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
            onContextMenu={handleRightClick}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformEnd={handleTransformEnd}
            />
          )}
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick}/>}
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
            />)
          }
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick}/>}
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
            />)
          }
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick}/>}
        </>
      )
    default:
      return null;
  }
}


// Canvas.js
function Canvas({ shapes, selectedId, onSelect, onChange, onDelete,  onHideContextMenu }) {
  const handleStageClick = (e) => {
    // if clicked on empty area - remove all selections
    if (e.target === e.target.getStage()) {
      onSelect(null);
      onHideContextMenu();
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
    >
      <Layer>
        {shapes.map((shape) => (
          <Shape
            key={shape.id}
            id={shape.id}
            shapeType={shape.shapeType}
            initialPosition={shape.initialPosition}
            initialColor={shape.initialColor}
            isSelected={shape.id === selectedId}
            onSelect={onSelect}
            onChange={onChange}
            onDelete={onDelete}
            onHideContextMenu={onHideContextMenu}
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

  const handleUpdateShape = (id, newAttributes) => {
    setShapes(shapes.map(shape => shape.id === id ? { ...shape, ...newAttributes } : shape));
  };

  const handleDeleteShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id));
  }

  const onHideContextMenu = () => {
    setShapes(shapes.map(shape => ({ ...shape, showContextMenu: false })));
  };




  return (
    <>
      <Stencil onAddShape={handleAddShape} />
      <Canvas
        shapes={shapes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onChange={handleUpdateShape}
        onDelete={handleDeleteShape}
        onHideContextMenu={onHideContextMenu}
      />
    </>
  );
}


export default App;