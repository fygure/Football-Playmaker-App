//LoadedLayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';

const LoadedLayer = (props) => {
    const imageRef = useRef(null);

    const {
        currentLayerData,
        stageRef,
        containerRef,
        image,
        handleImageClick,
    } = props;


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
                <Text
                    text={currentLayerData.playName}
                    x={50}
                    y={50}
                    fontSize={15}
                    fontWeight={12}
                    fill={'black'}
                />
            </Layer>
        </>
    )
}

export default LoadedLayer;