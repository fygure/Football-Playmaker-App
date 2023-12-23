//DefenderDiamond.jsx
import React, { useState } from 'react';
import { Rect, Group } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';
import EditableText from '../EditableText';

const getAnchorPoints = (width, height) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    return [
        { x: halfWidth - 14, y: -25 }, // top point
        { x: width - 3, y: halfHeight - 14.5 }, // right point
        { x: halfWidth - 14, y: height - 3 }, // bottom point
        { x: -25, y: halfHeight - 14.5 }, // left point
    ];
}

const DefenderDiamond = (props) => {
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
        fontSize,
        handleTextChange,
        rectSize,
        text,
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
    var textAlignment = -5;
    if (text.length > 1) {
        textAlignment -= 5;
    }


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
                onClick={handleOnClick}
            >
                <Rect
                    width={rectSize.width}
                    height={rectSize.height}
                    rotation={45}
                    stroke={strokeOptions.color}
                    offsetX={rectSize.width / 2}
                    offsetY={rectSize.height / 2}
                    strokeWidth={strokeOptions.strokeWidth}
                    cornerRadius={2}
                    onContextMenu={handleRightClick}
                />
                <EditableText
                    initialText={text}
                    x={textAlignment}
                    y={-6}
                    fontSize={fontSize}
                    handleTextChange={handleTextChange}
                />
                {selectedShapeID === id && anchors}
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
};

export default DefenderDiamond;