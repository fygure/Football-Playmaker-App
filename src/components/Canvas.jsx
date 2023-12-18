// Canvas.jsx
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';
import StageDimensionsContext from '../contexts/StageDimensionsContext';
import Shape from './shapes/Shape';
import Konva from 'konva';

function Canvas(props) {
    const {
        imageRef,
        setStageDimensions,
        shapes,
        selectedId,
        onSelect,
        onChange,
        onDelete,
        onHideContextMenu,
        backgroundImage
    } = props;

    const { stageDimensions } = useContext(StageDimensionsContext);
    const stageRef = useRef(null);
    const containerRef = useRef(null);
    const [image] = useImage(backgroundImage);


  
    const [selectionRect, setSelectionRect] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        visible: false,
    });
    const handleMouseDown = (e) => {
        // Prevent accidental shape selection when dragging
        if (e.target === stageRef.current || e.target.attrs.className === 'Transformer') {
            setSelectionRect({
                x: stageRef.current.getPointerPosition().x,
                y: stageRef.current.getPointerPosition().y,
                width: 0,
                height: 0,
                visible: true,
            });
        }
    };

    // Handle mouse move event to update the selection rectangle
    const handleMouseMove = () => {
        if (selectionRect.visible) {
            const pointerPos = stageRef.current.getPointerPosition();
            const width = pointerPos.x - selectionRect.x;
            const height = pointerPos.y - selectionRect.y;

            setSelectionRect({
                ...selectionRect,
                width,
                height,
            });
        }
    };

    // Handle mouse up event to finish drawing the selection rectangle
    const handleMouseUp = () => {
        if (selectionRect.visible) {
            const shapesToSelect = shapes.filter((shape) => {
                const shapeX = shape.initialPosition.x;
                const shapeY = shape.initialPosition.y;

                return (
                    shapeX >= selectionRect.x &&
                    shapeX + shape.width <= selectionRect.x + selectionRect.width &&
                    shapeY >= selectionRect.y &&
                    shapeY + shape.height <= selectionRect.y + selectionRect.height
                );
            });

            onSelectMultiple(shapesToSelect);
            setSelectionRect({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                visible: false,
            });
        }
    };
    const [selectedShapeIds, setSelectedShapeIds] = useState([]);

     const onSelectMultiple = (shapesToSelect) => {
        // Get the IDs of the shapes to select
        const newSelectedShapeIds = shapesToSelect.map((shape) => shape.id);

        // Update the state to store the selected shape IDs
        setSelectedShapeIds(newSelectedShapeIds);
    };

    useEffect(() => {
        // Add event listeners for mouse move and mouse up events
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [selectionRect]);



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

                >
                    <Layer>
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
            

                    </Layer>
                </Stage>
            </div>
        </>
    );
}
export default Canvas;