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
                { id: uuidv4(), shapeType: 'QBoval', initialPosition: { x: middlePosition.x, y: middlePosition.y + stageDimensions.height * 0.3 }, initialColor },
                { id: uuidv4(), shapeType: 'RBoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.042, y: middlePosition.y + stageDimensions.height * 0.33 }, initialColor },
                { id: uuidv4(), shapeType: 'Xoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.21, y: middlePosition.y + stageDimensions.height * 0.2 }, initialColor },
                { id: uuidv4(), shapeType: 'Hoval', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.14, y: middlePosition.y + stageDimensions.height * 0.24 }, initialColor },
                { id: uuidv4(), shapeType: 'Yoval', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.15, y: middlePosition.y + stageDimensions.height * 0.2 }, initialColor },
                { id: uuidv4(), shapeType: 'Zoval', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.21, y: middlePosition.y + stageDimensions.height * 0.24 }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.08, y: middlePosition.y + stageDimensions.height * 0.2 }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x + stageDimensions.width * 0.04, y: middlePosition.y + stageDimensions.height * 0.2 }, initialColor },
                { id: uuidv4(), shapeType: 'Center', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.01, y: middlePosition.y + stageDimensions.height * 0.185 }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.04, y: middlePosition.y + stageDimensions.height * 0.2 }, initialColor },
                { id: uuidv4(), shapeType: 'Lineman', initialPosition: { x: middlePosition.x - stageDimensions.width * 0.08, y: middlePosition.y + stageDimensions.height * 0.2 }, initialColor },

            ];
            //Adds new shapes to shapes list
            setShapes([...shapes, ...newShapes]);
        }
        else if (shapeType === 'offenseBunch') {

        }
        else if (shapeType === 'offenseBunch') {

        }
        else if (shapeType === 'offense3x1') {

        }
        else if (shapeType === 'offense3x1') {

        }
        else if (shapeType === 'offenseEmpty') {

        }
        //DEFENSE FORMATION:
        else if (shapeType === 'defense4-3') {
        }
        else if (shapeType === 'defense3-4') {
        }
        else if (shapeType === 'defense4-2-5') {
        }
        else if (shapeType === 'defense3-3Stack') {
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
    };

    const deleteAllShapes = () => {
        setShapes([]);
    };

    const hideShapeContextMenu = () => {
        setShapes(shapes.map(shape => ({ ...shape, showContextMenu: false })));
    };

    return { shapes, addShape, updateShape, deleteShape, deleteAllShapes, hideShapeContextMenu };
}
export default useShapes;