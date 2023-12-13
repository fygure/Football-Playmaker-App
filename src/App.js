import React, { useState, useRef, useEffect, } from 'react';
import { Stage, Layer, Group, Rect, Circle, Ring, Text, Star, Transformer, Ellipse, Image } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import useImage from 'use-image';
import './App.css';

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
function Shape({ id, shapeType, initialPosition, initialColor, isSelected, onSelect, onChange, onDelete }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const ellipseRadiuses = { x: 20, y: 15 };
  const squareSize = { width: 30, height: 30 };
  const strokeOptions = { color: 'black', strokeWidth: 2 };
  const [position, setPosition] = useState(initialPosition);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

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
    // Update the state with the new width and height
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

  //TODO: Modify the switch statement to create the correct shapes based on shapeType
  // ex: shapeType = QBoval, then return a group with a Konva (ellipse and 'QB' text)
  // text could also be: 'Xoval', 'Yoval', 'Zoval', 'Hoval', 'RBoval'
  // ex: shapeType = Lineman, then return a group with a Konva (ellipse and line ends in a context menu? groom this!)
  // ex: shapeType = Center, then return a group with a Konva (Rect and line ends hidden at first)
  switch (shapeType) {
    case 'QBoval':
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
    case 'RBoval':
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
    case 'Xoval':
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
    case 'Hoval':
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
    case 'Yoval':
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
    case 'Zoval':
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
            onClick={handleOnClick}
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
            onClick={handleOnClick}
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
            onClick={handleOnClick}
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

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Canvas.js
function Canvas({ shapes, selectedId, onSelect, onChange, onDelete, onHideContextMenu, backgroundImage }) {
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  //useImage can take urls also
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
  }, [windowSize]);

  const handleStageClick = (e) => {
    console.log(shapes);
    // if clicked on empty area - remove all selections
    //console.log(e);
    if (e.target === e.target.getStage()) {
      onSelect(null);
    }
  };

  return (
    //  where shapes are created //calls and defines the function "shape"
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
            onClick={() => { onSelect(null); console.log('Background Clicked') }}
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
    <div style={{
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <p style={{ margin: 0 }}>{children}</p>
      <label className="switch">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
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
      <div style={{ display: 'flex', flexDirection: 'row', gap: '35px', padding: '10px' }}>


      
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
function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(process.env.PUBLIC_URL + '/static/assets/field_college_middle.png');
  const [fieldType, setFieldType] = useState('college');
  const [zone, setZone] = useState('middle');
  const [redLine, setRedLine] = useState(false);

  //TODO: This is where the shapeType will equal offense/defense formation names
  const handleAddShape = (shapeType, initialPosition, initialColor) => {
    if (shapeType === 'offense2x2') {
      //TODO: add the correct 2x2 initial positions
      const newShapes = [
        { id: uuidv4(), shapeType: 'QBoval', initialPosition: { x: initialPosition.x, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'RBoval', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Xoval', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Hoval', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Yoval', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Zoval', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Center', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
        { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: initialPosition.x + 100, y: initialPosition.y }, initialColor },
      ];
      setShapes([...shapes, ...newShapes]);
    } 
  else {
      const newShape = { id: uuidv4(), shapeType, initialPosition, initialColor };
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

  return (
    <>
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
          />
        </div>
      </div>
    </>
  );
}
export default App;