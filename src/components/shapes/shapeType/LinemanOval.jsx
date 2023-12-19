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
        180, // straight up
        270, // left
        315, // left down
        360, // straight down
        405, // right down
        450, // right
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

    const dotDisplacement = ellipseRadiuses.x*1.2;
    const LineRadius = ellipseRadiuses.x*0.55;
    const subLineLength = 25;
    const polarX = (degrees) => {
        return Math.sin(Math.PI/180 *degrees)*LineRadius;
    }

    const polarY = (degrees) => {
        return Math.cos(Math.PI/180 *degrees)*LineRadius;
    }

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
                points={[position.x, position.y+ellipseRadiuses.y, position.x, position.y+dotDisplacement]}
                strokeWidth={strokeOptions.strokeWidth}
                stroke={'black'}
            />
            <Line 
                points={[position.x, position.y+dotDisplacement, 
                    position.x+polarX(state.lineState), position.y+dotDisplacement+polarY(state.lineState)]}
                strokeWidth={strokeOptions.strokeWidth}
                stroke={'black'}
            />

            <Line 
                points={[position.x+polarX(state.lineState+subLineLength), position.y+dotDisplacement+polarY(state.lineState+subLineLength), 
                    position.x+polarX(state.lineState-subLineLength), position.y+dotDisplacement+polarY(state.lineState-subLineLength) ]}
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