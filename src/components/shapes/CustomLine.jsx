// CustomLine.jsx
//TODO: add anchor point functionality for the circle
//TODO: add bezier curve functionality
import React, { useState } from 'react';
import { Line, Circle, Group } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';

function CustomLine(props) {
    const { id, line, lines, onLineDelete } = props;

    //TODO move this state to the parent component and set false upon image/stage click
    const [isSelected, setIsSelected] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    const handleLineClick = () => {
        setIsSelected(!isSelected);
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

    return (
        <>
            <Group
                onContextMenu={handleRightClick}
            >
                <Line
                    points={[line.startPos.x, line.startPos.y, line.endPos.x, line.endPos.y]}
                    stroke={line.color}
                    strokeWidth={4}
                    tension={0.5}
                    lineCap="round"
                    onClick={handleLineClick}
                />
                {isSelected && (
                    <Circle
                        x={line.endPos.x}
                        y={line.endPos.y}
                        radius={10}
                        fill="grey"
                    />
                )}
                {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
            </Group>
        </>
    );
}

export default CustomLine;