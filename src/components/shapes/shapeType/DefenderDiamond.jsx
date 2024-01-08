//DefenderDiamond.jsx
import React, { useState, useEffect } from 'react';
import { Rect, Group } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';
import EditableText from '../EditableText';

// const offset = 1.7;

// const getAnchorPoints = (width, height) => {
//     const halfWidth = width / 2;
//     const halfHeight = height / 2;
//     return [
//         { x: 0, y: -halfHeight * offset }, // top point
//         { x: halfWidth * offset, y: 0 }, // right point
//         { x: 0, y: halfHeight * offset }, // bottom point
//         { x: -halfWidth * offset, y: 0 }, // left point
//     ];
// }

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

    // const [anchorPoints, setAnchorPoints] = useState(getAnchorPoints(rectSize.width, rectSize.height));

    // useEffect(() => {
    //     setAnchorPoints(getAnchorPoints(rectSize.width, rectSize.height));
    // }, [rectSize]);

    // const anchors = anchorPoints.map((point, index) => (
    //     <Anchor
    //         key={`anchor-${index}`}
    //         x={point.x}
    //         y={point.y}
    //         onMouseDown={(e) => {
    //             const startPos = e.target.getStage().getPointerPosition();
    //             console.log('Anchor onMouseDown', startPos);
    //             startDrawing(startPos, id, shapeRef.current);
    //             setIsMouseDownOnAnchor(true);
    //             e.cancelBubble = true;
    //         }}
    //     />
    // ));

    const isSelected = selectedShapeID === id;
    const haloOffset = 12;
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
                {isSelected && (
                    <Rect
                        width={rectSize.width + haloOffset}
                        height={rectSize.height + haloOffset}
                        rotation={45}
                        stroke={strokeOptions.color}
                        strokeWidth={2}
                        cornerRadius={2}
                        fill='grey'
                        offsetX={(rectSize.width + haloOffset) / 2}
                        offsetY={(rectSize.height + haloOffset) / 2}
                        onMouseDown={(e) => {
                            const startPos = e.target.getStage().getPointerPosition();
                            console.log('Shape Halo onMouseDown', startPos);
                            startDrawing(startPos, id, shapeRef.current);
                            setIsMouseDownOnAnchor(true);
                            e.cancelBubble = true;
                        }}
                        onMouseEnter={(e) => {
                            const container = e.target.getStage().container();
                            //To style it, import custom image
                            //container.style.cursor = 'url(/path/to/your/cursor/image.png) 16 16, crosshair';
                            container.style.cursor = 'crosshair';
                        }}
                        onMouseLeave={(e) => {
                            const container = e.target.getStage().container();
                            container.style.cursor = 'default';
                        }}
                    />
                )}
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
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
};

export default DefenderDiamond;