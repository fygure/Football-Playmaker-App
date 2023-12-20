// Shape.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Star, Rect, Circle, Ring } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';
import CenterSquare from './shapeType/CenterSquare';
import LinemanOval from './shapeType/LinemanOval';
import ReceiverOval from './shapeType/ReceiverOval';

// Shape Sizes Configuration
const SHAPE_SIZES = {
    CIRCLE: { MIN: 10, MAX: 30 },
    ELLIPSE: { X: { MIN: 8, MAX: 18 }, Y: { MIN: 5, MAX: 12 } },
    FONT: { MIN: 6, MAX: 13 },
    RECT: { WIDTH: { MIN: 10, MAX: 28 }, HEIGHT: { MIN: 10, MAX: 28 } },
};

function Shape(props) {
    const {
        id,
        shapeType,
        initialPosition,
        initialColor,
        isSelected,
        onSelect,
        onChange,
        onDelete,
        imageRef
    } = props;

    const shapeRef = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [circleRadius, setCircleRadius] = useState(30); // initial circle radius
    const [ellipseRadiuses, setEllipseRadiuses] = useState({ x: 18, y: 12 }); // initial ellipse radii
    const [fontSize, setFontSize] = useState(13);
    const [rectSize, setRectSize] = useState({ width: 28, height: 28 }); // initial rectangle size

    useEffect(() => {
        const image = imageRef.current;
        const initialImagePosition = { x: image.x(), y: image.y() };
        const initialImageSize = { width: image.width(), height: image.height() };
        const initialRelativePosition = {
            x: (position.x - initialImagePosition.x) / initialImageSize.width,
            y: (position.y - initialImagePosition.y) / initialImageSize.height,
        };
        const initialRelativeCircleSize = circleRadius / initialImageSize.width;
        const initialRelativeEllipseSizeX = ellipseRadiuses.x / initialImageSize.width;
        const initialRelativeEllipseSizeY = ellipseRadiuses.y / initialImageSize.height;
        const initialRelativeFontSize = fontSize / initialImageSize.width;
        const initialRelativeRectSize = {
            width: rectSize.width / initialImageSize.width,
            height: rectSize.height / initialImageSize.height,
        };

        const handleResize = () => {
            const newImagePosition = { x: image.x(), y: image.y() };
            const newImageSize = { width: image.width(), height: image.height() };
            setPosition({
                x: initialRelativePosition.x * newImageSize.width + newImagePosition.x,
                y: initialRelativePosition.y * newImageSize.height + newImagePosition.y,
            });
            const newCircleRadius = Math.max(Math.min(initialRelativeCircleSize * newImageSize.width, SHAPE_SIZES.CIRCLE.MAX), SHAPE_SIZES.CIRCLE.MIN);
            setCircleRadius(newCircleRadius);
            const newEllipseRadiusX = Math.max(Math.min(initialRelativeEllipseSizeX * newImageSize.width, SHAPE_SIZES.ELLIPSE.X.MAX), SHAPE_SIZES.ELLIPSE.X.MIN);
            const newEllipseRadiusY = Math.max(Math.min(initialRelativeEllipseSizeY * newImageSize.height, SHAPE_SIZES.ELLIPSE.Y.MAX), SHAPE_SIZES.ELLIPSE.Y.MIN);
            setEllipseRadiuses({ x: newEllipseRadiusX, y: newEllipseRadiusY });
            const newFontSize = Math.max(Math.min(initialRelativeFontSize * newImageSize.width, SHAPE_SIZES.FONT.MAX), SHAPE_SIZES.FONT.MIN);
            setFontSize(newFontSize);
            const newRectWidth = Math.max(Math.min(initialRelativeRectSize.width * newImageSize.width, SHAPE_SIZES.RECT.WIDTH.MAX), SHAPE_SIZES.RECT.WIDTH.MIN);
            const newRectHeight = Math.max(Math.min(initialRelativeRectSize.height * newImageSize.height, SHAPE_SIZES.RECT.HEIGHT.MAX), SHAPE_SIZES.RECT.HEIGHT.MIN);
            setRectSize({ width: newRectWidth, height: newRectHeight });

        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position, imageRef]);

    //console.log(`Shape ${id} is selected: ${isSelected}`);
    const handleOnClick = () => {
        onSelect(id);
        const node = shapeRef.current;
        console.log('Shape Clicked', node);
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

    const dragBoundFunc = (pos) => {
        const stage = shapeRef.current.getStage();
        const { width: stageWidth, height: stageHeight } = stage.size();
        const shape = shapeRef.current;
        const box = shape.getClientRect(); // get bounding box of the shape

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
        ellipseRadiuses,
        circleRadius,
        fontSize,
        rectSize,
        dragBoundFunc
    };

    switch (shapeType) {
        case 'QBoval':
            return <ReceiverOval {...commonProps} text="QB" />;
        case 'RBoval':
            return <ReceiverOval {...commonProps} text="RB" />;
        case 'Xoval':
            return <ReceiverOval {...commonProps} text="X" />;
        case 'Hoval':
            return <ReceiverOval {...commonProps} text="H" />;
        case 'Yoval':
            return <ReceiverOval {...commonProps} text="Y" />;
        case 'Zoval':
            return <ReceiverOval {...commonProps} text="Z" />;
        case 'Lineman':
            return <LinemanOval {...commonProps} />;
        case 'Center':
            return <CenterSquare {...commonProps} />;
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
                        radius={circleRadius}
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