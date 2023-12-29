import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from '../menus/ContextMenu'; 
import { Group, Text } from 'react-konva';
import EditableText from '../shapes/EditableText';


const TEXT_SIZES = {
    FONT: { MIN: 6, MAX: 13 },
};
function TextTag(props) {
    const {
        textTags,
        id,
        text,
        initialPosition,
        initialColor,
        onTextTagChange,
        onTextTagDelete,
        onHideContextMenu,
        imageRef,
        stageRef,
        setSelectedTextTags,
        selectedTextTagID,
        setSelectedTextTagID,
    } = props;

    const textTagRef = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [fontSize, setFontSize] = useState(TEXT_SIZES.FONT.MAX);
    const [isDragging, setIsDragging] = useState(false);

    const [isCustomText, setIsCustomText] = useState(text === 'CUSTOM');


    useEffect(() => {
        const image = imageRef.current;
        const initialImagePosition = { x: image.x(), y: image.y() };
        const initialImageSize = { width: image.width(), height: image.height() };
        const initialRelativePosition = {
            x: (position.x - initialImagePosition.x) / initialImageSize.width,
            y: (position.y - initialImagePosition.y) / initialImageSize.height,
        };
        
        const initialRelativeFontSize = fontSize / initialImageSize.width;

        const handleResize = () => {
            const newImagePosition = { x: image.x(), y: image.y() };
            const newImageSize = { width: image.width(), height: image.height() };
            setPosition({
                x: initialRelativePosition.x * newImageSize.width + newImagePosition.x,
                y: initialRelativePosition.y * newImageSize.height + newImagePosition.y,
            });
            const newFontSize = Math.max(Math.min(initialRelativeFontSize * newImageSize.width, TEXT_SIZES.FONT.MAX), TEXT_SIZES.FONT.MIN);
            setFontSize(newFontSize);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position, imageRef]);

    
 
    const handleOnClick = () => {
        // const node = shapeRef.current;
        //First empty the selectedShapes array
        setSelectedTextTags([]);
        //Filter the shapes array to grab the shape by the id
        const selectedTextTag = textTags.find(text => text.id === id);
        console.log('Text Clicked', selectedTextTag);
        
        setSelectedTextTags([selectedTextTag]);
        setSelectedTextTagID(id);
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
        onTextTagDelete(id);
    };

    const handleDragStart = () => {
        setShowContextMenu(false);
        setIsDragging(true);
    };

    const handleDragEnd = (e) => {
        //console.log(e.target.position());
        setPosition(e.target.position());
        onTextTagChange(id, { x: e.target.x(), y: e.target.y() });
        setIsDragging(false); 
    };

    const handleHideContextMenu = () => {
        setShowContextMenu(false);
    }

    const handleTextChange = (newText) => {
        onTextTagChange(id, { text: newText });
    };

    const dragBoundFunc = (pos) => {
        const stage = textTagRef.current.getStage();
        const { width: stageWidth, height: stageHeight } = stage.size();
        const text = textTagRef.current;
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


    return (
        <>
        <Group
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleOnClick}
        onContextMenu={handleRightClick}
        ref={textTagRef}
        x={position.x}
        y={position.y}
        >
            <Text
                text = {text}
                x = {0}
                y = {0}
                fontSize = {fontSize}
                fill={isDragging ? 'green' : initialColor}
                fontStyle='bold' 
                fontFamily='Inter, sans-serif'
            />   
            {isCustomText && (
                <EditableText
                    initialText={text}
                    x={0}
                    y={0}
                    fontSize={fontSize}
                    handleTextChange={handleTextChange}
                />
            )}
        </Group>
        {selectedTextTagID === id}
        {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    )


} 
export default TextTag;



