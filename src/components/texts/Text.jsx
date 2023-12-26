import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from '../menus/ContextMenu';
function Text(props) {
    const {
        texts,
        id,
        initialPosition,
        initialColor,
        onChange,
        onDelete,
        onHideContextMenu,
        imageRef,
        stageRef,
        setSelectedTexts,
        selectedTextID,
        setSelectedTextID,
    } = props;

    const textRef = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const image = imageRef.current;
        const initialImagePosition = { x: image.x(), y: image.y() };
        const initialImageSize = { width: image.width(), height: image.height() };
        const initialRelativePosition = {
            x: (position.x - initialImagePosition.x) / initialImageSize.width,
            y: (position.y - initialImagePosition.y) / initialImageSize.height,
        };


        const handleResize = () => {
            const newImagePosition = { x: image.x(), y: image.y() };
            const newImageSize = { width: image.width(), height: image.height() };
            setPosition({
                x: initialRelativePosition.x * newImageSize.width + newImagePosition.x,
                y: initialRelativePosition.y * newImageSize.height + newImagePosition.y,
            });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position, imageRef]);

    
 
    const handleOnClick = () => {
        // const node = shapeRef.current;
        //First empty the selectedShapes array
        setSelectedTexts([]);
        //Filter the shapes array to grab the shape by the id
        const selectedText = texts.find(text => text.id === id);
        console.log('Text Clicked', selectedText);
        
        setSelectedTexts([selectedText]);
        setSelectedTextID(id);
        console.log('Selected Text ID:', id);
    }




} 



