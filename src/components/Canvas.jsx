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
        shapes,
        selectedId,
        selectedShapeIds,
        setSelectedShapeIds,
        onSelect,
        onChange,
        onDelete,
        onHideContextMenu,
        backgroundImage,
        setStageDimensions
    } = props;

    const { stageDimensions } = useContext(StageDimensionsContext);
    const stageRef = useRef(null);
    const containerRef = useRef(null);
    const [image] = useImage(backgroundImage);

    const [selectionRect, setSelectionRect] = useState({ x: 0, y: 0, width: 0, height: 0, visible: false });

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


    useEffect(() => {
        console.log('Selected Shape IDs:', selectedShapeIds);
    }, [selectedShapeIds]);


    const handleStageClick = (e) => {
        console.log('Stage Dimensions:', stageDimensions);
        console.log('Shapes List:', shapes);
        console.log('Background Image:', backgroundImage);
        console.log('Image Dimensions:', image.width, image.height);
        console.log('Image Position:', imageRef.current.x(), imageRef.current.y());
        console.log('Image Size:', imageRef.current.width(), imageRef.current.height());
        console.log(imageRef.current);
        // if clicked on empty area - remove all selections
        //console.log(e);
        if (e.target === e.target.getStage()) {
            onSelect(null);
        }
    };

    return (
        <>
            <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stage
                    ref={stageRef}
                    width={containerRef.current ? containerRef.current.offsetWidth : 0}
                    height={containerRef.current ? containerRef.current.offsetHeight : 0}
                    onClick={handleStageClick}
                    onMouseDown={(e) => {
                        const pos = e.target.getStage().getPointerPosition();
                        console.log('pos',pos);
                        setSelectionRect({ x: pos.x, y: pos.y, width: 0, height: 0, visible: true });
                    }}

                    onMouseMove={(e) => {
                        if (!selectionRect.visible) return;
                        const pos = e.target.getStage().getPointerPosition();
                        // console.log('selection Rect pos',pos);
                        // console.log('selection Rect x: ', pos.x - selectionRect.x);
                        // console.log('selection Rect y: ', selectionRect.y - pos.y );
                        setSelectionRect({
                            ...selectionRect,
                            width: (pos.x - selectionRect.x),
                            height:(pos.y - selectionRect.y)
                        });
                    }}
                    //NEED TO FIX THIS!!!!
                    //Top left: -,-, Top right: +,-, Bottom left: -,+, Bottom right: +,+
                    //if the shapes have not been moved since initialized,
                    // then the x and y of each shape is referred to as shape.initialPosition.x and shape.initialPosition.y
                    // if the shapes have been moved, then the current position is that shape.x and shape.y
                    onMouseUp={() => {
                        setSelectionRect({ ...selectionRect, visible: false });
                        // Check each shape to see if it is within the selection rectangle
                        const newSelectedShapeIds = shapes.filter(shape => {
                                // Adjust the selection rectangle to always have positive width and height
                                const adjustedSelectionRect = {
                                    x: selectionRect.width < 0 ? selectionRect.x + selectionRect.width : selectionRect.x,
                                    y: selectionRect.height < 0 ? selectionRect.y + selectionRect.height : selectionRect.y,
                                    width: Math.abs(selectionRect.width),
                                    height: Math.abs(selectionRect.height),
                                };
                                console.log(selectionRect.x + selectionRect.width);
                                 //X pos is fine, Y pos is not it's inverted!!!
                                console.log('adj rect x:', adjustedSelectionRect.x);
                                console.log('adj rect y:', adjustedSelectionRect.y);
                                // console.log('adj rect width:', adjustedSelectionRect.width);
                                // console.log(' adj rect height:', adjustedSelectionRect.height);
                                
                            // Check if the shape has been moved
                            const shapeX = shape.x !== undefined ? shape.x : shape.initialPosition.x;
                            const shapeY = shape.y !== undefined ? shape.y : shape.initialPosition.y;
                                // console.log('shape x:', shapeX);
                                // console.log('shape y:', shapeY);
                            // Check if the shape's position is within the adjusted selection rectangle
                            return (
                                shapeX < adjustedSelectionRect.x + adjustedSelectionRect.width &&
                                shapeX + shape.width > adjustedSelectionRect.x &&
                                shapeY < adjustedSelectionRect.y + adjustedSelectionRect.height &&
                                shapeY + shape.height > adjustedSelectionRect.y
                            );
                        }).map(shape => shape.id);

                        console.log('New Selected Shape IDs:', newSelectedShapeIds);
                        // Create a new set from the existing selectedShapeIds (unique IDs)
                        const selectedShapeIdsSet = new Set(selectedShapeIds);
                        // Add the new selected shape IDs
                        newSelectedShapeIds.forEach((id) => {
                            selectedShapeIdsSet.add(id);
                        });
                        console.log(selectedShapeIdsSet);
                        setSelectedShapeIds(Array.from(selectedShapeIdsSet));
                        
                    }}
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
                            onClick={() => { onSelect(null); console.log('Background Clicked'); }}
                        />
                        {shapes.map((shape) => (
                            <Shape
                                key={shape.id}
                                id={shape.id}
                                shapeType={shape.shapeType}
                                initialPosition={shape.initialPosition}
                                initialColor={shape.initialColor}
                                isSelected={shape.id === selectedId}
                                onSelect={onSelect}
                                onChange={onChange}
                                onDelete={onDelete}
                                onHideContextMenu={onHideContextMenu}
                                imageRef={imageRef}
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