// LinemanOval.jsx
// TODO: Here is where we change the on click handler for click through
import React from 'react';
import { Ellipse } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

function LinemanOval(props) {
    const {
        shapeRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
        //isSelected,
        handleOnClick,
        handleRightClick,
        handleDeleteClick,
        handleDragStart,
        handleDragEnd,
        handleHideContextMenu,
        ellipseRadiuses,
        //fontSize,
    } = props;

    //hardcoded value
    //const ellipseRadiuses = { x: 16, y: 12 };
    const strokeOptions = { color: 'black', strokeWidth: 2 };

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
}
export default LinemanOval;