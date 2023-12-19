// CenterSquare.jsx
import React, { useState } from 'react';
import { Rect } from 'react-konva';
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
        rectSize
    } = props;

    const strokeOptions = { color: 'black', strokeWidth: 2 };

    const states = [
        { leftState: 0, rightState: 100, colorOne: initialColor, colorTwo: "black" }, // fully orange
        { leftState: 0, rightState: 15, colorOne: "black", colorTwo: initialColor }, // right fill
        { leftState: 0, rightState: 15, colorOne: initialColor, colorTwo: "black" }, // left fill
        { leftState: -1, rightState: 0, colorOne: initialColor, colorTwo: "black" } // all fill
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
            <Rect
                ref={shapeRef}
                x={position.x}
                y={position.y}
                width={rectSize.width}
                height={rectSize.height}
                stroke={strokeOptions.color}
                strokeWidth={strokeOptions.strokeWidth}
                onDragStart={handleDragStart}
                draggable={true}
                onDragEnd={handleDragEnd}
                onClick={handleClick}
                onContextMenu={handleRightClick}
                fillLinearGradientStartPoint={{ x: state.leftState, y: 0 }}
                fillLinearGradientEndPoint={{ x: state.rightState, y: 0 }}
                fillLinearGradientColorStops={[1, state.colorOne, 1, state.colorTwo]}
            />
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default CenterSquare;