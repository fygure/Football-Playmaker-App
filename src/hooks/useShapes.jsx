// useShapes.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useShapes(stageDimensions, imageRef) {
    const [shapes, setShapes] = useState([]);

    //Shape Handlers
    //TODO: Add more formations as 'shapeType', fine tune the initialPositions
    const addShape = (shapeType, initialColor) => {
        const middlePosition = {
            x: imageRef.current.x() + (imageRef.current.width() / 2),
            y: imageRef.current.height() / 2
        };
        console.log("Image Middle:", middlePosition);
        //console.log(backgroundImage);
        if (shapeType === 'offense2x2') {
            const newShapes = [
                { id: uuidv4(), shapeType: 'QBoval', initialPosition: { x: middlePosition.x, y: middlePosition.y + stageDimensions.height * 0.1 }, initialColor },
                { id: uuidv4(), shapeType: 'RBoval', initialPosition: { x: middlePosition.x, y: middlePosition.y + stageDimensions.height * 0.1 }, initialColor },
                { id: uuidv4(), shapeType: 'Xoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Hoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Yoval', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Zoval', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.1, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.04, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.02, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.02, y: middlePosition.y }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.04, y: middlePosition.y }, initialColor },

            ];
            setShapes([...shapes, ...newShapes]);
        }
        else {
            const newShape = { id: uuidv4(), shapeType, initialPosition: middlePosition, initialColor };
            setShapes([...shapes, newShape]);
        }
    };

    const updateShape = (id, newAttributes) => {
        setShapes(shapes.map(shape => shape.id === id ? { ...shape, ...newAttributes } : shape));
    };

    const deleteShape = (id) => {
        setShapes(shapes.filter(shape => shape.id !== id));
    }

    const deleteAllShapes = () => {
        setShapes([]);
    };


    const hideShapeContextMenu = () => {
        setShapes(shapes.map(shape => ({ ...shape, showContextMenu: false })));
    };

    return { shapes, addShape, updateShape, deleteShape, deleteAllShapes, hideShapeContextMenu };
}
export default useShapes;