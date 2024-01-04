// useLines.jsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useLines = (imageRef, stageRef) => {
    const [startPos, setStartPos] = useState(null);
    const [endPos, setEndPos] = useState(null);
    const [lines, setLines] = useState([]);
    const [attachedShapeId, setAttachedShapeId] = useState(null);
    const [attachedShapeRef, setAttachedShapeRef] = useState(null);

    const startDrawing = (pos, shapeId, shapeRef) => {
        setStartPos(pos);
        setAttachedShapeId(shapeId);
        setAttachedShapeRef(shapeRef);
    };

    const draw = (pos) => {
        if (startPos) {
            setEndPos(pos);
        }
    };

    const stopDrawing = () => {
        if (startPos && endPos) {
            const newLine = {
                startPos,
                endPos,
                "attachedShapeId": attachedShapeId,
                "attachedShapeRef": attachedShapeRef,
                id: uuidv4(),
                color: 'black',
            };
            setLines(prevLines => [...prevLines, newLine]);
            setStartPos(null);
            setEndPos(null);
            setAttachedShapeId(null);
            setAttachedShapeRef(null);
        }
    };

    const deleteAllLines = () => {
        setLines([]);
    };

    const deleteLine = (lineId) => {
        setLines(prevLines => prevLines.filter(line => line.id !== lineId));
    };

    //handle resizing
    useEffect(() => {
        const image = imageRef.current;
        const initialImagePosition = { x: image.x(), y: image.y() };
        const initialImageSize = { width: image.width(), height: image.height() };

        const initialRelativeLines = lines.map(line => {
            const initialRelativeStartPos = {
                x: (line.startPos.x - initialImagePosition.x) / initialImageSize.width,
                y: (line.startPos.y - initialImagePosition.y) / initialImageSize.height,
            };
            const initialRelativeEndPos = {
                x: (line.endPos.x - initialImagePosition.x) / initialImageSize.width,
                y: (line.endPos.y - initialImagePosition.y) / initialImageSize.height,
            };
            return { ...line, startPos: initialRelativeStartPos, endPos: initialRelativeEndPos };
        });

        const handleResize = () => {
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
                return { ...line, startPos: newStartPos, endPos: newEndPos };
            });

            setLines(newLines);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
    };
};

export default useLines;