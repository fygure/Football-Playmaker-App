// LinemanOval.jsx
import React, { useState } from 'react';
import { Ellipse } from 'react-konva';
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
        { leftState: 0, rightState: 200 }, // fully initialColor
        { leftState: 0, rightState: -1 }, // right fill
        { leftState: 0, rightState: 1 }, // left fill
        { leftState: -200, rightState: 1 } // all fill
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
            <Ellipse
                ref={shapeRef}
                x={position.x}
                y={position.y}
                radiusX={ellipseRadiuses.x}
                radiusY={ellipseRadiuses.y}
                stroke={strokeOptions.color}
                strokeWidth={strokeOptions.strokeWidth}
                onDragStart={handleDragStart}
                draggable
                onDragEnd={handleDragEnd}
                onClick={handleClick}
                onContextMenu={handleRightClick}
                fillLinearGradientStartPoint={{ x: state.leftState, y: 0 }}
                fillLinearGradientEndPoint={{ x: state.rightState, y: 0 }}
                fillLinearGradientColorStops={[0, initialColor, 1, 'black']}
            />
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default LinemanOval;