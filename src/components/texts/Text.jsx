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

    const handleRightClick = (e) => {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        const mousePos = stage.getPointerPosition();
        setContextMenuPosition({ x: mousePos.x - 20, y: mousePos.y - 15 });
        setShowContextMenu(true);
    };

    const handleDeleteClick = () => {
        setShowContextMenu(false);
        onDelete(id);
    };

    const handleDragStart = () => {
        setShowContextMenu(false);
    };

    const handleDragEnd = (e) => {
        //console.log(e.target.position());
        setPosition(e.target.position());
        onChange(id, { x: e.target.x(), y: e.target.y() });
    };

    const handleHideContextMenu = () => {
        setShowContextMenu(false);
    }

    const handleTextChange = (newText) => {
        onChange(id, { text: newText });
    };

    const dragBoundFunc = (pos) => {
        const stage = textRef.current.getStage();
        const { width: stageWidth, height: stageHeight } = stage.size();
        const text = textRef.current;
        const box = text.getClientRect(); // get bounding box of the shape

        let x = pos.x;
        let y = pos.y;

        if (x < 0) {
            x = 0;
        } else if (x > stageWidth - box.width) {
            x = stageWidth - box.width;
        }

        if (y < 0) {
            y = 0;
        } else if (y > stageHeight - box.height) {
            y = stageHeight - box.height;
        }

        return {
            x,
            y
        };
    };


} 
export default Text;



