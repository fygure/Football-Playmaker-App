// LinemanOval.jsx
import React, { useState } from 'react';
import { Ellipse, Group, Line } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

const LinemanOval = (props) => {
    const {
        shapeRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
        isSelected,
        handleOnClick,
        handleRightClick,
        handleDeleteClick,
        handleDragStart,
        handleDragEnd,
        handleHideContextMenu,
        ellipseRadiuses
    } = props;

    const strokeOptions = { color: 'black', strokeWidth: 2 };

    const states = [
        { leftState: 0, rightState: 200}, // fully orange
        { leftState: 0, rightState: -1 }, // right fill
        { leftState: 0, rightState: 1 }, // left fill
        { leftState: -200, rightState: 1 } // all fill
    ];

    const lineStates = [
        180,
        270,
        315,
        360,
        405,
        450,
    ];

    const [stateIndex, setStateIndex] = useState(0);
    const [lineIndex, setLineIndex] = useState(0);
    const [state, setState] = useState({colorState: states[stateIndex], lineState: lineStates[lineIndex]});

    const handleClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState({colorState: states[newIndex], lineState: lineStates[lineIndex]});
    };

    const handleLineClick = () =>{
        const newLine = (lineIndex + 1) % lineStates.length;
        setLineIndex(newLine);
        setState({colorState: states[stateIndex], lineState: lineStates[newLine]})
    };

    return (
        <>
        <Group draggable>
            <Ellipse 
                ref={shapeRef}
                x={position.x}
                y={position.y}
                radiusX={ellipseRadiuses.x}
                radiusY={ellipseRadiuses.y}
                stroke={strokeOptions.color}
                strokeWidth={strokeOptions.strokeWidth}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={handleClick}
                onContextMenu={handleRightClick}
                fillLinearGradientStartPoint={{ x: state.colorState.leftState, y: 0 }}
                fillLinearGradientEndPoint={{ x: state.colorState.rightState, y: 0 }}
                fillLinearGradientColorStops={[0, initialColor, 1, 'black']}
            />
            <Line 
                points={[position.x, position.y+ellipseRadiuses.y, position.x, position.y+ellipseRadiuses.x*1.2]}
                strokeWidth={strokeOptions.strokeWidth}
                stroke={'black'}
            />
            <Line 
                points={[position.x, position.y+ellipseRadiuses.x*1.2, position.x+Math.sin(Math.PI/180 *state.lineState)*ellipseRadiuses.x*.55, position.y+ellipseRadiuses.x*1.2+Math.cos(Math.PI/180 *state.lineState)*ellipseRadiuses.x*.55]}
                strokeWidth={strokeOptions.strokeWidth}
                stroke={'black'}
            />

            <Line 
                points={[position.x+Math.sin(Math.PI/180 *(state.lineState+25))*ellipseRadiuses.x*.55, position.y+ellipseRadiuses.x*1.2+Math.cos(Math.PI/180 *(state.lineState+25))*ellipseRadiuses.x*.55, position.x+Math.sin(Math.PI/180 *(state.lineState-25))*ellipseRadiuses.x*.55, position.y+ellipseRadiuses.x*1.2+Math.cos(Math.PI/180 *(state.lineState-25))*ellipseRadiuses.x*.55 ]}
                strokeWidth={strokeOptions.strokeWidth}
                stroke={'black'}
            />

            <Ellipse 
             ref={shapeRef}
             x={position.x}
             y={position.y+ellipseRadiuses.x*1.2}
             radiusX={ellipseRadiuses.x/5}
             radiusY={ellipseRadiuses.x/5}
             stroke={'black'}
             fill={'black'}
             onClick={handleLineClick}
             strokeWidth={strokeOptions.strokeWidth}
             onDragStart={handleDragStart}
             onDragEnd={handleDragEnd}
             onContextMenu={handleRightClick}
            />
            
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default LinemanOval;