import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react';
import { Stage, Layer, Group, Rect, Circle, Ring, Text, Star, Transformer, Ellipse, Image } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import useImage from 'use-image';
import './App.css';
import { FormControlLabel, Switch, Typography } from '@mui/material';

const StageDimensionsContext = createContext();
// ContextMenu.js
function ContextMenu({ position, onDelete, onMouseLeave }) {
   const rectWidth = 100;
  const rectHeight = 30;
  const padding = 8;

  return (
    <Group
      x={position.x}
      y={position.y}
      onMouseLeave={onMouseLeave}
    >
      <Rect
        width={rectWidth}
        height={rectHeight}
        fill="#f0f0f0" // Light gray background color
        stroke="#888" // Gray border color
        cornerRadius={5} // Rounded corners
        shadowBlur={5}
        shadowColor="#aaa" // Shadow color
      />
      <Text
        text="Delete"
        width={rectWidth}
        height={rectHeight}
        padding={padding}
        align="center"
        verticalAlign="middle"
        onClick={onDelete}
        fill="#333" // Text color
        fontFamily="Arial" // Specify a font family
        fontSize={14} // Specify a font size
      />
    </Group>
  );
}


// Shape.js
function Shape({ id, shapeType, stageRef, initialPosition, initialColor, isSelected, onSelect, onChange, onDelete }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const ellipseRadiuses = { x: 16, y: 12 };
  const squareSize = { width: 25, height: 25 };
  const strokeOptions = { color: 'black', strokeWidth: 2 };
  const [position, setPosition] = useState(initialPosition);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const parentContainer = shapeRef.current.getStage().container();
    const initialWindowSize = { width: parentContainer.offsetWidth, height: parentContainer.offsetHeight };

    const handleResize = () => {
      const scaleFactorX = parentContainer.offsetWidth / initialWindowSize.width;
      const scaleFactorY = parentContainer.offsetHeight / initialWindowSize.height;

      setPosition({
        x: position.x * scaleFactorX,
        y: position.y * scaleFactorY,
      });
        

    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);

  //console.log(`Shape ${id} is selected: ${isSelected}`);
  const handleOnClick = () => {
    onSelect(id);
    const node = shapeRef.current;
    console.log(node);
  }

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

  // const handleTransformStart = () => {
  //   setShowContextMenu(false);
  // };

  const handleHideContextMenu = () => {
    setShowContextMenu(false);
  }

  //TODO: Modify the switch statement to create the correct shapes based on shapeType
  // ex: shapeType = QBoval, then return a group with a Konva (ellipse and 'QB' text)
  // text could also be: 'Xoval', 'Yoval', 'Zoval', 'Hoval', 'RBoval'
  // ex: shapeType = Lineman, then return a group with a Konva (ellipse and line ends in a context menu? groom this!)
  // ex: shapeType = Center, then return a group with a Konva (Rect and line ends hidden at first)
  switch (shapeType) {
    case 'QBoval':
      return (
        <>
          <Group
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleOnClick}
          onContextMenu={handleRightClick}
          ref={shapeRef}
          x={position.x}
          y={position.y}
          >
            <Ellipse
              x={0}
              y={0}
              radiusX={ellipseRadiuses.x}
              radiusY={ellipseRadiuses.y}
              stroke={strokeOptions.color}
              strokeWidth={strokeOptions.strokeWidth}
              fill={initialColor}
            />
            <Text
            text="QB"
            x={-ellipseRadiuses.x / 2 - 1}
            y={-ellipseRadiuses.y / 2 + 1}
            align="center"
            fill="black"
            listening={false}
            />
          </Group>
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'RBoval':
      return (
        <>
        <Group
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleOnClick}
          onContextMenu={handleRightClick}
          ref={shapeRef}
          x={position.x}
          y={position.y}
        >
          <Ellipse
            x={0}
            y={0}
            radiusX={ellipseRadiuses.x}
            radiusY={ellipseRadiuses.y}
            stroke={strokeOptions.color}
            strokeWidth={strokeOptions.strokeWidth}
            fill={initialColor}
          />
          <Text
            text="RB"
            x={-ellipseRadiuses.x / 2}
            y={-ellipseRadiuses.y / 2 + 1}
            align="center"
            fill="black"
            listening={false}
          />
          </Group>
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'Xoval':
      return (
        <>
          <Group
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
            ref={shapeRef}
            x={position.x}
            y={position.y}
          > 
            <Ellipse
              x={0}
              y={0}
              radiusX={ellipseRadiuses.x}
              radiusY={ellipseRadiuses.y}
              stroke={strokeOptions.color}
              strokeWidth={strokeOptions.strokeWidth}
              fill={initialColor}
            />
            <Text
              text="X"
              x={-ellipseRadiuses.x / 2 + 4}
              y={-ellipseRadiuses.y / 2 + 1}
              align="center"
              fill="black"
              listening={false}
            />
          </Group>
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'Hoval':
      return (
        <>
          <Group
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
            ref={shapeRef}
            x={position.x}
            y={position.y}
          > 
            <Ellipse
              x={0}
              y={0}
              radiusX={ellipseRadiuses.x}
              radiusY={ellipseRadiuses.y}
              stroke={strokeOptions.color}
              strokeWidth={strokeOptions.strokeWidth}
              fill={initialColor}
            />
            <Text
              text="H"
              x={-ellipseRadiuses.x / 2 + 4}
              y={-ellipseRadiuses.y / 2 + 1}
              align="center"
              fill="black"
              listening={false}
            />
          </Group>
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'Yoval':
      return (
        <>
          <Group
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
            ref={shapeRef}
            x={position.x}
            y={position.y}
          > 
            <Ellipse
              x={0}
              y={0}
              radiusX={ellipseRadiuses.x}
              radiusY={ellipseRadiuses.y}
              stroke={strokeOptions.color}
              strokeWidth={strokeOptions.strokeWidth}
              fill={initialColor}
            />
            <Text
              text="Y"
              x={-ellipseRadiuses.x / 2 + 4}
              y={-ellipseRadiuses.y / 2 + 1}
              align="center"
              fill="black"
              listening={false}
            />
          </Group>
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'Zoval':
      return (
        <>
          <Group
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
            ref={shapeRef}
            x={position.x}
            y={position.y}
          > 
            <Ellipse
              x={0}
              y={0}
              radiusX={ellipseRadiuses.x}
              radiusY={ellipseRadiuses.y}
              stroke={strokeOptions.color}
              strokeWidth={strokeOptions.strokeWidth}
              fill={initialColor}
            />
            <Text
              text="Z"
              x={-ellipseRadiuses.x / 2 + 4}
              y={-ellipseRadiuses.y / 2 + 1}
              align="center"
              fill="black"
              listening={false}
            />
          </Group>
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'Lineman':
      return (
        <>
          <Ellipse
            ref={shapeRef}
            x={position.x}
            y={position.y}
            radiusX={ellipseRadiuses.x}
            radiusY={ellipseRadiuses.y}
            stroke={strokeOptions.color}
            strokeWidth={strokeOptions.strokeWidth}
            fill={initialColor}
            onDragStart={handleDragStart}
            draggable
            onDragEnd={handleDragEnd}
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
          />
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      );
    case 'Center':
      return (
        <>
          <Rect
            ref={shapeRef}
            x={position.x}
            y={position.y}
            width={squareSize.width}
            height={squareSize.height}
            fill={initialColor}
            stroke={strokeOptions.color}
            strokeWidth={strokeOptions.strokeWidth}
            onDragStart={handleDragStart}
            draggable={true}
            onDragEnd={handleDragEnd}
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
          />
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />/*This is where we need to add "onMouseLeave" event*/}
        </>
      );
    //Regular shapes below
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
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
          />
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
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
          />
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
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
          />
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
            onClick={handleOnClick}
            onContextMenu={handleRightClick}
          />
          {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
      )
    default:
      return null;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Canvas.js
function Canvas({ setStageDimensions, shapes, selectedId, onSelect, onChange, onDelete, onHideContextMenu, backgroundImage }) {
  const { stageDimensions } = useContext(StageDimensionsContext);
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [image] = useImage(backgroundImage);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    
    function fitStageIntoParentContainer() {
      if (containerRef.current && stageRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        stageRef.current.width(containerWidth);
        stageRef.current.height(containerHeight);
        stageRef.current.draw();

        setStageDimensions({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
      }
    }

    function handleResize() {
      fitStageIntoParentContainer();
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    fitStageIntoParentContainer();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStageClick = (e) => {
    console.log(shapes);
    console.log(backgroundImage)
    // if clicked on empty area - remove all selections
    //console.log(e);
    if (e.target === e.target.getStage()) {
      onSelect(null);
    }
  };

  return (
    //  where shapes are created //calls and defines the function "shape"
    <> 
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Stage
        ref={stageRef}
        width={containerRef.current ? containerRef.current.offsetWidth : 0}
        height={containerRef.current ? containerRef.current.offsetHeight : 0}
        onClick={handleStageClick}
      >
        <Layer>
          <Image
            image={image}
            width={containerRef.current ? containerRef.current.offsetWidth : 0}
            height={containerRef.current ? containerRef.current.offsetHeight : 0}
            onClick={() => { onSelect(null); console.log('Background Clicked'); console.log(stageDimensions); }}
          />
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
    </div>
    </>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stencil.js
function Stencil({ onAddShape, setFieldType, setZone, setRedLine }) {
  // College Field selected by default
  const [selectedFieldType, setSelectedFieldType] = useState('college');
  const [redZone, setLocalRedZone] = useState('middle');
  const [redLine, setLocalRedLine] = useState(false);

  // Basic shape handlers
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
  // Production

  // Field handlers
  const handleSetFieldType = (e) => {
    setFieldType(e.target.value);
    setSelectedFieldType(e.target.value);
  };
  const handleToggleZone = () => {
    const newZone = redZone === 'middle' ? 'redzone' : 'middle';
    setLocalRedZone(newZone);
    setZone(newZone);
  };
  const handleToggleRedLine = () => {
    const newRedLine = !redLine;
    setLocalRedLine(newRedLine);
    setRedLine(newRedLine);
  };
  // Formation handlers
  const handleAddOffense2x2 = () => {
    onAddShape('offense2x2', { x: 150, y: 150 }, 'orange');
  }
  // React Components
  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  );
  const RadioOption = ({ name, value, onChange, children }) => (
    <label style={{
      fontSize: '12px',
      border: '1px solid white',
      display: 'inline-block',
      fontFamily: 'Inter, sans-serif',
      padding: '5px',
      margin: '5px',
      backgroundColor: selectedFieldType === value ? 'white' : '#333',
      color: selectedFieldType === value ? '#333': 'white'
    }}>
      <input type="radio" name={name} value={value} onChange={onChange} style={{ display: 'none' }} />
      <p style={{ margin: 0 }}>{children}</p>
    </label>
  );
  const CheckboxOption = ({ onChange, children, checked }) => (
<FormControlLabel
    control={<Switch size = 'small' onChange={onChange} checked={checked} style={{ color: 'white'}} />}
    label={
      <Typography style={{ fontSize: '12px', color: 'white' }}>
        {children}
      </Typography>
    }
    labelPlacement="start"
    style={{ display: 'flex', alignItems: 'center'}}
  />
  );


  return (
    <div>
      <Button onClick={handleAddStar}>Add Star</Button>
      <Button onClick={handleAddRectangle}>Add Rectangle</Button>
      <Button onClick={handleAddCircle}>Add Circle</Button>
      <Button onClick={handleAddRing}>Add Ring</Button>
      <Button onClick={handleAddOffense2x2}>2x2</Button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'white'}}>
      <h3 style={{ marginBottom: '0', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Field</h3>

      
  <div style={{ display: 'flex',justifyContent: "flex-start" , flexDirection: 'row' }}>
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-6px'}}>
      <div>
        <RadioOption name="fieldType" value="hs" onChange={handleSetFieldType} >HIGH SCHOOL</RadioOption>
        <RadioOption name="fieldType" value="college" onChange={handleSetFieldType}>COLLEGE</RadioOption>
        <RadioOption name="fieldType" value="nfl" onChange={handleSetFieldType}>NFL</RadioOption>
        <RadioOption name="fieldType" value="blank" onChange={handleSetFieldType}>BLANK</RadioOption>
      </div>
      <div style={{ display: 'flex', gap: '35px', padding: '10px', marginLeft: '-20px' }}>
        <CheckboxOption onChange={handleToggleZone} checked={redZone === 'redzone'}>Red Zone</CheckboxOption>
        <CheckboxOption onChange={handleToggleRedLine} checked={redLine}>NFL Red Line</CheckboxOption>
      </div>
    </div>
  </div>
  <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Offense Formation</h3>
  <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Defense Formation</h3>
  <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Lines</h3>
  <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>QB Progression</h3>
  <h3 style={{ marginBottom: '0',   fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Text Tags</h3>
</div>
    </div >
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
// App.js
//TODO: add undo/redo
//TODO: add selection rectangle
function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(process.env.PUBLIC_URL + '/static/assets/field_college_middle.png');
  const [fieldType, setFieldType] = useState('college');
  const [zone, setZone] = useState('middle');
  const [redLine, setRedLine] = useState(false);
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });

  //TODO: This is where the shapeType will equal offense/defense formation names
  const handleAddShape = (shapeType, initialPosition, initialColor) => {

    const middlePosition = { x: stageDimensions.width / 2, y: stageDimensions.height / 2 };
    //console.log(stageDimensions);
    //console.log(backgroundImage);
    
    //TODO: Add more formations, fine tune the initialPositions
    if (shapeType === 'offense2x2') {
      const newShapes = [
        { id: uuidv4(), shapeType: 'QBoval', initialPosition: { x: middlePosition.x, y: middlePosition.y + stageDimensions.height * 0.1 } , initialColor },
        { id: uuidv4(), shapeType: 'RBoval', initialPosition: { x: middlePosition.x, y: middlePosition.y + stageDimensions.height * 0.1 }, initialColor },
        { id: uuidv4(), shapeType: 'Xoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Hoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Yoval', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Zoval', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.04, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.02, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.02, y: middlePosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.04, y: middlePosition.y }, initialColor },
       
      ];
      setShapes([...shapes, ...newShapes]);
    } 
  else {
      const newShape = { id: uuidv4(), shapeType, initialPosition: middlePosition, initialColor };
      setShapes([...shapes, newShape]);
    }
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

  //Background handlers
  const handleChangeBackground = () => {
    let newImage = `field_${fieldType}_${zone}`;
    if (redLine && fieldType === 'nfl') {
      newImage += '_redline';
    }
    newImage += '.png';
    setBackgroundImage(process.env.PUBLIC_URL + '/static/assets/' + newImage);
  };

  useEffect(() => {
    handleChangeBackground();
  }, [fieldType, zone, redLine]);

  //TODO
  //Save and Load
  // const saveState = () => {
  //   const parentContainer = shapeRef.current.getStage().container();
  //   const relativeShapes = shapes.map(shape => ({
  //     ...shape,
  //     position: {
  //       x: shape.position.x / parentContainer.offsetWidth,
  //       y: shape.position.y / parentContainer.offsetHeight,
  //     },
  //   }));

  //   localStorage.setItem('shapes', JSON.stringify(relativeShapes));
  // };

  // const loadState = () => {
  //   const parentContainer = shapeRef.current.getStage().container();
  //   const relativeShapes = JSON.parse(localStorage.getItem('shapes'));
  //   const absoluteShapes = relativeShapes.map(shape => ({
  //     ...shape,
  //     position: {
  //       x: shape.position.x * parentContainer.offsetWidth,
  //       y: shape.position.y * parentContainer.offsetHeight,
  //     },
  //   }));

  //   setShapes(absoluteShapes);
  // };

  return (
    <>
    <StageDimensionsContext.Provider value={{ stageDimensions }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1vw',
        height: '90vh',
        width: '98vw',
        // overflowX: 'auto'
      }}>
        <div style={{ flex: 0.2, padding: '1vw', minWidth: '15%', border: '1px solid black', height: '100%', overflow: 'auto', backgroundColor: '#333' }}>
          <Stencil
            onAddShape={handleAddShape}
            setFieldType={setFieldType}
            setZone={setZone}
            setRedLine={setRedLine}
          //toggleRedLine={handleToggleRedLine}
          />
        </div>
        <div style={{ flex: 1.8, padding: '1vw', maxWidth: 'calc(80% - 4vw)', marginRight: '2vw', borderTop: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black', height: '100%', }}>
          <Canvas
            //handle is where it's defined, "on" is where it's called
            shapes={shapes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onChange={handleUpdateShape}
            onDelete={handleDeleteShape}
            onHideContextMenu={handleHideContextMenu}
            backgroundImage={backgroundImage}
            setStageDimensions={setStageDimensions} 
          />
        </div>
      </div>
      </StageDimensionsContext.Provider>
    </>
  );
}
export default App;