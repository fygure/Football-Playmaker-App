// Center.jsx
import React from 'react';
import { Rect } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

function Center(props) {
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
    } = props;

    const squareSize = { width: 25, height: 25 };
    const strokeOptions = { color: 'black', strokeWidth: 2 };

    return (
        <>
            <Rect
                ref={shapeRef}
                x={position.x}
                y={position.y}
                width={squareSize.width}
                height={squareSize.height}
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
export default Center;