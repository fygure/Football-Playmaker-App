// Canvas.jsx
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer} from 'react-konva';
import useImage from 'use-image';
import StageDimensionsContext from '../contexts/StageDimensionsContext';
import Shape from './shapes/Shape';
import Konva from 'konva';

function Canvas(props) {
    const {
        setStageDimensions,
        shapes,
        selectedId,


        selectedShapeIds,
        setSelectedShapeIds,


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


    const [selectionRectangle, setSelectionRectangle] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
 

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

    const handleStageMouseDown = (e) => {
        // Start selection
        if (e.target === e.target.getStage()) {
            const pos = e.target.getPointerPosition();
            setSelectionRectangle({ x: pos.x, y: pos.y, width: 0, height: 0 });
            setIsSelecting(true);
        }
    };

    const handleStageMouseMove = (e) => {
        // Update selection rectangle size
        if (!isSelecting || !selectionRectangle) return;
        const pos = e.target.getPointerPosition();
        setSelectionRectangle(rect => ({
            ...rect,
            width: pos.x - rect.x,
            height: pos.y - rect.y
        }));
    };

    const handleStageMouseUp = () => {
        // Finish selection
        setIsSelecting(false);

        // Check which shapes are within the selection rectangle
        if (selectionRectangle) {
            const selectedIds = shapes.filter(shape => {
                onSelect(shape);
                const shapePos = shape.initialPosition;
                return (
                    shapePos.x >= selectionRectangle.x &&
                    shapePos.x <= selectionRectangle.x + selectionRectangle.width &&
                    shapePos.y >= selectionRectangle.y &&
                    shapePos.y <= selectionRectangle.y + selectionRectangle.height
                );
            }).map(shape => shape.id);
    
            setSelectedShapeIds(...selectedShapeIds,...selectedIds);
        }
    };



    const handleStageClick = (e) => {
        console.log(shapes);
        console.log(backgroundImage)
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
                    onMouseDown={handleStageMouseDown}
                    onMouseMove={handleStageMouseMove}
                    onMouseUp={handleStageMouseUp}
                    onClick={handleStageClick}

                >
                    <Layer>
                        <Image
                            image={image}
                            width={containerRef.current ? containerRef.current.offsetWidth : 0}
                            height={containerRef.current ? containerRef.current.offsetHeight : 0}
                            onClick={() => { onSelect(null); console.log('Background Clicked'); console.log(stageDimensions); }}
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
                            />
                        ))}
                        {isSelecting && selectionRectangle && (
                            <Rect
                                x={selectionRectangle.x}
                                y={selectionRectangle.y}
                                width={selectionRectangle.width}
                                height={selectionRectangle.height}
                                stroke="black"
                                dash={[2, 2]}
                            />
                        )}

                    </Layer>
                </Stage>
            </div>
        </>
    );
}
export default Canvas;