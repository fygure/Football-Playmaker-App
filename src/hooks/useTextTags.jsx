// useTexts.jsx
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useTextTags(imageRef, stageRef) {
    const [textTags, setTextTags] = useState([]);

    const addTextTag = (text, newColor, position) => {
        if (imageRef.current) {
            console.log('Creating text tag:', text);
            const startPosition = {
                x: imageRef.current.x() + (imageRef.current.width() / 2) - 30,
                y: imageRef.current.height() - 60
            };

            const whichPosition = position ? position : startPosition;

            const newTextTag = {
                id: uuidv4(),
                initialPosition: whichPosition,
                color: newColor,
                text: text,
            };

            setTextTags([...textTags, newTextTag]);
        }
    };

    const updateTextTag = (id, newAttributes) => {
        if (imageRef.current) {
            setTextTags(textTags.map(text => text.id === id ? { ...text, ...newAttributes } : text));
        }
    };

    const deleteTextTag = (id) => {
        if (imageRef.current) {
            setTextTags(textTags.filter(text => text.id !== id));
        }
    };

    const deleteAllTextTags = () => {
        if (imageRef.current) {
            setTextTags([]);
        }
    };

    const hideTextTagContextMenu = () => {
        if (imageRef.current) {
            setTextTags(textTags.map(text => ({ ...text, showContextMenu: false })));
        }
    };


    const [isUpDownFlipped, setIsUpDownFlipped] = useState(false);
    const [isLeftRightFlipped, setIsLeftRightFlipped] = useState(false);
    const flipAllTextTags = (flipType) => {
        if(!flipType){
            console.error("You're clicking too fast, flipType is undefined");
            return;
        }
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

                if (flipType === "Up/Down") {
                    if (textTag && 'x' in textTag && 'y' in textTag) {
                        let newY = imageCenter.y - (textTag.y - imageCenter.y);
                        newPosition = { x: textTag.x, y: newY };
                        newAttributes = { x: newPosition.x, y: newPosition.y };
                    } else if (textTag && textTag.initialPosition) {
                        let newY = imageCenter.y - (textTag.initialPosition.y - imageCenter.y);
                        newPosition = { ...textTag.initialPosition, y: newY };
                    }
                } else if (flipType === "Left/Right") {
                    if (textTag && 'x' in textTag && 'y' in textTag) {
                        let newX = imageCenter.x - (textTag.x - imageCenter.x);
                        newPosition = { x: newX, y: textTag.y };
                        newAttributes = { x: newPosition.x, y: newPosition.y };
                    } else if (textTag && textTag.initialPosition) {
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


    return { textTags, setTextTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags };
}
export default useTextTags;