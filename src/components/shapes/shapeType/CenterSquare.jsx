// CenterSquare.jsx
// TODO: Here is where we change the on click handler for click through
import React from 'react';
import { Rect } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

function CenterSquare(props) {
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
        //fontSize,
        rectSize
    } = props;

    //hardcoded value
    // const squareSize = { width: 25, height: 25 };
    const strokeOptions = { color: 'black', strokeWidth: 2 };

    return (
        <>
            <Rect
                ref={shapeRef}
                x={position.x}
                y={position.y}
                width={rectSize.width}
                height={rectSize.height}
                fill={initialColor}
                stroke={strokeOptions.color}
                strokeWidth={strokeOptions.strokeWidth}
                onDragStart={handleDragStart}
                draggable={true}
                onDragEnd={handleDragEnd}
                onClick={handleOnClick}
                onContextMenu={handleRightClick}
            />
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />/*This is where we need to add "onMouseLeave" event*/}
        </>
    );
}
export default CenterSquare;