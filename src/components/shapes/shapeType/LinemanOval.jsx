// LinemanOval.jsx
//TODO: line functionality like ReceiverOval
import React, { useState } from 'react';
import { Ellipse, Group, Line } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';

const getAnchorPoints = (ellipseRadiusX, ellipseRadiusY) => {
    return [
        { x: 0, y: -ellipseRadiusY - 5 },
        { x: ellipseRadiusX + 5, y: 0 },
        { x: 0, y: ellipseRadiusY + 5 },
        { x: -ellipseRadiusX - 5, y: 0 },
    ];
}


const LinemanOval = (props) => {
    const {
        id,
        startDrawing,
        setIsMouseDownOnAnchor,
        shapeRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
        handleOnClick,
        handleRightClick,
        handleDeleteClick,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        handleHideContextMenu,
        ellipseRadiuses,
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID,
    } = props;

    const anchorPoints = getAnchorPoints(ellipseRadiuses.x, ellipseRadiuses.y);
    const anchors = anchorPoints.map((point, index) => (
        <Anchor
            key={`anchor-${index}`}
            x={point.x}
            y={point.y}
            onMouseDown={(e) => {
                const startPos = e.target.getStage().getPointerPosition();
                console.log('Anchor onMouseDown', startPos);
                startDrawing(startPos, id, shapeRef.current);
                setIsMouseDownOnAnchor(true);
                e.cancelBubble = true;
            }}
        />
    ));

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

    const handleLinemanClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState({ colorState: states[newIndex], lineState: lineStates[lineIndex] });
        setSelectedShapeID(id);
        console.log('Selected Shape ID:', id);
    };

    return (
        <>
            <Group
                ref={shapeRef}
                draggable
                dragBoundFunc={dragBoundFunc}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onContextMenu={handleRightClick}
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
                    onClick={handleLinemanClick}
                    fillLinearGradientStartPoint={{ x: state.colorState.leftState, y: 0 }}
                    fillLinearGradientEndPoint={{ x: state.colorState.rightState, y: 0 }}
                    fillLinearGradientColorStops={[0, initialColor, 1, 'black']}
                />
                {selectedShapeID === id && anchors}

            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default LinemanOval;