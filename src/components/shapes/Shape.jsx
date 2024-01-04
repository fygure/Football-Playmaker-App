// Shape.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Star, Rect, Circle, Ring } from 'react-konva';
import ContextMenu from '../menus/ContextMenu';
import CenterSquare from './shapeType/CenterSquare';
import LinemanOval from './shapeType/LinemanOval';
import ReceiverOval from './shapeType/ReceiverOval';
import DefenderDiamond from './shapeType/DefenderDiamond';

// Shape Sizes Configuration
const SHAPE_SIZES = {
    CIRCLE: { MIN: 10, MAX: 30 },
    ELLIPSE: { X: { MIN: 8, MAX: 18 }, Y: { MIN: 5, MAX: 12 } },
    FONT: { MIN: 6, MAX: 13 },
    RECT: { WIDTH: { MIN: 10, MAX: 28 }, HEIGHT: { MIN: 10, MAX: 28 } },
};

function Shape(props) {
    const {
        shapes,
        id,
        shapeType,
        initialPosition,
        initialColor,
        onShapeChange,
        onShapeDelete,
        onHideContextMenu,
        imageRef,
        stageRef,
        setSelectedShapes,
        selectedShapeID,
        setSelectedShapeID,
        history,
        setHistory,
        historyStep,
        setHistoryStep
    } = props;

    const shapeRef = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [circleRadius, setCircleRadius] = useState(SHAPE_SIZES.CIRCLE.MAX); // initial circle radius
    const [ellipseRadiuses, setEllipseRadiuses] = useState({
        x: SHAPE_SIZES.ELLIPSE.X.MAX,
        y: SHAPE_SIZES.ELLIPSE.Y.MAX
    }); // initial ellipse radii
    const [fontSize, setFontSize] = useState(SHAPE_SIZES.FONT.MAX);
    const [rectSize, setRectSize] = useState({
        width: SHAPE_SIZES.RECT.WIDTH.MAX,
        height: SHAPE_SIZES.RECT.HEIGHT.MAX
    }); // initial rectangle size

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

    const handleOnClick = () => {
        // const node = shapeRef.current;
        //First empty the selectedShapes array
        setSelectedShapes([]);
        //Filter the shapes array to grab the shape by the id
        const selectedShape = shapes.find(shape => shape.id === id);
        console.log('Shape Clicked', selectedShape);
        //Then add that shape to the selectedShapes array
        setSelectedShapes([selectedShape]);
        setSelectedShapeID(id);
        console.log('Selected Shape ID:', id);
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
        onShapeDelete(id);
    };

    const handleDragStart = () => {
        setShowContextMenu(false);
    };

    const handleDragEnd = (e) => {
        //console.log(e.target.position());
        setPosition(e.target.position());
        onShapeChange(id, { x: e.target.x(), y: e.target.y() });
    
        setHistory((prevHistory) => [
            ...prevHistory,
            { actionType: 'move', shapeID: id},
        ])
        // console.log(`History is: ${history.forEach((item) => console.log(item))})}`)
    };

    const handleHideContextMenu = () => {
        setShowContextMenu(false);
    }

    const handleTextChange = (newText) => {
        onShapeChange(id, { text: newText });
    };

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
        id,
        shapeRef,
        imageRef,
        stageRef,
        position,
        initialColor,
        showContextMenu,
        contextMenuPosition,
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
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID,
        handleTextChange,
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
        case 'DefenderC':
            return <DefenderDiamond {...commonProps} text="C" />;
        case 'Defender$':
            return <DefenderDiamond {...commonProps} text="$" />;
        case 'DefenderM':
            return <DefenderDiamond {...commonProps} text="M" />;
        case 'DefenderW':
            return <DefenderDiamond {...commonProps} text="W" />;
        case 'DefenderE':
            return <DefenderDiamond {...commonProps} text="E" />;
        case 'DefenderN':
            return <DefenderDiamond {...commonProps} text="N" />;
        case 'DefenderT':
            return <DefenderDiamond {...commonProps} text="T" />;
        case 'DefenderJ':
            return <DefenderDiamond {...commonProps} text="J" />;
        case 'DefenderSS':
            return <DefenderDiamond {...commonProps} text="SS" />;
        case 'DefenderWS':
            return <DefenderDiamond {...commonProps} text="WS" />;
        case 'OffenseExtra':
            return <ReceiverOval {...commonProps} text="XT" />;
        case 'DefenseExtra':
            return <DefenderDiamond {...commonProps} text="XT" />;
        default:
            return () => { console.error('Shape.jsx: Shape Type not found'); }
    }
}
export default Shape;