// LinemanOval.jsx
//TODO: add custom anchor points for offense line blocking
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
        ellipseRadiuses,
        dragBoundFunc
    } = props;

    const strokeOptions = { color: 'black', strokeWidth: 2 };

    const states = [
        { leftState: 0, rightState: 200 }, // fully initialColor
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
    const [state, setState] = useState({ colorState: states[stateIndex], lineState: lineStates[lineIndex] });

    const handleClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState({ colorState: states[newIndex], lineState: lineStates[lineIndex] });
    };

    const handleLineClick = () => {
        const newLine = (lineIndex + 1) % lineStates.length;
        setLineIndex(newLine);
        setState({ colorState: states[stateIndex], lineState: lineStates[newLine] })
    };

    const dotDisplacement = ellipseRadiuses.x * 1.5;
    const LineRadius = ellipseRadiuses.x * 0.85;
    const subLineLength = 17;
    const polarX = (degrees) => {
        return Math.sin(Math.PI / 180 * degrees) * LineRadius;
    }

    const polarY = (degrees) => {
        return Math.cos(Math.PI / 180 * degrees) * LineRadius;
    }

    return (
        <>
            <Group
                ref={shapeRef}
                draggable
                dragBoundFunc={dragBoundFunc}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
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
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                    fillLinearGradientStartPoint={{ x: state.colorState.leftState, y: 0 }}
                    fillLinearGradientEndPoint={{ x: state.colorState.rightState, y: 0 }}
                    fillLinearGradientColorStops={[0, initialColor, 1, 'black']}
                />
                {/* Connector to Ellipse Line */}
                <Line
                    points={[0, ellipseRadiuses.y, 0, dotDisplacement]}
                    strokeWidth={strokeOptions.strokeWidth}
                    stroke={'black'}
                />
                {/* Connector to Endpoint Line */}
                <Line
                    points={[0, dotDisplacement,
                        polarX(state.lineState), dotDisplacement + polarY(state.lineState)]}
                    strokeWidth={strokeOptions.strokeWidth}
                    stroke={'black'}
                />
                {/* Endpoint Line */}
                <Line
                    points={[polarX(state.lineState + subLineLength), dotDisplacement + polarY(state.lineState + subLineLength),
                    polarX(state.lineState - subLineLength), dotDisplacement + polarY(state.lineState - subLineLength)]}
                    strokeWidth={strokeOptions.strokeWidth}
                    stroke={'black'}
                />
                {/* Pivot Dot */}
                <Ellipse
                    x={0}
                    y={ellipseRadiuses.x * 1.5}
                    radiusX={ellipseRadiuses.x / 10}
                    radiusY={ellipseRadiuses.x / 10}
                    stroke={'black'}
                    fill={'black'}
                    onClick={handleLineClick}
                    strokeWidth={strokeOptions.strokeWidth}
                    onContextMenu={handleRightClick}
                />

            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default LinemanOval;