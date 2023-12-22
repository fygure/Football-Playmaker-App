// ReceiverOval.jsx
import React from 'react';
import { Group, Ellipse, Text } from 'react-konva';
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

function ReceiverOval(props) {
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
        ellipseRadiuses,
        fontSize,
        text,
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID
    } = props;

    const anchorPoints = getAnchorPoints(ellipseRadiuses.x, ellipseRadiuses.y);
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

    var textAlignment = 5;
    if (text.length > 1) {
        textAlignment = 1;
    }

    return (
        <>
            <Group
                draggable
                dragBoundFunc={dragBoundFunc}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={handleOnClick}
                onContextMenu={handleRightClick}
                ref={shapeRef}
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
                    fill={initialColor}
                />
                <Text
                    text={text}
                    align="center"
                    x={-ellipseRadiuses.x / 2 + textAlignment}
                    y={-ellipseRadiuses.y / 2 + 1}
                    fill="black"
                    listening={false}
                    fontSize={fontSize}
                />
                {selectedShapeID === id && anchors}
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default ReceiverOval;