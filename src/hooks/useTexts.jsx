// useTexts.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useTexts(imageRef){
    const [texts, setTexts] = useState([]);

    const addText = (text, initialColor) => {
        const middlePosition = {
            x: imageRef.current.x() + (imageRef.current.width() / 2),
            y: imageRef.current.height() / 2
        };
        
        const newText = {
            id: uuidv4(),
            initialPosition: middlePosition,
            initialColor,
            text: text,
        };


        setTexts([...texts, newText]);
    };

    const updateText = (id, newAttributes) => {
        setTexts(texts.map(text => text.id === id ? { ...text, ...newAttributes } : text));
    };

    const deleteText = (id) => {
        setTexts(texts.filter(text => text.id !== id));
    };

    const deleteAllTexts = () => {
        setTexts([]);
    };

    const hideTextContextMenu = () => {
        setTexts(texts.map(text => ({ ...text, showContextMenu: false })));
    };


    return { texts, addText, updateText, deleteText, deleteAllTexts, hideTextContextMenu};
}
export default useTexts;