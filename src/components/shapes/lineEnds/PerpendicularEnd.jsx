import React from 'react';
import { Rect } from 'react-konva';

const PerpendicularEnd = ({ line, controlPoint, color }) => {
    // Calculate the tangent of the curve at the end point
    let t = 1; // The parameter at the end point is 1
    let dx2 = (1 - t) * (controlPoint.x - line.startPos.x) + t * (line.endPos.x - controlPoint.x);
    let dy2 = (1 - t) * (controlPoint.y - line.startPos.y) + t * (line.endPos.y - controlPoint.y);
    let angle = Math.atan2(dy2, dx2) * 180 / Math.PI;

    // Convert the angle to the range 0 to 360 degrees
    if (angle < 0) {
        angle += 360;
    }

    // Add 90 degrees to the angle to make the rectangle perpendicular to the line
    angle += 90;

    // Ensure the angle is still in the range 0 to 360 degrees
    if (angle >= 360) {
        angle -= 360;
    }

    return (
        <Rect
            x={line.endPos.x}
            y={line.endPos.y - 1}
            width={10}
            height={2}
            fill={color}
            rotation={angle}
            offsetX={5}
            offsetY={1}
        />
    );
};

export default PerpendicularEnd;