// ReceiverOval.jsx
import React from 'react';
import { Group, Ellipse, Text } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';
import EditableText from '../EditableText';
import useLines from '../../../hooks/useLines';

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
        startDrawing,
        setIsMouseDownOnAnchor,
        id,
        shapeRef,
        imageRef,
        stageRef,
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
        handleTextChange,
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

    var textAlignment = -5;
    if (text.length > 1) {
        textAlignment -= 5;
    }

    return (
        <>
            <Group
                draggable
                dragBoundFunc={dragBoundFunc}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
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
}

export default ReceiverOval;