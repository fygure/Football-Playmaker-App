// CustomLine.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Line, Circle, Group } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';
import PerpendicularEnd from './lineEnds/PerpendicularEnd';
import DottedEnd from './lineEnds/DottedEnd';
import ArrowEnd from './lineEnds/ArrowEnd';
import calculateWaveLinePoints from './lineEnds/calculateWaveLinePoints';
import { v4 as uuidv4 } from 'uuid';

const CIRCLE_SIZES = {
    CONTROL: { MIN: 5, MAX: 5 },
    HALO: { MIN: 14, MAX: 14 },
    ANCHOR: { MIN: 8, MAX: 8 },
};

function CustomLine(props) {
    const {
        id,
        line,
        lines,
        color,
        colorButtonPressCount,
        strokeTypeButtonPressCount,
        strokeEndButtonPressCount,
        selectedColor,
        selectedLineStroke,
        selectedLineEnd,
        onLineDelete,
        onLineChange,
        setLines,
        startDrawing,
        setIsMouseDownOnAnchor,
        selectedLineID,
        setSelectedLineID,
        imageRef,
        stageRef
    } = props;
    const isSelected = selectedLineID === id;
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [controlPoint, setControlPoint] = useState({
        x: (line.controlPoint.x + line.controlPoint.x) / 2,
        y: (line.controlPoint.y + line.controlPoint.y) / 2,
    });
    const customLineRef = useRef();
    //Anchor sizes
    const [controlCircleRadius, setControlCircleRadius] = useState(CIRCLE_SIZES.CONTROL.MAX);
    const [haloCircleRadius, setHaloCircleRadius] = useState(CIRCLE_SIZES.HALO.MAX);
    const [anchorCircleRadius, setAnchorCircleRadius] = useState(CIRCLE_SIZES.ANCHOR.MAX);
    // Calculate the initial circle sizes relative to the image size
    useEffect(() => {
        const image = imageRef.current;
        const initialImagePosition = { x: image.x(), y: image.y() };
        const initialImageSize = { width: image.width(), height: image.height() };
        const initialRelativePosition = {
            x: (controlPoint.x - initialImagePosition.x) / initialImageSize.width,
            y: (controlPoint.y - initialImagePosition.y) / initialImageSize.height,
        };

        const initialControlCircleRadius = controlCircleRadius / initialImageSize.width;
        const initialHaloCircleRadius = haloCircleRadius / initialImageSize.width;
        const initialAnchorCircleRadius = anchorCircleRadius / initialImageSize.width;

        const handleResize = () => {
            const newImagePosition = { x: image.x(), y: image.y() };
            const newImageSize = { width: image.width(), height: image.height() };

            setControlPoint({
                x: initialRelativePosition.x * newImageSize.width + newImagePosition.x,
                y: initialRelativePosition.y * newImageSize.height + newImagePosition.y,
            });
            setControlCircleRadius(Math.min(CIRCLE_SIZES.CONTROL.MAX, Math.max(CIRCLE_SIZES.CONTROL.MIN, initialControlCircleRadius * newImageSize.width)));
            setHaloCircleRadius(Math.min(CIRCLE_SIZES.HALO.MAX, Math.max(CIRCLE_SIZES.HALO.MIN, initialHaloCircleRadius * newImageSize.width)));
            setAnchorCircleRadius(Math.min(CIRCLE_SIZES.ANCHOR.MAX, Math.max(CIRCLE_SIZES.ANCHOR.MIN, initialAnchorCircleRadius * newImageSize.width)));
        };


        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [imageRef, controlPoint, controlCircleRadius, haloCircleRadius, anchorCircleRadius]);

    //Rerenders lines based on button inputs
    useEffect(() => {
        console.log(selectedColor, selectedLineStroke, selectedLineEnd)
        if (isSelected) {
            onLineChange(id, {
                color: selectedColor,
                strokeType: selectedLineStroke,
                strokeEnd: selectedLineEnd,
            });
        }
    }, [selectedColor, selectedLineStroke, selectedLineEnd, colorButtonPressCount, strokeTypeButtonPressCount, strokeEndButtonPressCount]);

    const handleLineClick = () => {
        console.log(selectedLineStroke);
        setSelectedLineID(isSelected ? '$' : id);
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

        // Find any lines that have a `drawnFromId` that matches the current line's ID
        const connectedLines = updatedLines.filter(line =>
            line.drawnFromId === id
        );

        // Update the start position of the connected lines
        const finalLines = updatedLines.map(line =>
            connectedLines.find(connectedLine => connectedLine.id === line.id)
                ? { ...line, startPos: newEndPos }
                : line
        );

        setLines(finalLines);

        // Update the position of the larger circle
        const largerCircle = customLineRef.current.findOne('.larger-circle');
        if (largerCircle) {
            largerCircle.position(newEndPos);
        }

        // connected lines immediately
        connectedLines.forEach(line => {
            const lineNode = customLineRef.current.findOne(`.line-${line.id}`);
            if (lineNode) {
                lineNode.points([newEndPos.x, newEndPos.y, line.controlPoint.x, line.controlPoint.y, line.endPos.x, line.endPos.y]);
            }
        });
    };

    const handleControlPointDragMove = (e) => {
        const newControlPoint = e.target.position();
        setControlPoint(newControlPoint);

        // Update the line's points to create a quadratic curve
        const newPoints = [line.startPos.x, line.startPos.y, newControlPoint.x, newControlPoint.y, line.endPos.x, line.endPos.y];
        const updatedLines = lines.map(l =>
            l.id === id ? { ...l, points: newPoints } : l
        );
        onLineChange(id, { controlPoint: newControlPoint });
        setLines(updatedLines);
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

    let waveLinePoints = calculateWaveLinePoints(line, controlPoint);
    return (
        <>
            <Group
                onContextMenu={handleRightClick}
                ref={customLineRef}
                onClick={() => { console.log(selectedColor, selectedLineStroke, selectedLineEnd); }}
            >
                {/* Transparent Line */}
                <Line
                    points={selectedLineStroke === 'squiggle' ? waveLinePoints : [line.startPos.x, line.startPos.y, controlPoint.x, controlPoint.y, line.endPos.x, line.endPos.y]}
                    stroke="transparent"
                    strokeWidth={30} // This is the click box size
                    tension={0.3}
                    lineCap="round"
                    onClick={handleLineClick}
                />
                {/* Real Line */}
                <Line
                    points={
                        (isSelected && line.strokeType === 'squiggle')
                            ? waveLinePoints
                            : (line.strokeType === 'squiggle')
                                ? waveLinePoints
                                : [line.startPos.x, line.startPos.y, controlPoint.x, controlPoint.y, line.endPos.x, line.endPos.y]
                    }
                    stroke={line.color}
                    strokeWidth={2.5}
                    tension={0.3} //Determines curvature intensity
                    lineCap="round"
                    name={`line-${line.id}`}
                    onClick={handleLineClick}
                    dash={isSelected && line.strokeType === 'dashed' ? [10, 10] : isSelected && line.strokeType === 'dotted' ? [1, 7] : line.strokeType === 'dashed' ? [10, 10] : line.strokeType === 'dotted' ? [1, 7] : [0, 0]}
                />
                {/* Arrow Line End */}
                {line.strokeEnd === 'arrow' && (
                    <ArrowEnd line={line} controlPoint={controlPoint} color={line.color} />
                )}
                {/* Perpendicular Line End */}
                {line.strokeEnd === 'perpendicular' && (
                    <PerpendicularEnd line={line} controlPoint={controlPoint} color={line.color} />
                )}
                {/* Dotted Line End */}
                {line.strokeEnd === 'dotted' && (
                    <DottedEnd line={line} color={line.color} />
                )}
                {/* Line end anchor */}
                {isSelected && (
                    <Group>
                        {/* Control point */}
                        <Circle
                            x={controlPoint.x}
                            y={controlPoint.y}
                            radius={controlCircleRadius}
                            fill="darkgrey"
                            stroke="black"
                            strokeWidth={2}
                            draggable
                            onDragMove={handleControlPointDragMove}
                        />
                        {/* Halo */}
                        <Circle
                            x={line.endPos.x}
                            y={line.endPos.y}
                            radius={haloCircleRadius}
                            stroke="black"
                            strokeWidth={2}
                            name="larger-circle"
                            fill="grey"
                            onMouseDown={(e) => {
                                const startPos = e.target.getStage().getPointerPosition();

                                startDrawing(startPos, '$', customLineRef.current, id);
                                setIsMouseDownOnAnchor(true);
                                e.target.moveToTop();
                                e.cancelBubble = true;

                                // Move the smaller circle to the top
                                const smallerCircle = customLineRef.current.findOne('.smaller-circle');
                                if (smallerCircle) {
                                    smallerCircle.moveToTop();
                                }
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
                        {/* Anchor */}
                        <Circle
                            x={line.endPos.x}
                            y={line.endPos.y}
                            radius={anchorCircleRadius}
                            fill="darkgrey"
                            stroke={"black"}
                            strokeWidth={0.5}
                            onDragMove={handleAnchorDragMove}
                            draggable
                            dragBoundFunc={dragBoundFunc}
                            name="smaller-circle"
                        />
                    </Group>
                )}
                {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
            </Group>
        </>
    );
}

export default CustomLine;