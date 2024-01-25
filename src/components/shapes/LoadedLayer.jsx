//LoadedLayer.jsx
import React, { useState, useEffect } from 'react';
import { Layer, Text, Image, Line } from 'react-konva';
import TextTag from './TextTag';
import Shape from './Shape';
import CustomLine from './CustomLine';
// import useImage from 'use-image';

const LoadedLayer = (props) => {
    const {
        currentLayerData,
        stageRef,
        imageRef,
        image,
        containerRef,
        handleImageClick,
        textTags,
        selectedColor,
        onTextTagChange,
        onTextTagDelete,
        onHideTextTagContextMenu,
        setSelectedTextTags,
        selectedTextTagID,
        setSelectedTextTagID,
        shapes,
        lines,
        setLines,
        setIsMouseDownOnAnchor,
        startDrawing,
        onShapeChange,
        onShapeDelete,
        onLineDelete,
        onHideContextMenu,
        setSelectedShapes,
        selectedShapeID,
        setSelectedShapeID,
        startPos,
        endPos,
        selectedLineID,
        setSelectedLineID,
        colorButtonPressCount,
        strokeTypeButtonPressCount,
        strokeEndButtonPressCount,
        setStrokeTypeButtonPressCount,
        setStrokeEndButtonPressCount,
        onLineChange,
        selectedLineStroke,
        selectedLineEnd,
        setSelectedLineEnd,
        hasBeenSelected,
        setHasBeenSelected,
    } = props;
    const [oldPlayNamePos, setOldPlayNamePos] = useState({ x: 0, y: 0 });
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        setOldPlayNamePos(playNamePos);
        setImageLoaded(false);
    }, [image]);

    //simulate image loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setImageLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [image]);

    const middlePosition = {
        x: imageRef.current.x() + (imageRef.current.width() / 2),
        y: imageRef.current.height() / 2
    };

    const imageSize = {
        width: imageRef.current.width(),
        height: imageRef.current.height()
    };

    const playNamePos = imageLoaded
        ? { x: middlePosition.x - imageSize.width * 0.47, y: middlePosition.y - imageSize.height * 0.475 }
        : oldPlayNamePos;

    // console.log('here:', playNamePos);
    //TESTING
    useEffect(() => {
        console.log('currentLayerData:', currentLayerData);
    }, [currentLayerData]);

    //Used for when field selection is changed
    // const [playNamePos, setPlayNamePos] = useState({ x: 0, y: 0 });

    //NOTE: if x and y are undefined, use initialPosition else use x and y
    return (
        <>
            <Layer>
                <Image
                    ref={imageRef}
                    x={stageRef.current ? (stageRef.current.width() - (image ? image.width * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0)) / 2 : 0}
                    y={stageRef.current ? (stageRef.current.height() - (image ? image.height * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0)) / 2 : 0}
                    image={image}
                    width={image ? image.width * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0}
                    height={image ? image.height * (containerRef.current ? containerRef.current.offsetHeight / image.height : 0) : 0}
                    onClick={handleImageClick}
                />
                {/* Play Name Text */}
                <Text
                    text={currentLayerData.name}
                    x={playNamePos.x}
                    y={playNamePos.y}
                    textDecoration='none'
                    fontSize={22}
                    fontStyle='bold'
                    fontFamily='Inter, sans-serif'
                    fill={'black'}
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
                        setStrokeTypeButtonPressCount={setStrokeTypeButtonPressCount}
                        setStrokeEndButtonPressCount={setStrokeEndButtonPressCount}
                        selectedColor={selectedColor}
                        selectedLineStroke={selectedLineStroke}
                        selectedLineEnd={selectedLineEnd}
                        setSelectedLineEnd={setSelectedLineEnd}
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
                        hasBeenSelected={hasBeenSelected}
                        setHasBeenSelected={setHasBeenSelected}
                        lines={lines}
                        setLines={setLines}
                        setIsMouseDownOnAnchor={setIsMouseDownOnAnchor}
                        startDrawing={startDrawing}
                        key={shape.id}
                        id={shape.id}
                        shapeType={shape.shapeType}
                        shapes={shapes}
                        initialPosition={shape.x && shape.y ? { x: shape.x, y: shape.y } : shape.initialPosition}
                        initialColor={shape.initialColor}
                        onShapeChange={onShapeChange}
                        onShapeDelete={onShapeDelete}
                        onLineDelete={onLineDelete}
                        onHideContextMenu={onHideContextMenu}
                        stageRef={stageRef}
                        imageRef={imageRef}
                        setSelectedShapes={setSelectedShapes}
                        selectedShapeID={selectedShapeID}
                        setSelectedShapeID={setSelectedShapeID}
                    />
                ))}
                {textTags.map((textTag) => (
                    <TextTag
                        key={textTag.id}
                        id={textTag.id}
                        text={textTag.text}
                        textTags={textTags}
                        initialPosition={textTag.x && textTag.y ? { x: textTag.x, y: textTag.y } : textTag.initialPosition}
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
        </>
    )
}

export default LoadedLayer;