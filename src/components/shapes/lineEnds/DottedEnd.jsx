import React from 'react';
import { Circle } from 'react-konva';

const DottedEnd = ({ line, color }) => {
    return (
        <Circle
            x={line.endPos.x}
            y={line.endPos.y}
            radius={5}
            fill={color}
        />
    );
};

export default DottedEnd;