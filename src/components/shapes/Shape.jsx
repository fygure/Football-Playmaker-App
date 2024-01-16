// Shape.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import CenterSquare from './shapeType/CenterSquare';
import LinemanOval from './shapeType/LinemanOval';
import ReceiverOval from './shapeType/ReceiverOval';
import DefenderDiamond from './shapeType/DefenderDiamond';
import { set, throttle } from 'lodash';

// Shape Sizes Configuration
const SHAPE_SIZES = {
    CIRCLE: { MIN: 10, MAX: 30 },
    ELLIPSE: { X: { MIN: 8, MAX: 18 }, Y: { MIN: 5, MAX: 12 } },
    FONT: { MIN: 6, MAX: 13 },
    RECT: { WIDTH: { MIN: 10, MAX: 28 }, HEIGHT: { MIN: 10, MAX: 28 } },
    DIAMOND: { WIDTH: { MIN: 10, MAX: 28 }, HEIGHT: { MIN: 10, MAX: 28 } },
};

function Shape(props) {
    const {
        lines,
        setLines,
        startDrawing,
        setIsMouseDownOnAnchor,
        shapes,
        id,
        shapeType,
        initialPosition,
        initialColor,
        onShapeChange,
        onShapeDelete,
        onLineDelete,
        onHideContextMenu,
        imageRef,
        stageRef,
        setSelectedShapes,
        selectedShapeID,
        setSelectedShapeID,
        hasBeenSelected,
        setHasBeenSelected,
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
    const [diamondSize, setDiamondSize] = useState({
        width: SHAPE_SIZES.DIAMOND.WIDTH.MAX,
        height: SHAPE_SIZES.DIAMOND.HEIGHT.MAX
    }); // initial diamond size

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
        const initialRelativeDiamondSize = {
            width: diamondSize.width / initialImageSize.width,
            height: diamondSize.height / initialImageSize.height,
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
            const newDiamondWidth = Math.max(Math.min(initialRelativeDiamondSize.width * newImageSize.width, SHAPE_SIZES.DIAMOND.WIDTH.MAX), SHAPE_SIZES.DIAMOND.WIDTH.MIN);
            const newDiamondHeight = Math.max(Math.min(initialRelativeDiamondSize.height * newImageSize.height, SHAPE_SIZES.DIAMOND.HEIGHT.MAX), SHAPE_SIZES.DIAMOND.HEIGHT.MIN);
            setDiamondSize({ width: newDiamondWidth, height: newDiamondHeight });

        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position, imageRef]);

    const selectedShape = useMemo(() => shapes.find(shape => shape.id === id), [shapes, id]);
    const handleOnClick = () => {
        setSelectedShapes([]);
        console.log('Shape Clicked', selectedShape);
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
        // Delete all lines associated with the shape
        lines.forEach((line) => {
            if (line.attachedShapeId === id) {
                onLineDelete(line.id);
            }
        });


    };

    const handleDragStart = () => {
        setShowContextMenu(false);
    };


    const handleDragMove = throttle((e) => {
        const newPos = e.target.position();
        setPosition(newPos);
        //onShapeChange(id, { x: e.target.x(), y: e.target.y() });
        const attachedLines = lines.filter(line => line.attachedShapeId === id);

        // Update start pos of line to new pos
        const updatedLines = attachedLines.map(line => ({
            ...line,
            startPos: newPos,
        }));

        // Updates startPos of only lines attached to shape
        setLines(lines.map(line => updatedLines.find(l => l.id === line.id) || line));
    }, 100); // Update at most once every 100ms

    const handleDragEnd = (e) => {
        //console.log(e.target.position());
        const newPos = e.target.position();
        setPosition(newPos);
        onShapeChange(id, { x: e.target.x(), y: e.target.y() });
        //setHistory([...history, { action : drag,  get shape object by id }]);
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
        startDrawing,
        setIsMouseDownOnAnchor,
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
        handleDragMove,
        handleDragEnd,
        handleHideContextMenu,
        ellipseRadiuses,
        circleRadius,
        fontSize,
        rectSize,
        diamondSize,
        dragBoundFunc,
        selectedShapeID,
        setSelectedShapeID,
        handleTextChange,
        setHasBeenSelected,
        hasBeenSelected,
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