// useLines.jsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useLines = (imageRef, setSelectedLineID, selectedLineID) => {
    const [startPos, setStartPos] = useState(null);
    const [endPos, setEndPos] = useState(null);
    const [lines, setLines] = useState([]);
    const [attachedShapeId, setAttachedShapeId] = useState('$');
    const [drawnFromId, setDrawnFromId] = useState('$');
    const [shapePos, setShapePos] = useState(null);

    //if shapeId remains '$', then line is attached from another line
    const startDrawing = (pos, shapeId, id, shapePosition) => {
        if (shapePosition) {
            setShapePos(shapePosition);
        }
        if (!id) {
            console.log('Drawn From Shape ID:', shapeId);
            setDrawnFromId(shapeId);
        } else {
            console.log('Drawn From line ID:', id);
            setDrawnFromId(id);
        }
        setStartPos(pos);
        setAttachedShapeId(shapeId);
    };


    const draw = (pos) => {
        if (startPos) {
            setEndPos(pos);
        }
    };

    const stopDrawing = () => {
        if (startPos && endPos) {
            let snapPos;

            if (drawnFromId === attachedShapeId) {
                // drawnFromId is a shape ID
                snapPos = shapePos;
            } else {
                // drawnFromId is a line ID
                const drawnFromLine = lines.find(line => line.id === drawnFromId);
                if (drawnFromLine) {
                    snapPos = drawnFromLine.endPos;
                } else {
                    console.error(`Line with ID ${drawnFromId} not found`);
                    return;
                }
            }

            const newLine = {
                startPos: snapPos,
                endPos,
                "attachedShapeId": attachedShapeId,
                "drawnFromId": drawnFromId,
                id: uuidv4(),
                color: 'black',
                strokeType: 'straight',
                strokeEnd: 'straight',
                controlPoint: {
                    x: (snapPos.x + endPos.x) / 2,
                    y: (snapPos.y + endPos.y) / 2,
                },
            };
            setLines(prevLines => [...prevLines, newLine]);
            setStartPos(null);
            setEndPos(null);
            setAttachedShapeId('$');
            setDrawnFromId('$');
            setSelectedLineID(newLine.id);
        }
    };

    const updateLine = (id, newAttributes) => {
        setLines(lines.map(line => line.id === id ? { ...line, ...newAttributes } : line));
    };

    const deleteAllLines = () => {
        setLines([]);
    };

    const deleteLine = (lineId) => {
        setLines(prevLines => prevLines.filter(line => line.id !== lineId));
    };

    //handle resizing
    useEffect(() => {
        if (imageRef.current) {
            const image = imageRef.current;
            let initialImagePosition = { x: image.x(), y: image.y() };
            let initialImageSize = { width: image.width(), height: image.height() };

            let initialRelativeLines = lines.map(line => {
                let initialRelativeStartPos = {
                    x: (line.startPos.x - initialImagePosition.x) / initialImageSize.width,
                    y: (line.startPos.y - initialImagePosition.y) / initialImageSize.height,
                };
                let initialRelativeEndPos = {
                    x: (line.endPos.x - initialImagePosition.x) / initialImageSize.width,
                    y: (line.endPos.y - initialImagePosition.y) / initialImageSize.height,
                };
                let initialRelativeControlPoint = {
                    x: (line.controlPoint.x - initialImagePosition.x) / initialImageSize.width,
                    y: (line.controlPoint.y - initialImagePosition.y) / initialImageSize.height,
                };
                return { ...line, startPos: initialRelativeStartPos, endPos: initialRelativeEndPos, controlPoint: initialRelativeControlPoint };
            });

            const handleResize = () => {
                if (imageRef.current) {
                    const newImagePosition = { x: image.x(), y: image.y() };
                    const newImageSize = { width: image.width(), height: image.height() };

                    const newLines = initialRelativeLines.map(line => {
                        const newStartPos = {
                            x: line.startPos.x * newImageSize.width + newImagePosition.x,
                            y: line.startPos.y * newImageSize.height + newImagePosition.y,
                        };
                        const newEndPos = {
                            x: line.endPos.x * newImageSize.width + newImagePosition.x,
                            y: line.endPos.y * newImageSize.height + newImagePosition.y,
                        };
                        const newControlPoint = {
                            x: line.controlPoint.x * newImageSize.width + newImagePosition.x,
                            y: line.controlPoint.y * newImageSize.height + newImagePosition.y,
                        };
                        return { ...line, startPos: newStartPos, endPos: newEndPos, controlPoint: newControlPoint };
                    });

                    setLines(newLines);
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [lines, imageRef]);

    return {
        lines,
        startPos,
        endPos,
        startDrawing,
        draw,
        stopDrawing,
        deleteAllLines,
        setLines,
        deleteLine,
        updateLine,
    };
};

export default useLines;