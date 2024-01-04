// CenterSquare.jsx
//TODO: line functionality like ReceiverOval
import React, { useState } from 'react';
import { Rect, Group } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';

const getAnchorPoints = (width, height) => {
    return [
        { x: -5, y: height / 2 },
        { x: width / 2, y: -5 },
        { x: width + 5, y: height / 2 },
        { x: width / 2, y: height + 5 },
    ];
}

const CenterSquare = (props) => {
    const {
        id,
        shapeRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
        handleOnClick,
        handleRightClick,
        handleDeleteClick,
        handleDragStart,
        handleDragEnd,
        handleHideContextMenu,
        rectSize,
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID,
    } = props;

    const anchorPoints = getAnchorPoints(rectSize.width, rectSize.height);
    const anchors = anchorPoints.map((point, index) => (
        <Anchor
            key={`anchor-${index}`}
            x={point.x}
            y={point.y}
            onDragStart={() => { console.log('onDragStart'); }}
            onDragMove={() => { console.log('onDragMove'); }}
            onDragEnd={() => { console.log('onDragEnd'); }}
        />
    ));

    const strokeOptions = { color: 'black', strokeWidth: 2 };
    const centerLineWidth = 3.5;

    const states = [
        { leftState: 0, rightState: 100, colorOne: initialColor, colorTwo: "black" }, // fully initialColor
        { leftState: 0, rightState: rectSize.width / 2, colorOne: "black", colorTwo: initialColor }, // right fill
        { leftState: 0, rightState: rectSize.width / 2, colorOne: initialColor, colorTwo: "black" }, // left fill
        { leftState: -1, rightState: 0, colorOne: initialColor, colorTwo: "white" } // all fill
    ];

    const [stateIndex, setStateIndex] = useState(0);
    const [state, setState] = useState(states[stateIndex]);

    const handleCenterClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState(states[newIndex]);
        setSelectedShapeID(id);
        console.log('Selected Shape ID:', id);
    };

    return (
        <>
            <Group
                ref={shapeRef}
                x={position.x}
                y={position.y}
                onContextMenu={handleRightClick}
                draggable={true}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                dragBoundFunc={dragBoundFunc}
            >
                <Rect
                    width={rectSize.width}
                    height={rectSize.height}
                    stroke={strokeOptions.color}
                    strokeWidth={strokeOptions.strokeWidth}
                    cornerRadius={2}
                    onClick={handleCenterClick}
                    fillLinearGradientStartPoint={{ x: state.leftState, y: 0 }}
                    fillLinearGradientEndPoint={{ x: state.rightState, y: 0 }}
                    fillLinearGradientColorStops={[1, state.colorOne, 1, state.colorTwo]}
                />
                {stateIndex === 3 && (
                    <Rect
                        x={rectSize.width / 2 - 1}
                        y={0}
                        onClick={handleCenterClick}
                        width={centerLineWidth}
                        height={rectSize.height}
                        fill="black"
                    />
                )}
                {selectedShapeID === id && anchors}
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default CenterSquare;