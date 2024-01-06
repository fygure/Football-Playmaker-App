// CustomLine.jsx
//TODO: add anchor point functionality for the circle
//TODO: add bezier curve functionality
import React, { useState, useRef } from 'react';
import { Line, Circle, Group } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';

function CustomLine(props) {
    const { id, line, lines, onLineDelete, setLines, isLineSelected, setIsLineSelected } = props;

    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const lineRef = useRef();

    const handleLineClick = () => {
        setIsLineSelected(!isLineSelected);
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
        setLines(lines.map(line => line.id === id ? { ...line, endPos: newEndPos } : line));
    };

    const dragBoundFunc = (pos) => {
        const stage = lineRef.current.getStage();
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
                ref={lineRef}
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
                {isLineSelected && (
                    <Group
                    >
                        {/* Halo */}
                        <Circle
                            x={line.endPos.x}
                            y={line.endPos.y}
                            radius={12}
                            stroke="lightgrey"
                            strokeWidth={4}
                            fill="lightgrey"
                        />
                        <Circle
                            x={line.endPos.x}
                            y={line.endPos.y}
                            radius={6}
                            fill="grey"
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