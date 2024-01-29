// useShapes.jsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _, { flip } from 'lodash';

function useShapes(imageRef, lines, setLines) {


    const [shapes, setShapes] = useState([]);
    //Shape Handlers
    const addFormation = (formationType, initialColor) => {
        if (imageRef.current) {
            console.log('Formation Type:', formationType);
            const middlePosition = {
                x: imageRef.current.x() + (imageRef.current.width() / 2),
                y: imageRef.current.height() / 2
            };

            const imageSize = {
                width: imageRef.current.width(),
                height: imageRef.current.height()
            };

            const isOffenseFormation = formationType.startsWith('offense');
            //console.log(isOffenseFormation);

            //OFFENSE FORMATIONS:
            if (formationType === 'offense2x2') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.052, y: middlePosition.y + imageSize.height * 0.33 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.23, y: middlePosition.y + imageSize.height * 0.24 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.23, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.24 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }


            } else if (formationType === 'offenseBunchL') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.315 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.24, y: middlePosition.y + imageSize.height * 0.245 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.14, y: middlePosition.y + imageSize.height * 0.245 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.19, y: middlePosition.y + imageSize.height * 0.206 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.27, y: middlePosition.y + imageSize.height * 0.203 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];


                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'offenseBunchR') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.07, y: middlePosition.y + imageSize.height * 0.32 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.28, y: middlePosition.y + imageSize.height * 0.203 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.16, y: middlePosition.y + imageSize.height * 0.265 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.2, y: middlePosition.y + imageSize.height * 0.203 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.24, y: middlePosition.y + imageSize.height * 0.265 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }


            } else if (formationType === 'offense3x1L') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.335 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.34, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.27, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.19, y: middlePosition.y + imageSize.height * 0.25 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.27, y: middlePosition.y + imageSize.height * 0.203 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }


            } else if (formationType === 'offense3x1R') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.07, y: middlePosition.y + imageSize.height * 0.335 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.29, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.27, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.19, y: middlePosition.y + imageSize.height * 0.25 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.34, y: middlePosition.y + imageSize.height * 0.203 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'offenseEmptyL') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.3, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.32, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.24, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.175, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.203 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'offenseEmptyR') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.003, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.24, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.27, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.175, y: middlePosition.y + imageSize.height * 0.2 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.4, y: middlePosition.y + imageSize.height * 0.233 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }

            }
            else if (formationType === 'offenseCustom') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'QBoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.00, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'QB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'RBoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.05, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'RB' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Xoval', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'X' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Hoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.05, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'H' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Yoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'Y' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Zoval', initialPosition: { x: middlePosition.x + imageSize.width * 0.15, y: middlePosition.y + imageSize.height * 0.307 }, initialColor, text: 'Z' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Center', initialPosition: { x: middlePosition.x, y: middlePosition.y + imageSize.height * 0.205 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Lineman', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.207 }, initialColor },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    // Then, add the new shapes
                    setShapes([...filteredShapes, ...newShapes]);
                }


            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //DEFENSE FORMATIONS:
            //FIXME: add newShapes for defense formations
            else if (formationType === 'defense4-3L') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x + imageSize.width * 0.00, y: middlePosition.y - imageSize.height * 0.09 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x + imageSize.width * 0.19, y: middlePosition.y - imageSize.height * 0.02 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x - imageSize.width * 0.16, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x - imageSize.width * 0.08, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x + imageSize.width * 0.05, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x - imageSize.width * 0.025, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x + imageSize.width * 0.065, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x + imageSize.width * 0.11, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }
            } else if (formationType === 'defense4-3R') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x + imageSize.width * 0.00, y: middlePosition.y - imageSize.height * 0.09 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x - imageSize.width * 0.2, y: middlePosition.y - imageSize.height * 0.02 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x + imageSize.width * 0.16, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x + imageSize.width * 0.07, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x + imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x + imageSize.width * 0.025, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x - imageSize.width * 0.065, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x - imageSize.width * 0.11, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defense3-4L') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x - imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x + imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x - imageSize.width * 0.20, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x - imageSize.width * 0.075, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x + imageSize.width * 0.075, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x + imageSize.width * 0.20, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defense3-4R') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x + imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x - imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x + imageSize.width * 0.20, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x + imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x - imageSize.width * 0.045, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x + imageSize.width * 0.075, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x - imageSize.width * 0.075, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x - imageSize.width * 0.20, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defense4-2-5L') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x - imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x + imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x - imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x - imageSize.width * 0.07, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x + imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x - imageSize.width * 0.025, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x + imageSize.width * 0.065, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x + imageSize.width * 0.11, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defense4-2-5R') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x + imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x - imageSize.width * 0.16, y: middlePosition.y - imageSize.height * 0.06 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x + imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x + imageSize.width * 0.07, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x - imageSize.width * 0.09, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x + imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x + imageSize.width * 0.025, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x - imageSize.width * 0.065, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x - imageSize.width * 0.11, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defense3-3StackL') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x - imageSize.width * 0.00, y: middlePosition.y - imageSize.height * 0.1 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x + imageSize.width * 0.2, y: middlePosition.y + imageSize.height * 0.028 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x - imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.028 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x + imageSize.width * 0.105, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x + imageSize.width * 0.105, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defense3-3StackR') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x - imageSize.width * 0.00, y: middlePosition.y - imageSize.height * 0.1 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x - imageSize.width * 0.21, y: middlePosition.y + imageSize.height * 0.028 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x + imageSize.width * 0.2, y: middlePosition.y + imageSize.height * 0.028 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x + imageSize.width * 0.105, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.33, y: middlePosition.y + imageSize.height * 0.1 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x + imageSize.width * 0.105, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.144 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }

            } else if (formationType === 'defenseCustom') {
                const newShapes = [
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderSS', initialPosition: { x: middlePosition.x - imageSize.width * 0.025, y: middlePosition.y - imageSize.height * 0.04 }, initialColor, text: 'SS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderWS', initialPosition: { x: middlePosition.x + imageSize.width * 0.025, y: middlePosition.y - imageSize.height * 0.04 }, initialColor, text: 'WS' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x - imageSize.width * 0.2, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'Defender$', initialPosition: { x: middlePosition.x + imageSize.width * 0.15, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: '$' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderM', initialPosition: { x: middlePosition.x + imageSize.width * 0.10, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'M' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderW', initialPosition: { x: middlePosition.x + imageSize.width * 0.002, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'W' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderC', initialPosition: { x: middlePosition.x + imageSize.width * 0.2, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'C' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderE', initialPosition: { x: middlePosition.x + imageSize.width * 0.05, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'E' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderN', initialPosition: { x: middlePosition.x - imageSize.width * 0.05, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'N' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderT', initialPosition: { x: middlePosition.x - imageSize.width * 0.1, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'T' },
                    { id: uuidv4(), formationType: formationType, shapeType: 'DefenderJ', initialPosition: { x: middlePosition.x - imageSize.width * 0.15, y: middlePosition.y + imageSize.height * 0.075 }, initialColor, text: 'J' },
                ];

                const filteredShapes = shapes.filter(shape => !shape.formationType.startsWith(isOffenseFormation ? 'offense' : 'defense'));

                if (!filteredShapes.some(shape => shape.formationType === formationType)) {
                    setShapes([...filteredShapes, ...newShapes]);
                }
            }
            else {
                const newShape = { id: uuidv4(), formationType: formationType, shapeType: 'None:FIXME', initialPosition: middlePosition, initialColor };
                setShapes([...shapes, newShape]);
            }

        }
    };

    // individual shape addition
    const addShape = (shapeType, initialColor) => {
        if (imageRef.current) {
            const middlePosition = {
                x: imageRef.current.x() + (imageRef.current.width() / 2),
                y: imageRef.current.height() / 2
            };

            const imageSize = {
                width: imageRef.current.width(),
                height: imageRef.current.height()
            };

            //console.log(shapeType, initialColor);
            console.log(shapeType);

            const isOffensePlayer = shapeType.startsWith('Offense');
            //console.log(isOffensePlayer);

            const newShape = {
                id: uuidv4(), formationType: isOffensePlayer ? 'offense' : 'defense', shapeType,
                initialPosition: isOffensePlayer
                    ? { x: middlePosition.x - imageSize.width * 0.45, y: middlePosition.y + imageSize.height * 0.45 }
                    : { x: middlePosition.x - imageSize.width * 0.45, y: middlePosition.y - imageSize.height * 0.45 },
                initialColor, text: 'XT'
            };

            setShapes([...shapes, newShape]);

        }
    };

    const updateShape = (id, newAttributes) => {
        if (imageRef.current) {
            setShapes(shapes.map(shape => shape.id === id ? { ...shape, ...newAttributes } : shape));
        }
    };

    const deleteShape = (id) => {
        if (imageRef.current) {
            setShapes(shapes.filter(shape => shape.id !== id));
        }
    };

    //Unused for now
    //Deletes all shapes not of the formationType
    const deleteFormation = (formationType) => {
        //console.log(formationType);
        setShapes(shapes.filter(shape => shape.formationType === formationType));
    }

    const deleteAllShapes = () => {
        if (imageRef.current) {
            setShapes([]);
        }
    };

    const hideShapeContextMenu = () => {
        if (imageRef.current) {
            setShapes(shapes.map(shape => ({ ...shape, showContextMenu: false })));
        }
    };




    const [isUpDownFlipped, setIsUpDownFlipped] = useState(false);
    const [isLeftRightFlipped, setIsLeftRightFlipped] = useState(false);
    const flipAllShapes = (flipType) => {
        if (!flipType) {
            console.error("You're clicking too fast, flipType in flipAllShapes is undefined");
            return;
        }
        if(imageRef.current) {
            const imageCenter = {
                x: imageRef.current.x() + (imageRef.current.width() / 2),
                y: imageRef.current.y() + (imageRef.current.height() / 2)
            }
            // console.log("imageCenter: ", imageCenter);

            let shapeIdMapping = {};
                // Create new shapes for all the shapes
            let newShapes = shapes.map(shape => {
                let newPosition;
                let newAttributes = {};
                if (flipType === "Up/Down") {
                    if (shape && 'x' in shape && 'y' in shape) {
                        let newY = imageCenter.y - (shape.y - imageCenter.y);
                        newPosition = { x: shape.x, y: newY };
                        newAttributes = { x: newPosition.x, y: newPosition.y };
                    } else if (shape && shape.initialPosition) {
                        let newY = imageCenter.y - (shape.initialPosition.y - imageCenter.y);
                        newPosition = { x: shape.initialPosition.x, y: newY };
                    }
                }
                else if (flipType === "Left/Right") {
                    if (shape && 'x' in shape && 'y' in shape) {
                        let newX = imageCenter.x - (shape.x - imageCenter.x);
                        newPosition = { x: newX, y: shape.y };
                        newAttributes = { x: newPosition.x, y: newPosition.y };
                    } else if (shape && shape.initialPosition) {
                        let newX = imageCenter.x - (shape.initialPosition.x - imageCenter.x);
                        newPosition = { y: shape.initialPosition.y, x: newX };
                    }
                }
                // Create a new shape with the new position
                const newId = uuidv4();
                shapeIdMapping[shape.id] = newId;
                const newShape = {
                id: newId,
                initialPosition: newPosition,
                initialColor: shape.initialColor,
                ...newAttributes,
                formationType: shape.formationType,
                shapeType: shape.shapeType,
                text: shape.text,
                };
                return newShape;
            });
            // Set the new shapes
            setShapes(newShapes);
            console.log("shapeIdMapping: ", shapeIdMapping);

            let lineIdMapping = {};
            //Shapes hasn't been updated yet, to the respective new shapes
            const deepCopyLines = _.cloneDeep(lines).map(line => {
                // console.log("shapeIdMapping: ", shapeIdMapping[line.attachedShapeId])
                // console.log('newShapes current state:', newShapes)
                const flippedShape = newShapes.find(shape => shape.id === shapeIdMapping[line.drawnFromId]);
                // let flippedLine;
                // if (!flippedShape) {
                //     flippedLine = self.find(line => line.id === lineIdMapping[line.drawnFromId]);
                //     console.log("flippedLine: ", flippedLine);
                // }
                // if (flippedShape) {
                //     console.log("flippedShape: ", flippedShape);
                // } else {
                //     console.log("No shape found with the given id", flippedShape);
                // }
                let newStartPos;
                if (flippedShape && 'x' in flippedShape && 'y' in flippedShape) {
                    newStartPos = {x: flippedShape.x, y: flippedShape.y};
                } else if (flippedShape && flippedShape.initialPosition) {
                    newStartPos = {x: flippedShape.initialPosition.x, y: flippedShape.initialPosition.y};
                }
                // console.log('newStartLinePos', newStartLinePos);
                // console.log('This line endPos', line.endPos)
                // console.log('This line controlPoint', line.controlPoint)
                let newEndPos;
                let newControlPos;
                if (flipType === "Up/Down") {
                    newEndPos = {x: line.endPos.x, y: imageCenter.y - (line.endPos.y - imageCenter.y)};
                    newControlPos = {x: line.controlPoint.x, y: imageCenter.y - (line.controlPoint.y - imageCenter.y)};
                } else if (flipType === "Left/Right") {
                    newEndPos = {x: imageCenter.x - (line.endPos.x- imageCenter.x), y: line.endPos.y};
                    newControlPos = {x: imageCenter.x - (line.controlPoint.x - imageCenter.x), y: line.controlPoint.y};
                }
                const newId = uuidv4();
                lineIdMapping[line.id] = newId;
                return {...line,
                    id: newId,
                    attachedShapeId: shapeIdMapping[line.attachedShapeId],
                    startPos: newStartPos,
                    endPos: newEndPos,
                    controlPoint: newControlPos,
                    drawnFromId: line.drawnFromId
                };
            });
            console.log('deepCopyLines', deepCopyLines)

            const deepCopyLinesAgain = _.cloneDeep(deepCopyLines).map(line => {
                const flippedLine = deepCopyLines.find(l => l.id === lineIdMapping[line.drawnFromId]);
                if (flippedLine) {
                    line.startPos = flippedLine.endPos;
                }
                return { ...line,
                    drawnFromId: line.attachedShapeId || lineIdMapping[line.drawnFromId] || line.drawnFromId
                };
            });

            setLines(deepCopyLinesAgain);

            if (flipType === "Up/Down") {
                setIsUpDownFlipped(!isUpDownFlipped);
            } else if (flipType === "Left/Right") {
                setIsLeftRightFlipped(!isLeftRightFlipped);
            }
        }
    };
    useEffect(() => {
    if (imageRef.current) {
        const image = imageRef.current;
        let initialImagePosition = { x: image.x(), y: image.y() };
        let initialImageSize = { width: image.width(), height: image.height() };

        let initialRelativeShapes = shapes.map(shape => {
            if(shape && 'x' in shape && 'y' in shape) {
                let initialRelativePos = {
                    x: (shape.x - initialImagePosition.x) / initialImageSize.width,
                    y: (shape.y - initialImagePosition.y) / initialImageSize.height
                };
                return { ...shape, x:initialRelativePos.x, y:initialRelativePos.y};
            }
            else if (shape && shape.initialPosition) {
                let initialRelativePos = {
                    x: (shape.initialPosition.x - initialImagePosition.x) / initialImageSize.width,
                    y: (shape.initialPosition.y - initialImagePosition.y) / initialImageSize.height
                };
                return { ...shape, initialPosition: initialRelativePos};
            }
        });
        const handleResize = () => {
            if (imageRef.current) {
                const newImagePosition = { x: image.x(), y: image.y() };
                const newImageSize = { width: image.width(), height: image.height() };

                const newShapes = initialRelativeShapes.map(shape => {
                    if(shape && 'x' in shape && 'y' in shape) {
                        let newRelativePos = {
                            x: shape.x * newImageSize.width + newImagePosition.x,
                            y: shape.y * newImageSize.height + newImagePosition.y
                        };
                        return { ...shape, x:newRelativePos.x, y:newRelativePos.y};
                    }
                    else if (shape && shape.initialPosition) {
                        let newRelativePos = {
                            x: shape.initialPosition.x * newImageSize.width + newImagePosition.x,
                            y: shape.initialPosition.y * newImageSize.height + newImagePosition.y
                        };
                        return { ...shape, initialPosition: newRelativePos};
                    }
                });
                setShapes(newShapes);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }
}, [shapes, imageRef]);



    return {
        shapes,
        setShapes,
        addFormation,
        addShape,
        updateShape,
        deleteShape,
        deleteFormation,
        deleteAllShapes,
        hideShapeContextMenu,
        flipAllShapes
    };

}
export default useShapes;