import React, { useState, useRef, useEffect } from 'react';
import { Text } from 'react-konva';

const EditableText = ({ initialText, x, y, fontSize, handleTextChange }) => {
    const [text, setText] = useState(initialText);
    const textRef = useRef();
    const textareaRef = useRef();
    const handleOutsideClickRef = useRef();
    const handleBlurRef = useRef();
    const fontWeight = 700;

    const handleDblClick = () => {
        const textNode = textRef.current;
        const stage = textNode.getStage();

        if (text !== 'Double click to edit...') {
            textNode.hide();
        }

        const textPosition = textNode.absolutePosition();
        const stageBox = stage.container().getBoundingClientRect();

        const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        };

        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        if (text === 'Double click to edit...') {
            textarea.value = '';
        } else {
            textarea.value = text;
        }

        textarea.value = textNode.text();
        textarea.style.fontFamily = 'Bitter';
        textarea.style.position = 'absolute';
        textarea.style.top = `${areaPosition.y - 3.5}px`;
        textarea.style.left = `${areaPosition.x - 3}px`;
        textarea.style.width = `${textNode.width() + 30}px`;
        textarea.style.height = `${textNode.height() - textNode.padding() * 2 + 5}px`;
        textarea.style.fontSize = `${textNode.fontSize()}px`;
        textarea.style.fontWeight = fontWeight;
        textarea.style.border = '2px dashed red';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        // textarea.style.background = 'none';
        textarea.style.outline = 'black';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = `${textNode.lineHeight()}`;
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();

        textarea.focus();

        const removeTextarea = () => {
            if (textarea.parentNode) {
                textarea.parentNode.removeChild(textarea);
            }
            textNode.show();
            window.removeEventListener('click', handleOutsideClickRef.current);
            textarea.removeEventListener('blur', handleBlurRef.current);
        };


        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                const newValue = textarea.value.trim();
                const finalValue = newValue || 'Double click to edit...';
                textNode.text(finalValue);
                setText(finalValue);
                removeTextarea();
                handleTextChange(finalValue);
            }
            if (e.key === 'Escape') {
                removeTextarea();
            }
        });

        const handleOutsideClick = (e) => {
            if (e.target !== textarea) {
                const newValue = textarea.value.trim();
                const finalValue = newValue || 'Double click to edit...';
                textNode.text(finalValue);
                setText(finalValue);
                removeTextarea();
                handleTextChange(finalValue);
            }
        };


        const handleBlur = () => {
            const textNode = textRef.current;
            const newValue = textarea.value.trim();
            const finalValue = newValue || 'Double click to edit...';
            textNode.text(finalValue);
            setText(finalValue);
            handleTextChange(finalValue);
        };

        handleOutsideClickRef.current = handleOutsideClick;
        handleBlurRef.current = handleBlur;
        textarea.addEventListener('blur', handleBlur);


        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    };





    return (
        <Text
            text={text}
            x={x}
            y={y}
            fontSize={fontSize}
            fontFamily="Bitter"
            fontWeight={fontWeight}
            ref={textRef}
            onDblClick={handleDblClick}
            onClick={() => console.log(text)}
        />
    );
};

export default EditableText;