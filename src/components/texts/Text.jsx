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




} 



