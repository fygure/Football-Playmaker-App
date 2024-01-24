import React from 'react';
import { Circle } from 'react-konva';

const DottedEnd = ({ line, color, handleLineClick }) => {
    return (
        <Circle
            x={line.endPos.x}
            y={line.endPos.y}
            radius={5}
            fill={color}
            onClick={handleLineClick}
        />
    );
};

export default DottedEnd;