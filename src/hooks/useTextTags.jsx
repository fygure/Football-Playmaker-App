// useTexts.jsx
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useTextTags(imageRef) {
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
        if (imageRef.current) {
            console.log('Flip Type:', flipType);

            setTextTags(prevTextTags => {
                // Create new text tags for all the text tags
                let newTextTags = prevTextTags.map(textTag => {
                    let newPosition;
                    let newAttributes = {};
                    let offset;
                    if (flipType === "Up/Down") {
                        //FIXME: offset is where you calculate the orientation
                        offset = isUpDownFlipped ? 10 : -10; //example
                        // Check if the x and y attributes exist
                        if ('x' in textTag && 'y' in textTag) {
                            newPosition = { x: textTag.x, y: textTag.y + offset };
                            newAttributes = { x: newPosition.x, y: newPosition.y };
                        } else { // else use the initial position
                            newPosition = { ...textTag.initialPosition, y: textTag.initialPosition.y + offset * 5 };
                        }
                    } else if (flipType === "Left/Right") {
                        //FIXME: offset is where you calculate the orientation
                        offset = isLeftRightFlipped ? 10 : -10; //example
                        // Check if the x and y attributes exist
                        if ('x' in textTag && 'y' in textTag) {
                            newPosition = { x: textTag.x + offset, y: textTag.y };
                            newAttributes = { x: newPosition.x, y: newPosition.y };
                        } else { // else use the initial position
                            newPosition = { ...textTag.initialPosition, x: textTag.initialPosition.x + offset * 5 };
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
        }
    };


    return { textTags, setTextTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags };
}
export default useTextTags;