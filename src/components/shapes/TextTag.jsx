//TextTag.jsx
import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from '../menus/ContextMenu';
import { Circle, Group, Text, Rect } from 'react-konva';
import EditableText from './EditableText';

const TEXT_SIZES = {
    FONT: { MIN: 6, MAX: 13 },
    CHECK: { MIN: 8, MAX: 13 },
};
function TextTag(props) {
    const {
        logHistory,
        textTags,
        id,
        text,
        initialPosition,
        color,
        selectedColor,
        onTextTagChange,
        onTextTagDelete,
        onHideContextMenu,
        imageRef,
        stageRef,
        setSelectedTextTags,
        selectedTextTagID,
        setSelectedTextTagID,
        isCustomText,
    } = props;

    const fontWeight = 700;
    const textTagRef = useRef();
    const [position, setPosition] = useState(initialPosition || { x: 50, y: 50 });
    console.log('position', position)
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [fontSize, setFontSize] = useState(TEXT_SIZES.FONT.MAX);
    const [checkMarkSize, setCheckMarkSize] = useState(TEXT_SIZES.CHECK.MAX);
    const [isDragging, setIsDragging] = useState(false);
    const [checkMarkImage, setCheckMarkImage] = useState(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = process.env.PUBLIC_URL + '/static/assets/checkmark.png';
        img.onload = () => {
            setCheckMarkImage(img);
        };
    }, []);

    useEffect(() => {
        const image = imageRef.current;
        const initialImagePosition = { x: image.x(), y: image.y() };
        const initialImageSize = { width: image.width(), height: image.height() };
        const initialRelativePosition = {
            x: (position.x - initialImagePosition.x) / initialImageSize.width,
            y: (position.y - initialImagePosition.y) / initialImageSize.height,
        };
        const initialRelativeFontSize = fontSize / initialImageSize.width;
        const initialRelativeCheckMarkSize = checkMarkSize / initialImageSize.width;
        const handleResize = () => {
            const newImagePosition = { x: image.x(), y: image.y() };
            const newImageSize = { width: image.width(), height: image.height() };
            if (position) {
                setPosition({
                    x: initialRelativePosition.x * newImageSize.width + newImagePosition.x,
                    y: initialRelativePosition.y * newImageSize.height + newImagePosition.y,
                });
            }
            const newFontSize = Math.max(Math.min(initialRelativeFontSize * newImageSize.width, TEXT_SIZES.FONT.MAX), TEXT_SIZES.FONT.MIN);
            setFontSize(newFontSize);
            const newCheckMarkSize = Math.max(Math.min(initialRelativeCheckMarkSize * newImageSize.width, TEXT_SIZES.CHECK.MAX), TEXT_SIZES.CHECK.MIN);
            setCheckMarkSize(newCheckMarkSize);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [position, imageRef, checkMarkSize, fontSize]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' && selectedTextTagID === id) {
                handleDeleteClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedTextTagID, id]);


    const handleOnClick = () => {
        // const node = shapeRef.current;
        //First empty the selectedShapes array
        setSelectedTextTags([]);
        setSelectedTextTagID([]);
        //Filter the shapes array to grab the shape by the id
        const selectedTextTag = textTags.find(text => text.id === id);
        console.log('Text Clicked', selectedTextTag);

        setSelectedTextTags([selectedTextTag]);
        setSelectedTextTagID(id);
        if (typeof onTextTagChange === 'function') {
            onTextTagChange(id, { color: selectedColor });
        }
        // console.log('Selected Text ID:', id);
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

    const handleDragStart = (e) => {

        setSelectedTextTags([]);
        setSelectedTextTagID([]);
        //Filter the shapes array to grab the shape by the id
        const selectedTextTag = textTags.find(text => text.id === id);
        console.log('Text Clicked', selectedTextTag);

        setSelectedTextTags([selectedTextTag]);
        setSelectedTextTagID(id);
        setShowContextMenu(false);
        setIsDragging(true);
        if(textTags.find(s => s.id === id).x == null)
            logHistory({type: "text", state: {text: text, x: e.target.x(), y: e.target.y()}, id: id});
    };

    const handleDragEnd = (e) => {
        // console.log(e.target.position());
        if (e.target) {
            setPosition(e.target.position());
            onTextTagChange(id, { x: e.target.x(), y: e.target.y() });
        }
        setIsDragging(false);
        logHistory({type: "text", state: {text: text, x: e.target.x(), y: e.target.y()}, id: id});
    };

    const handleHideContextMenu = () => {
        setShowContextMenu(false);
    }

    const handleTextChange = (newText) => {
        onTextTagChange(id, { text: newText });
        logHistory({type: "text", state: {text: text}, id: id});

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
                {selectedTextTagID === id && (
                    <Rect
                        x={text.trim() === 'Check Mark' ? -13 : -2}
                        y={text.trim() === 'Check Mark' ? -13 : -2}
                        width={text.trim() === 'Check Mark' ? fontSize * 2 : fontSize * text.length * 0.85}
                        height={text.trim() === 'Check Mark' ? fontSize * 2 : fontSize * 1.2}
                        //stroke='red'
                        fill="white"
                        strokeWidth={5}
                        shadowBlur={15}
                        shadowColor='#184267'
                    />
                )}
                {checkMarkImage && text.trim() === 'Check Mark' ? (
                    <>
                        <Circle
                            x={0}
                            y={0}
                            radius={checkMarkImage.width / 2}
                            fill={color}
                        />
                        <Circle
                            x={0}
                            y={0}
                            radius={checkMarkImage.width / 2}
                            fillPatternImage={checkMarkImage}
                            fillPatternScale={{ x: 1, y: 1 }}
                            fillPatternOffset={{ x: checkMarkImage.width / 2, y: checkMarkImage.height / 2 }}
                        />
                    </>
                ) : (
                    <Text
                        text={text}
                        x={0}
                        y={0}
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        fill={color}
                        fontStyle='bold'
                        fontFamily='Inter, sans-serif'
                        textDecoration={['1', '2', '3', '4'].includes(text.trim()) ? 'underline' : 'none'}
                    // opacity={selectedTextTagID === id ? 0.5 : 1}
                    />
                )}
                {isCustomText && (
                    <EditableText
                        initialText={text}
                        x={0}
                        y={0}
                        fontSize={fontSize}
                        handleTextChange={handleTextChange}
                        color={color}
                    />
                )}
            </Group>
            {selectedTextTagID === id}
            {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
        </>
    );
}
export default TextTag;



