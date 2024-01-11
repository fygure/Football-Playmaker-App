//LoadedLayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import TextTag from './TextTag';
// import useImage from 'use-image';

const LoadedLayer = (props) => {
    const {
        currentLayerData,
        stageRef,
        // imageRef,
        image,
        containerRef,
        handleImageClick,
    } = props;

    const imageRef = useRef(null);
    //FIXME: rendering image based on currentLayerData, problem is in useBackground and stencil
    //const [image] = useImage(currentLayerData.backgroundImage);

    //TESTING
    useEffect(() => {
        console.log('currentLayerData:', currentLayerData);
    }, [currentLayerData]);

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
                    text={currentLayerData.name}
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