//DefenderDiamond.jsx
//TODO: line functionality like ReceiverOval
import React, { useState, useEffect } from 'react';
import { Rect, Group } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';
import EditableText from '../EditableText';

const offset = 1.7;

const getAnchorPoints = (width, height) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    return [
        { x: 0, y: -halfHeight * offset }, // top point
        { x: halfWidth * offset, y: 0 }, // right point
        { x: 0, y: halfHeight * offset }, // bottom point
        { x: -halfWidth * offset, y: 0 }, // left point
    ];
}

const DefenderDiamond = (props) => {
    const {
        id,
        startDrawing,
        setIsMouseDownOnAnchor,
        shapeRef,
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
        handleHideContextMenu,
        fontSize,
        handleTextChange,
        rectSize,
        text,
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID,
    } = props;

    const [anchorPoints, setAnchorPoints] = useState(getAnchorPoints(rectSize.width, rectSize.height));

    useEffect(() => {
        setAnchorPoints(getAnchorPoints(rectSize.width, rectSize.height));
    }, [rectSize]);

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

    const strokeOptions = { color: 'black', strokeWidth: .2 };
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
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                dragBoundFunc={dragBoundFunc}
                onClick={handleOnClick}
                onContextMenu={handleRightClick}
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
};

export default DefenderDiamond;