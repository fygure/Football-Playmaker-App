// Canvas.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import useImage from 'use-image';
import useLines from '../hooks/useLines';
import useTextTags from '../hooks/useTextTags';
//import StageDimensionsContext from '../contexts/StageDimensionsContext';
import Shape from './shapes/Shape';
import TextTag from './shapes/TextTag';
import CustomLine from './shapes/CustomLine';
function Canvas(props) {
    const {
        startPos,
        endPos,
        lines,
        setLines,
        onLineChange,
        startDrawing,
        draw,
        stopDrawing,
        deleteAllLines,
        colorButtonPressCount,
        strokeTypeButtonPressCount,
        strokeEndButtonPressCount,
        onLineDelete,
        imageRef,
        stageRef,
        shapes,
        selectedShapes,
        setSelectedShapes,
        onSelect,
        onShapeChange,
        onShapeDelete,
        textTags,
        selectedTextTags,
        setSelectedTextTags,
        onTextTagChange,
        onTextTagDelete,
        onHideTextTagContextMenu,
        onHideContextMenu,
        selectedColor,
        selectedLineStroke,
        selectedLineEnd,
        backgroundImage,
        setStageDimensions,
        orientation,
    } = props;

    //const { stageDimensions } = useContext(StageDimensionsContext);
    const containerRef = useRef(null);
    const [image] = useImage(backgroundImage);
    const [isMouseDownOnAnchor, setIsMouseDownOnAnchor] = useState(false);
    const [selectedShapeID, setSelectedShapeID] = useState('$');
    const [selectedTextTagID, setSelectedTextTagID] = useState('$');
    const [selectedLineID, setSelectedLineID] = useState('$');

    const deselectShape = () => setSelectedShapeID('$');
    const deselectTextTag = () => setSelectedTextTagID('$');

    const updateSelectedTextTagsColor = (newColor) => {
        selectedTextTags.forEach(tag => {
            onTextTagChange(tag.id, { color: newColor });
        });
    };

    useEffect(() => {
        updateSelectedTextTagsColor(selectedColor);
    }, [selectedColor]);


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
        console.log('Selected Text Tags', selectedTextTags);
        deselectShape();
        deselectTextTag();
        setSelectedTextTags([]);
        setSelectedLineID('$');
    }

    const handleStageClick = (e) => {
        //console.log('Stage Clicked', stageDimensions);
        console.log('Shapes List:', shapes);
        console.log('Text Tags List:', textTags);
        console.log('Lines List:', lines);
        // if clicked on empty area - remove all selections
        if (e.target === e.target.getStage()) {
            //setSelectedShapes([]);
            deselectShape();
            deselectTextTag();
            setSelectedTextTags([]);
            setSelectedLineID('$');
        }
    };

    // const handleStageMouseDown = (e) => {
    //     const pos = e.target.getStage().getPointerPosition();
    //     console.log('Mouse Down pos', pos);
    // };

    //draws the line
    const handleStageMouseMove = (e) => {
        //console.log(e);
        if (isMouseDownOnAnchor && e.evt.buttons === 1) {
            const pos = e.target.getStage().getPointerPosition();
            console.log('Stage onMouseMove', pos);
            draw(pos);
        }
    };

    //completes drawing the line
    const handleStageMouseUp = (e) => {
        const endPos = e.target.getStage().getPointerPosition();
        console.log('Stage onMouseUp', endPos);
        console.log('Selected Line ID:', selectedLineID);
        stopDrawing();
        setIsMouseDownOnAnchor(false);
    };

    return (
        <>
            <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stage
                    ref={stageRef}
                    width={containerRef.current ? containerRef.current.offsetWidth : 0}
                    height={containerRef.current ? containerRef.current.offsetHeight : 0}
                    onClick={handleStageClick}
                    //onMouseDown={handleStageMouseDown}
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
                        {/* Sorting causes lines to render later */}
                        {lines.sort((a, b) => (a.id === selectedLineID ? 1 : -1)).map((line, index) => (
                            <CustomLine
                                key={line.id}
                                id={line.id}
                                line={line}
                                lines={lines}
                                color={line.color}
                                colorButtonPressCount={colorButtonPressCount}
                                strokeTypeButtonPressCount={strokeTypeButtonPressCount}
                                strokeEndButtonPressCount={strokeEndButtonPressCount}
                                selectedColor={selectedColor}
                                selectedLineStroke={selectedLineStroke}
                                selectedLineEnd={selectedLineEnd}
                                onLineDelete={onLineDelete}
                                onLineChange={onLineChange}
                                setLines={setLines}
                                selectedLineID={selectedLineID}
                                setSelectedLineID={setSelectedLineID}
                                setIsMouseDownOnAnchor={setIsMouseDownOnAnchor}
                                startDrawing={startDrawing}
                                stageRef={stageRef}
                                imageRef={imageRef}
                            />
                        ))}
                        {shapes.map((shape) => (
                            <Shape
                                lines={lines}
                                setLines={setLines}
                                setIsMouseDownOnAnchor={setIsMouseDownOnAnchor}
                                startDrawing={startDrawing}
                                key={shape.id}
                                id={shape.id}
                                shapeType={shape.shapeType}
                                shapes={shapes}
                                initialPosition={shape.initialPosition}
                                initialColor={shape.initialColor}
                                onShapeChange={onShapeChange}
                                onShapeDelete={onShapeDelete}
                                onLineDelete={onLineDelete}
                                onHideContextMenu={onHideContextMenu}
                                stageRef={stageRef}
                                imageRef={imageRef}
                                setSelectedShapes={setSelectedShapes}
                                selectedShapeID={selectedShapeID} setSelectedShapeID={setSelectedShapeID}
                            />
                        ))}
                        {textTags.map((textTag) => (
                            <TextTag
                                key={textTag.id}
                                id={textTag.id}
                                text={textTag.text}
                                textTags={textTags}
                                initialPosition={textTag.initialPosition}
                                selectedColor={selectedColor}
                                color={textTag.color}
                                onTextTagChange={onTextTagChange}
                                onTextTagDelete={onTextTagDelete}
                                onHideTextTagContextMenu={onHideTextTagContextMenu}
                                imageRef={imageRef}
                                setSelectedTextTags={setSelectedTextTags}
                                selectedTextTagID={selectedTextTagID} setSelectedTextTagID={setSelectedTextTagID}
                            />
                        ))}
                        {/* drawing line */}
                        {startPos && endPos && (
                            <Line
                                points={[startPos.x, startPos.y, endPos.x, endPos.y]}
                                stroke="#7393B3"
                                strokeWidth={4}
                                tension={0.5}
                                lineCap="round"
                            />
                        )}


                    </Layer>
                </Stage>
            </div>
        </>
    );
}
export default Canvas;