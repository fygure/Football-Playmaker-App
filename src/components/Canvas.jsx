// Canvas.jsx
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer, getAbsolutePosition } from 'react-konva';
import useImage from 'use-image';
import StageDimensionsContext from '../contexts/StageDimensionsContext';
import Shape from './shapes/Shape';
import Konva from 'konva';

function Canvas(props) {
    const {
        imageRef,
        stageRef,
        shapes,
        selectedShapes,
        setSelectedShapes,
        onSelect,
        onChange,
        onDelete,
        onHideContextMenu,
        backgroundImage,
        setStageDimensions
    } = props;

    const { stageDimensions } = useContext(StageDimensionsContext);
    const containerRef = useRef(null);
    const [image] = useImage(backgroundImage);

    const [selectionRect, setSelectionRect] = useState({ x: 0, y: 0, width: 0, height: 0, visible: false });
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });


    useEffect(() => {
        function fitStageIntoParentContainer() {
            if (containerRef.current && stageRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;

                stageRef.current.width(offsetWidth);
                stageRef.current.height(offsetHeight);
                stageRef.current.draw();

                setStageDimensions({ width: offsetWidth, height: offsetHeight });
            }
        }

        function handleResize() {
            fitStageIntoParentContainer();
        }

        fitStageIntoParentContainer();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleImageClick = (e) => {
        console.log('BG Image Clicked', backgroundImage);
        // console.log('Image Dimensions:', image.width, image.height);
        // console.log('Image Position:', imageRef.current.x(), imageRef.current.y());
        // console.log('Image Size:', imageRef.current.width(), imageRef.current.height());
        console.log('Selected Shapes', selectedShapes);
    }

    const handleStageClick = (e) => {
        //console.log('Stage Clicked', stageDimensions);
        console.log('Shapes List:', shapes);
        // if clicked on empty area - remove all selections

    };

    const handleStageMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();
        //console.log('Mouse Down pos', pos);
        setSelectionRect({ x: pos.x, y: pos.y, width: 0, height: 0, visible: true });
        setInitialMousePosition({ x: pos.x, y: pos.y });
    };

    const handleStageMouseMove = (e) => {
        if (!selectionRect.visible) return;
        const pos = e.target.getStage().getPointerPosition();
        setSelectionRect({
            ...selectionRect,
            width: (pos.x - selectionRect.x),
            height: (pos.y - selectionRect.y)
        });
    };

    const handleStageMouseUp = (e) => {
        setSelectionRect({ ...selectionRect, visible: false });
        const pos = e.target.getStage().getPointerPosition();
        // Check each shape to see if it is within the selection rectangle
        const rect = {
            x: Math.min(initialMousePosition.x, pos.x),
            y: Math.min(initialMousePosition.y, pos.y),
            width: Math.abs(initialMousePosition.x - pos.x),
            height: Math.abs(initialMousePosition.y - pos.y),
        };
        // console.log('Mouse Up pos',pos);
        // console.log('rect x', rect.x,'rect y', rect.y );
        const isShapeWithinSelection = (shape, rect) => {
            const shapeX = shape.x !== undefined ? shape.x : shape.initialPosition.x;
            const shapeY = shape.y !== undefined ? shape.y : shape.initialPosition.y;

            const shapeRight = shapeX + shape.width;
            const shapeBottom = shapeY + shape.height;

            const rectRight = rect.x + rect.width;
            const rectBottom = rect.y + rect.height;

            const topLeftIsInside = shapeX >= rect.x && shapeX <= rectRight && shapeY >= rect.y && shapeY <= rectBottom;
            const topRightIsInside = shapeRight >= rect.x && shapeRight <= rectRight && shapeY >= rect.y && shapeY <= rectBottom;
            const bottomLeftIsInside = shapeX >= rect.x && shapeX <= rectRight && shapeBottom >= rect.y && shapeBottom <= rectBottom;
            const bottomRightIsInside = shapeRight >= rect.x && shapeRight <= rectRight && shapeBottom >= rect.y && shapeBottom <= rectBottom;

            return topLeftIsInside || topRightIsInside || bottomLeftIsInside || bottomRightIsInside;

        };
        // Filter shapes that are within the selection rectangle
        const selectedNewShapes = shapes.filter(shape => isShapeWithinSelection(shape, rect));
        //console.log('Selected Shapes', selectedNewShapes);
        setSelectedShapes(selectedNewShapes);
        // console.log('selected shapes', selectedShapes );
    };

    return (
        <>
            <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stage
                    ref={stageRef}
                    width={containerRef.current ? containerRef.current.offsetWidth : 0}
                    height={containerRef.current ? containerRef.current.offsetHeight : 0}
                    onClick={handleStageClick}
                    onMouseDown={handleStageMouseDown}
                    onMouseMove={handleStageMouseMove}
                    onMouseUp={handleStageMouseUp}
                >
                    <Layer>
                        {/* Image tag = background image (field type) */}
                        <Image
                            ref={imageRef}
                            x={stageRef.current ? (stageRef.current.width() - (image ? image.width * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0)) / 2 : 0}
                            y={stageRef.current ? (stageRef.current.height() - (image ? image.height * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0)) / 2 : 0}
                            image={image}
                            width={image ? image.width * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0}
                            height={image ? image.height * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0}
                            onClick={handleImageClick}
                        />
                        {shapes.map((shape) => (
                            <Shape
                                key={shape.id}
                                id={shape.id}
                                shapeType={shape.shapeType}
                                shapes={shapes}
                                initialPosition={shape.initialPosition}
                                initialColor={shape.initialColor}
                                onChange={onChange}
                                onDelete={onDelete}
                                onHideContextMenu={onHideContextMenu}
                                imageRef={imageRef}
                                setSelectedShapes={setSelectedShapes}
                            />
                        ))}
                        {selectionRect.visible && (
                            <Rect
                                x={selectionRect.x}
                                y={selectionRect.y}
                                width={selectionRect.width}
                                height={selectionRect.height}
                                fill="rgba(169, 169, 169, 0.5)"
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
        </>
    );
}
export default Canvas;