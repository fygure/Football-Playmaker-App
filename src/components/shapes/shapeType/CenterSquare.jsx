// CenterSquare.jsx
import React, { useState } from 'react';
import { Rect, Group } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

const CenterSquare = (props) => {
    const {
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
        dragBoundFunc
    } = props;

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

    const handleClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState(states[newIndex]);
    };

    return (
        <>
            <Group
                ref={shapeRef}
                x={position.x}
                y={position.y}
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
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                    fillLinearGradientStartPoint={{ x: state.leftState, y: 0 }}
                    fillLinearGradientEndPoint={{ x: state.rightState, y: 0 }}
                    fillLinearGradientColorStops={[1, state.colorOne, 1, state.colorTwo]}
                />
                {stateIndex === 3 && (
                    <Rect
                        x={rectSize.width / 2 - 1}
                        y={0}
                        width={centerLineWidth}
                        height={rectSize.height}
                        fill="black"
                    />
                )}
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default CenterSquare;