// ReceiverOval.jsx
import React from 'react';
import { Group, Ellipse, Text } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';
import { Anchor } from '../Anchor';
import EditableText from '../EditableText';

// const getAnchorPoints = (ellipseRadiusX, ellipseRadiusY) => {
//     return [
//         { x: 0, y: -ellipseRadiusY - 5 },
//         { x: ellipseRadiusX + 5, y: 0 },
//         { x: 0, y: ellipseRadiusY + 5 },
//         { x: -ellipseRadiusX - 5, y: 0 },
//     ];
// }

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

    // UNUSED
    // const anchorPoints = getAnchorPoints(ellipseRadiuses.x, ellipseRadiuses.y);
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
    const strokeOptions = { color: 'black', strokeWidth: 1 };
    const haloRadiuses = { x: ellipseRadiuses.x + 8, y: ellipseRadiuses.y + 8 };

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
                {isSelected && (
                    <Ellipse
                        x={0}
                        y={0}
                        fill="grey"
                        radiusX={haloRadiuses.x}
                        radiusY={haloRadiuses.y}
                        stroke={'black'}
                        strokeWidth={2}
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

            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default ReceiverOval;