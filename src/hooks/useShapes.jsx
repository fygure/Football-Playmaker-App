// useShapes.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useShapes(stageDimensions, imageRef) {
    const [shapes, setShapes] = useState([]);

    //Shape Handlers
    const addFormation = (formationType, initialColor) => {
        const middlePosition = {
            x: imageRef.current.x() + (imageRef.current.width() / 2),
            y: imageRef.current.height() / 2
        };

        const imageSize = {
            width: imageRef.current.width(),
            height: imageRef.current.height()
        };

        //OFFENSE FORMATIONS:
        if (formationType === 'offense2x2') {
            const newShapes = [
                { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.3 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.042, y: middlePosition.y + imageSize.height * 0.33 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.2 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.14, y: middlePosition.y + imageSize.height * 0.24 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.15, y: middlePosition.y + imageSize.height * 0.2 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.24 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.08, y: middlePosition.y + imageSize.height * 0.2 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.04, y: middlePosition.y + imageSize.height * 0.2 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x - imageSize.width * 0.01, y: middlePosition.y + imageSize.height * 0.185 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.04, y: middlePosition.y + imageSize.height * 0.2 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.08, y: middlePosition.y + imageSize.height * 0.2 }, initialColor },
            ];

            if (!shapes.some(shape => shape.formationType === formationType)) {
                // First, filter out shapes not in the new formation
                const filteredShapes = shapes.filter(shape => shape.formationType === formationType);

                // Then, add the new shapes
                setShapes([...filteredShapes, ...newShapes]);
            }

        }

        else if (formationType === 'offenseBunchL') {
            const newShapes = [
                { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.307 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.08, y: middlePosition.y + imageSize.height * 0.315 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.18, y: middlePosition.y + imageSize.height * 0.245 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.104, y: middlePosition.y + imageSize.height * 0.245 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.14, y: middlePosition.y + imageSize.height * 0.206 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.2, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.04, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x - imageSize.width * 0.01, y: middlePosition.y + imageSize.height * 0.189 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.04, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },

            ];


            if (!shapes.some(shape => shape.formationType === formationType)) {
                // First, filter out shapes not in the new formation
                const filteredShapes = shapes.filter(shape => shape.formationType === formationType);

                // Then, add the new shapes
                setShapes([...filteredShapes, ...newShapes]);
            }

        }
        else if (formationType === 'offenseBunchR') {
            const newShapes = [
                { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.307 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.06, y: middlePosition.y + imageSize.height * 0.317 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.215, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.12, y: middlePosition.y + imageSize.height * 0.26 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.14, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.17, y: middlePosition.y + imageSize.height * 0.26 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x - imageSize.width * 0.01, y: middlePosition.y + imageSize.height * 0.189 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },
                { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.203 }, initialColor },

            ];

            if (!shapes.some(shape => shape.formationType === formationType)) {
                // First, filter out shapes not in the new formation
                const filteredShapes = shapes.filter(shape => shape.formationType === formationType);

                // Then, add the new shapes
                setShapes([...filteredShapes, ...newShapes]);
            }


        }
        else if (formationType === 'offense3x1L') {

        }
        else if (formationType === 'offense3x1R') {

        }
        else if (formationType === 'offenseEmptyL') {

        }
        else if (formationType === 'offenseEmptyR') {

        }
        else if (formationType === 'offenseCustom') {

        }
        ////////////////////////////////////////////////////////////////////////////////////////
        //DEFENSE FORMATIONS:
        else if (formationType === 'defense4-3') {

        }
        else if (formationType === 'defense3-4') {

        }
        else if (formationType === 'defense4-2-5') {

        }
        else if (formationType === 'defense3-3Stack') {

        }
        else {
            const newShape = { id: uuidv4(), formationType: formationType, shapeType: 'FIXME', initialPosition: middlePosition, initialColor };
            setShapes([...shapes, newShape]);
        }
    };

    //TODO: for individual shapes
    const addShape = (shapeType, initialColor) => {

    };

    const updateShape = (id, newAttributes) => {
        setShapes(shapes.map(shape => shape.id === id ? { ...shape, ...newAttributes } : shape));
    };

    const deleteShape = (id) => {
        setShapes(shapes.filter(shape => shape.id !== id));
    };

    //Deletes all shapes not of the formationType
    const deleteFormation = (formationType) => {
        console.log(formationType);
        setShapes(shapes.filter(shape => shape.formationType === formationType));
    }

    const deleteAllShapes = () => {
        setShapes([]);
    };

    const hideShapeContextMenu = () => {
        setShapes(shapes.map(shape => ({ ...shape, showContextMenu: false })));
    };

    return { shapes, addFormation, addShape, updateShape, deleteShape, deleteFormation, deleteAllShapes, hideShapeContextMenu };
}
export default useShapes;