// Shape.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Star, Rect, Circle, Ring } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';
import QBoval from './shapeType/QBoval';
import RBoval from './shapeType/RBoval';
import Xoval from './shapeType/Xoval';
import Hoval from './shapeType/Hoval';
import Yoval from './shapeType/Yoval';
import Zoval from './shapeType/Zoval';
import Center from './shapeType/Center';
import Lineman from './shapeType/Lineman';

function Shape(props) {
    const {
        id,
        shapeType,
        initialPosition,
        initialColor,
        isSelected,
        onSelect,
        onChange,
        onDelete
    } = props;

    const shapeRef = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const parentContainer = shapeRef.current.getStage().container();
        const initialWindowSize = { width: parentContainer.offsetWidth, height: parentContainer.offsetHeight };

        const handleResize = () => {
            const scaleFactorX = parentContainer.offsetWidth / initialWindowSize.width;
            const scaleFactorY = parentContainer.offsetHeight / initialWindowSize.height;

            setPosition({
                x: position.x * scaleFactorX,
                y: position.y * scaleFactorY,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position]);

    //console.log(`Shape ${id} is selected: ${isSelected}`);
    const handleOnClick = () => {
        onSelect(id);
        const node = shapeRef.current;
        console.log(node);
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

    const commonProps = {
        shapeRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
        isSelected,
        handleOnClick,
        handleRightClick,
        handleDeleteClick,
        handleDragStart,
        handleDragEnd,
        handleHideContextMenu,
    };

    switch (shapeType) {
        case 'QBoval':
            return <QBoval {...commonProps} />;
        case 'RBoval':
            return <RBoval {...commonProps} />;
        case 'Xoval':
            return <Xoval {...commonProps} />;
        case 'Hoval':
            return <Hoval {...commonProps} />;
        case 'Yoval':
            return <Yoval {...commonProps} />;
        case 'Zoval':
            return <Zoval {...commonProps} />;
        case 'Lineman':
            return <Lineman {...commonProps} />;
        case 'Center':
            return <Center {...commonProps} />;
        //Regular shapes
        case 'Star':
            return (
                <>
                    <Star
                        ref={shapeRef}
                        x={position.x}
                        y={position.y}
                        innerRadius={30}
                        outerRadius={70}
                        fill={initialColor}
                        onDragStart={handleDragStart}
                        draggable
                        onDragEnd={handleDragEnd}
                        onClick={handleOnClick}
                        onContextMenu={handleRightClick}
                    />
                    {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
                </>
            );
        case 'Rectangle':
            return (
                <>
                    <Rect
                        ref={shapeRef}
                        x={position.x}
                        y={position.y}
                        width={100}
                        height={100}
                        fill={initialColor}
                        onDragStart={handleDragStart}
                        draggable={true}
                        onDragEnd={handleDragEnd}
                        onClick={handleOnClick}
                        onContextMenu={handleRightClick}
                    />
                    {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />/*This is where we need to add "onMouseLeave" event*/}
                </>
            );
        case 'Circle':
            return (
                <>
                    <Circle
                        ref={shapeRef}
                        x={position.x}
                        y={position.y}
                        radius={50}
                        fill={initialColor}
                        onDragStart={handleDragStart}
                        draggable
                        onDragEnd={handleDragEnd}
                        onClick={handleOnClick}
                        onContextMenu={handleRightClick}
                    />
                    {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
                </>
            );
        case 'Ring':
            return (
                <>
                    <Ring
                        ref={shapeRef}
                        x={position.x}
                        y={position.y}
                        innerRadius={40}
                        outerRadius={70}
                        fill={initialColor}
                        onDragStart={handleDragStart}
                        draggable
                        onDragEnd={handleDragEnd}
                        onClick={handleOnClick}
                        onContextMenu={handleRightClick}
                    />
                    {showContextMenu && <ContextMenu position={contextMenuPosition} onDelete={handleDeleteClick} onMouseLeave={handleHideContextMenu} />}
                </>
            );
        default:
            return null;
    }
}
export default Shape;