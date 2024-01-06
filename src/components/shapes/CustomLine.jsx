// CustomLine.jsx
//TODO: add anchor point functionality for the circle
//TODO: add bezier curve functionality
import React, { useState, useRef } from 'react';
import { Line, Circle, Group } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';

function CustomLine(props) {
    const { id, line, lines, onLineDelete, setLines, startDrawing, setIsMouseDownOnAnchor, selectedLineID, setSelectedLineID } = props;
    const isSelected = selectedLineID === id;
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const customLineRef = useRef();

    const handleLineClick = () => {
        setSelectedLineID(isSelected ? null : id);
    };

    const handleRightClick = (e) => {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        const mousePos = stage.getPointerPosition();
        setContextMenuPosition({ x: mousePos.x - 20, y: mousePos.y - 15 });
        setShowContextMenu(true);
    };

    const handleHideContextMenu = () => {
        setShowContextMenu(false);
    }

    const handleDeleteClick = () => {
        setShowContextMenu(false);
        onLineDelete(id);
    };

    const handleAnchorDragMove = (e) => {
        const newEndPos = e.target.position();

        // Update the end position of the currently dragged line
        const updatedLines = lines.map(line =>
            line.id === id ? { ...line, endPos: newEndPos } : line
        );

        // Find any lines that have a `drawnFromRef` that matches the current line's reference
        const connectedLines = updatedLines.filter(line =>
            line.drawnFromRef === customLineRef.current
        );

        // Update the start position of the connected lines
        const finalLines = updatedLines.map(line =>
            connectedLines.find(connectedLine => connectedLine.id === line.id)
                ? { ...line, startPos: newEndPos }
                : line
        );

        setLines(finalLines);
    };

    const dragBoundFunc = (pos) => {
        const stage = customLineRef.current.getStage();
        const { width: stageWidth, height: stageHeight } = stage.size();

        let x = pos.x;
        let y = pos.y;

        if (x < 0) {
            x = 0;
        } else if (x > stageWidth) {
            x = stageWidth;
        }

        if (y < 0) {
            y = 0;
        } else if (y > stageHeight) {
            y = stageHeight;
        }

        return {
            x,
            y
        };
    };

    return (
        <>
            <Group
                onContextMenu={handleRightClick}
                ref={customLineRef}
            >
                <Line
                    points={[line.startPos.x, line.startPos.y, line.endPos.x, line.endPos.y]}
                    stroke={line.color}
                    strokeWidth={4}
                    tension={0.5}
                    lineCap="round"
                    onClick={handleLineClick}
                />
                {/* Line end anchor */}
                {isSelected && (
                    <Group
                    >
                        {/* Halo */}
                        <Circle
                            x={line.endPos.x}
                            y={line.endPos.y}
                            radius={14}
                            stroke="black"
                            strokeWidth={0.5}
                            fill="grey"
                            onMouseDown={(e) => {
                                const startPos = e.target.getStage().getPointerPosition();
                                //need function to handle drawing from an anchor here
                                startDrawing(startPos, '$', customLineRef.current);
                                setIsMouseDownOnAnchor(true);
                                e.cancelBubble = true;
                            }}
                            onClick={(e) => {
                                console.log(customLineRef.current);
                                console.log(customLineRef.current.children[0].points());
                            }}
                        />
                        <Circle
                            x={line.endPos.x}
                            y={line.endPos.y}
                            radius={8}
                            fill="lightgrey"
                            stroke={"black"}
                            strokeWidth={0.5}
                            onDragMove={handleAnchorDragMove}
                            draggable
                            dragBoundFunc={dragBoundFunc}
                        />
                    </Group>
                )}
                {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
            </Group>
        </>
    );
}

export default CustomLine;