// useLines.jsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useLines = (imageRef, stageRef) => {
    const [startPos, setStartPos] = useState(null);
    const [endPos, setEndPos] = useState(null);
    const [lines, setLines] = useState([]);
    const [attachedShapeId, setAttachedShapeId] = useState('$');
    const [drawnFromRef, setDrawnFromRef] = useState('$');

    //if shapeId remains '$', then line is attached from another line
    const startDrawing = (pos, shapeId, shapeRef) => {
        setStartPos(pos);
        setAttachedShapeId(shapeId);
        setDrawnFromRef(shapeRef);
    };


    const draw = (pos) => {
        if (startPos) {
            setEndPos(pos);
        }
    };

    const stopDrawing = () => {
        if (startPos && endPos) {
            //console.log(drawnFromRef);
            let snapPos;
            if (drawnFromRef.attrs.x !== undefined && drawnFromRef.attrs.y !== undefined) {
                snapPos = { x: drawnFromRef.attrs.x, y: drawnFromRef.attrs.y };
            } else {
                //console.log(drawnFromRef.children.slice(-1)[0].children.slice(1)[0].attrs.x);
                snapPos = { x: drawnFromRef.children.slice(-1)[0].children.slice(-1)[0].attrs.x, y: drawnFromRef.children.slice(-1)[0].children.slice(-1)[0].attrs.y };
            }
            //console.log(startPos);
            //const snapPos = { drawnFromRef.attrs.x, drawnFromRef.attrs.y };
            const newLine = {
                startPos: snapPos,
                endPos,
                "attachedShapeId": attachedShapeId,
                "drawnFromRef": drawnFromRef,
                id: uuidv4(),
                color: 'black',
            };
            setLines(prevLines => [...prevLines, newLine]);
            setStartPos(null);
            setEndPos(null);
            setAttachedShapeId('$');
            setDrawnFromRef('$');
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
        updateLine,
    };
};

export default useLines;