// CenterSquare.jsx
import React, { useState } from 'react';
import { Rect, Group } from 'react-konva';
import ContextMenu from '../../menus/ContextMenu';

const CenterSquare = (props) => {
    const {
        id,
        startDrawing,
        setIsMouseDownOnAnchor,
        shapeRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
        handleRightClick,
        handleDeleteClick,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        handleHideContextMenu,
        rectSize,
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID,
    } = props;

    const isSelected = selectedShapeID === id;
    const strokeOptions = { color: 'black', strokeWidth: 1 };
    const centerLineWidth = 3.5;
    const haloOffset = 13;

    const states = [
        { leftState: 0, rightState: 100, colorOne: initialColor, colorTwo: "black" }, // fully initialColor
        { leftState: 0, rightState: rectSize.width / 2, colorOne: "black", colorTwo: initialColor }, // right fill
        { leftState: 0, rightState: rectSize.width / 2, colorOne: initialColor, colorTwo: "black" }, // left fill
        { leftState: -1, rightState: 0, colorOne: initialColor, colorTwo: "white" } // all fill
    ];

    const [stateIndex, setStateIndex] = useState(0);
    const [state, setState] = useState(states[stateIndex]);

    const handleCenterClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState(states[newIndex]);
        setSelectedShapeID(id);
        console.log('Selected Shape ID:', id);
    };

    return (
        <>
            <Group
                ref={shapeRef}
                x={position.x}
                y={position.y}
                onContextMenu={handleRightClick}
                draggable={true}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                dragBoundFunc={dragBoundFunc}
            >
                {isSelected && (
                    <Rect
                        width={rectSize.width + haloOffset}
                        height={rectSize.height + haloOffset}
                        //stroke={strokeOptions.color}
                        fill='white'
                        strokeWidth={2}
                        cornerRadius={2}
                        shadowBlur={15}
                        shadowColor='#184267'
                        offsetX={(rectSize.width + haloOffset) / 2}
                        offsetY={(rectSize.height + haloOffset) / 2}
                        onMouseDown={(e) => {
                            const startPos = e.target.getStage().getPointerPosition();
                            console.log('Shape Halo onMouseDown', startPos);
                            startDrawing(startPos, id, null, position);
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
                    stroke={strokeOptions.color}
                    strokeWidth={strokeOptions.strokeWidth}
                    cornerRadius={2}
                    offsetX={rectSize.width / 2}
                    offsetY={rectSize.height / 2}
                    onClick={handleCenterClick}
                    fillLinearGradientStartPoint={{ x: state.leftState, y: 0 }}
                    fillLinearGradientEndPoint={{ x: state.rightState, y: 0 }}
                    fillLinearGradientColorStops={[1, state.colorOne, 1, state.colorTwo]}
                />
                {stateIndex === 3 && (
                    <Rect
                        x={-1.6}
                        y={-rectSize.height / 2}
                        onClick={handleCenterClick}
                        width={centerLineWidth}
                        height={rectSize.height}
                        fill="black"
                    />
                )}
            </Group>
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}

export default CenterSquare;