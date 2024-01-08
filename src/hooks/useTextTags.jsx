// useTexts.jsx
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useTextTags(imageRef) {
    const [textTags, setTextTags] = useState([]);

    const addTextTag = (text, newColor) => {

        console.log('Creating text tag:', text);
        const startPosition = {
            x: imageRef.current.x() + (imageRef.current.width() / 2) - 30,
            y: imageRef.current.height() - 60
        };


        const newTextTag = {
            id: uuidv4(),
            initialPosition: startPosition,
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


    const flipAllTextTags = (flipType) => {
        console.log('Flip Type:', flipType);
        //Make sure it has a x and y attribute otherwise use initialPosition.x and initialPosition.y
        //If it only has initialPosition create attributes x and y copied from the initialPosition
        //create a updated array by iterating through the textTags array and update each textTag's x and y attributes
        //setTextTags with the array of updated textTags
        if (flipType === 'Up/Down') {
            textTags.forEach(text => {
                let updatedAttributes;
                if (text.x !== undefined && text.y !== undefined) {
                    console.log('Moved and Flipping Up/Down');
                    //console.log('It has x', text.x, 'and y', text.y);
                    updatedAttributes = { y: text.y * -1 };
                } else if (text.initialPosition) {
                    console.log('Initial Flipping Up/Down');
                    //console.log('It has initial x', text.initialPosition.x, 'and initial y', text.initialPosition.y);
                    updatedAttributes = {
                        x: text.initialPosition.x,
                        y: text.initialPosition.y * -1
                    };
                }
                updateTextTag(text.id, updatedAttributes);
            });
        }
        else if (flipType === 'Left/Right') {
            textTags.forEach(text => {
                let updatedAttributes;
                if (text.x !== undefined && text.y !== undefined) {
                    console.log('Moved and Flipping Left/Right');
                    console.log('It has x', text.x, 'and y', text.y);
                    updatedAttributes = { x: text.x * -1 };
                } else if (text.initialPosition) {
                    console.log('Moved and Flipping Left/Right');
                    console.log('It has initial x', text.initialPosition.x, 'and initial y', text.initialPosition.y);
                    updatedAttributes = {
                        x: text.initialPosition.x * -1,
                        y: text.initialPosition.y
                    };
                }
                updateTextTag(text.id, updatedAttributes);
            });
        }
    };


    return { textTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu, flipAllTextTags };
}
export default useTextTags;