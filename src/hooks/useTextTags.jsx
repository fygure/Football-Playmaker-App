// useTexts.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useTextTags(imageRef){
    const [textTags, setTextTags] = useState([]);

    const addTextTag = (text, initialColor) => {
        const middlePosition = {
            x: imageRef.current.x() + (imageRef.current.width() / 2),
            y: imageRef.current.height() / 2
        };
        
        const newTextTag = {
            id: uuidv4(),
            initialPosition: middlePosition,
            initialColor,
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


    return { textTags, addTextTag, updateTextTag, deleteTextTag, deleteAllTextTags, hideTextTagContextMenu};
}
export default useTextTags;