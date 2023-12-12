import React, { useState, useRef, useContext, useEffect, createContext } from 'react';
import { Stage, Layer, Group, Rect, Circle, Ring, Text, Star, Transformer } from 'react-konva';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';

// ContextMenu.js
//TODO: handle "onMouseLeave" event
function ContextMenu({ position, onDelete, onMouseLeave }) {
  return (
    <Group
      x={position.x}
      y={position.y}
      onMouseLeave={onMouseLeave}
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

  const handleRightClick = (e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    setContextMenuPosition({ x: mousePos.x - 20, y: mousePos.y - 15 });
    setShowContextMenu(true);
  };

  const handleDeleteClick = () => {
    setShowContextMenu(false);
    onDelete(id);
  };

  const handleDragStart = () => {
    setShowContextMenu(false);
  };

  const handleDragEnd = (e) => {
    //console.log(e.target.position());
    setPosition(e.target.position());
    onChange(id, { x: e.target.x(), y: e.target.y() });
  };

  const handleTransformStart = () => {
    setShowContextMenu(false);
  };

  const handleHideContextMenu = () => {
    setShowContextMenu(false);
  }
  const handleTransformEnd = () => {
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
    case 'Star':
      return (
        <>
          <Star
            ref={shapeRef}
            x={position.x}
            y={position.y}
            innerRadius={30}
            outerRadius={70}
            fill={initialColor}
            onDragStart={handleDragStart}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked') }}
            onContextMenu={handleRightClick}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformStart={handleTransformStart}
              onTransformEnd={handleTransformEnd}
            />
          )}
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
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
            onDragStart={handleDragStart}
            draggable={true}
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked'); }}
            onContextMenu={handleRightClick}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformStart={handleTransformStart}
              onTransformEnd={handleTransformEnd}
            />
          )}
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />/*This is where we need to add "onMouseLeave" event*/}
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
            onDragStart={handleDragStart}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked') }}
            onContextMenu={handleRightClick}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformStart={handleTransformStart}
              onTransformEnd={handleTransformEnd}
            />)
          }
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
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
            onDragStart={handleDragStart}
            draggable
            onDragEnd={handleDragEnd}
            onClick={() => { onSelect(id); console.log(shapeType, 'clicked') }}
            onContextMenu={handleRightClick}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              onTransformStart={handleTransformStart}
              onTransformEnd={handleTransformEnd}
            />)
          }
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      )
    default:
      return null;
  }
}


// Canvas.js
function Canvas({ shapes, selectedId, onSelect, onChange, onDelete, onHideContextMenu }) {
  //e is event handler (mouse click,drag)
  const handleStageClick = (e) => {
    console.log(shapes);
    // if clicked on empty area - remove all selections
    onHideContextMenu();
    console.log(e);
    if (e.target === e.target.getStage()) {
      onSelect(null);
    }
  };

  return (
    //  where shapes are created //calls and defines the function "shape"
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
  //TODO: create a button and handler that adds a star
  const handleAddStar = () => {
    onAddShape('Star', { x: 50, y: 50 }, 'yellow');
  };
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
      <button onClick={handleAddStar}>Add Star</button>
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      <button onClick={handleAddCircle}>Add Circle</button>
      <button onClick={handleAddRing}>Add Ring</button>
    </div>
  );
}
// App.js
function App() {
  //tools
  //variable containing the current state //setShapes updates the current state
  const [shapes, setShapes] = useState([]); //default parameter (moment in time)
  const [selectedId, setSelectedId] = useState(null);
  //This adds the new shape to the "shapes" array state
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

  const handleHideContextMenu = () => {
    setShapes(shapes.map(shape => ({ ...shape, showContextMenu: false })));
  };




  return (
    <>
      <Stencil onAddShape={handleAddShape} />
      <Canvas
        //handle is where it's defined, "on" is where it's called
        shapes={shapes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onChange={handleUpdateShape}
        onDelete={handleDeleteShape}
        onHideContextMenu={handleHideContextMenu}
      />
    </>
  );
}


export default App;