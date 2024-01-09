// useTexts.jsx
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useTextTags(imageRef, stageRef) {
    const [textTags, setTextTags] = useState([]);

    const addTextTag = (text, newColor, position) => {

        console.log('Creating text tag:', text);
        const startPosition = {
            x: imageRef.current.x() + (imageRef.current.width() / 2) - 20,
            y: imageRef.current.height() - 60
            // x: imageRef.current.x() + (imageRef.current.width() / 2) - 20,
            // y: imageRef.current.y() + (imageRef.current.height() /2)
            // x:stageRef.current.width() / 2,
            // y:stageRef.current.height() /2
        };

        const whichPosition = position ? position : startPosition;

        const newTextTag = {
            id: uuidv4(),
            initialPosition: whichPosition,
            color: newColor,
            text: text,
        };

        setTextTags([...textTags, newTextTag]);
    };

    const updateTextTag = (id, newAttributes) => {
        setTextTags(textTags.map(text => text.id === id ? { ...text, ...newAttributes } : text));
    };

    const deleteTextTag = (id) => {
        setTextTags(textTags.filter(text => text.id !== id));
    };

    const deleteAllTextTags = () => {
        setTextTags([]);
    };

    const hideTextTagContextMenu = () => {
        setTextTags(textTags.map(text => ({ ...text, showContextMenu: false })));
    };


    const [isUpDownFlipped, setIsUpDownFlipped] = useState(false);
    const [isLeftRightFlipped, setIsLeftRightFlipped] = useState(false);
    const flipAllTextTags = (flipType) => {
        console.log('Flip Type:', flipType);
        const imageCenter = {
            x: imageRef.current.x() + (imageRef.current.width() / 2) - 20,
            y: imageRef.current.y() + (imageRef.current.height() / 2)
        }

        setTextTags(prevTextTags => {
            // Create new text tags for all the text tags
            let newTextTags = prevTextTags.map(textTag => {
                let newPosition;
                let newAttributes = {};
                let offset;
                // if (flipType === "Up/Down") {
                //     //FIXME: offset is where you calculate the orientation
                //     offset = isUpDownFlipped ? 10 : -10; //example
                //     // Check if the x and y attributes exist
                //     if ('x' in textTag && 'y' in textTag) {
                //         newPosition = { x: textTag.x, y: textTag.y + offset };
                //         newAttributes = { x: newPosition.x, y: newPosition.y };
                //     } else { // else use the initial position
                //         newPosition = { ...textTag.initialPosition, y: textTag.initialPosition.y + offset * 5 };
                //     }
                // } else if (flipType === "Left/Right") {
                //     //FIXME: offset is where you calculate the orientation
                //     offset = isLeftRightFlipped ? 10 : -10; //example
                //     // Check if the x and y attributes exist
                //     if ('x' in textTag && 'y' in textTag) {
                //         newPosition = { x: textTag.x + offset, y: textTag.y };
                //         newAttributes = { x: newPosition.x, y: newPosition.y };
                //     } else { // else use the initial position
                //         newPosition = { ...textTag.initialPosition, x: textTag.initialPosition.x + offset * 5 };
                //     }
                // }
                // if (flipType === "Up/Down") {
                //     // Calculate the new y position as a reflection over the center of the canvas
                //     let newY = imageRef.current.height() - (textTag.y || textTag.initialPosition.y);
                //     newPosition = { x: textTag.x || textTag.initialPosition.x, y: newY };
                //     newAttributes = { x: newPosition.x, y: newPosition.y };
                // } else if (flipType === "Left/Right") {
                //     // Calculate the new x position as a reflection over the center of the canvas
                //     let newX = imageRef.current.width() - (textTag.x || textTag.initialPosition.x);
                //     newPosition = { x: newX, y: textTag.y || textTag.initialPosition.y };
                //     newAttributes = { x: newPosition.x, y: newPosition.y };
                // }
                //////////////////////////////////////////////////////////////////////////////////////////
                //FIX ME THERE'S A RUNTIME BUG
                if (flipType === "Up/Down") {
                    if ('x' in textTag && 'y' in textTag) {
                        let newY = imageCenter.y - (textTag.y - imageCenter.y);
                        newPosition = { x: textTag.x, y: newY };
                        newAttributes = { x: newPosition.x, y: newPosition.y };
                    } else {
                        let newY = imageCenter.y - (textTag.initialPosition.y - imageCenter.y);
                        newPosition = { ...textTag.initialPosition, y: newY };
                    }
                } else if (flipType === "Left/Right") {
                    if ('x' in textTag && 'y' in textTag) {
                        let newX = imageCenter.x - (textTag.x - imageCenter.x);
                        newPosition = { x: newX, y: textTag.y };
                        newAttributes = { x: newPosition.x, y: newPosition.y };
                    } else {
                        let newX = imageCenter.x - (textTag.initialPosition.x - imageCenter.x);
                        newPosition = { ...textTag.initialPosition, x: newX };
                    }
                }
                // Create a new text tag with the new position
                const newTextTag = {
                    id: uuidv4(),
                    initialPosition: newPosition,
                    color: textTag.color,
                    text: textTag.text,
                    ...newAttributes
                };

                return newTextTag;
            });

            return newTextTags;
        });

        if (flipType === "Up/Down") {
            setIsUpDownFlipped(!isUpDownFlipped);
        } else if (flipType === "Left/Right") {
            setIsLeftRightFlipped(!isLeftRightFlipped);
        }
    };


    return { textTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags };
}
export default useTextTags;