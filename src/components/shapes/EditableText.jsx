import React, { useState, useRef, useEffect } from 'react';
import { Text } from 'react-konva';

const EditableText = ({ initialText, x, y, fontSize, handleTextChange }) => {
    const [text, setText] = useState(initialText);
    const textRef = useRef();
    const textareaRef = useRef();

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
        textarea.style.position = 'absolute';
        textarea.style.top = `${areaPosition.y - 3.5}px`;
        textarea.style.left = `${areaPosition.x - 3}px`;
        textarea.style.width = `${textNode.width() + 30}px`;
        textarea.style.height = `${textNode.height() - textNode.padding() * 2 + 5}px`;
        textarea.style.fontSize = `${textNode.fontSize()}px`;
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
        };

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                const newValue = textarea.value.trim();
                textNode.text(newValue);
                setText(newValue || 'Double click to edit...');
                removeTextarea();
                handleTextChange(newValue || 'Double click to edit...');
            }
            if (e.key === 'Escape') {
                removeTextarea();
            }
        });

        const handleOutsideClick = (e) => {
            if (e.target !== textarea) {
                const newValue = textarea.value.trim();
                textNode.text(newValue);
                setText(newValue || 'Double click to edit...');
                removeTextarea();
                handleTextChange(newValue || 'Double click to edit...');
            }
        };

        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    };

    const handleBlur = () => {
        const textNode = textRef.current;
        if (textareaRef.current.value.trim() === '') {
            // If it is, set a placeholder text
            textNode.text('Double click to edit...');
            setText(prevText => {
                if (prevText.trim() === '') {
                    textNode.text('Double click to edit...');
                    return 'Double click to edit...';
                } else {
                    textNode.text(prevText);
                    return prevText;
                }
            });
        } else {
            setText(textareaRef.current.value);
        }
        textareaRef.current.style.display = 'none';



        textNode.show(); // show the text node
        textNode.getLayer().draw(); // redraw the layer to reflect the changes
    };



    return (
        <Text
            text={text}
            x={x}
            y={y}
            fontSize={fontSize}
            ref={textRef}
            onDblClick={handleDblClick}
            onClick={() => console.log(text)}
        />
    );
};

export default EditableText;