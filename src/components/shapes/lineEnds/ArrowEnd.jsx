import React from 'react';
import { Arrow } from 'react-konva';

const ArrowEnd = ({ line, controlPoint, color }) => {
    // Calculate the tangent of the curve at the end point
    let t = 1; // The parameter at the end point is 1
    let dx2 = (1 - t) * (controlPoint.x - line.startPos.x) + t * (line.endPos.x - controlPoint.x);
    let dy2 = (1 - t) * (controlPoint.y - line.startPos.y) + t * (line.endPos.y - controlPoint.y);
    let angle = Math.atan2(dy2, dx2) * 180 / Math.PI;

    // Convert the angle to the range 0 to 360 degrees
    if (angle < 0) {
        angle += 360;
    }


    // Ensure the angle is still in the range 0 to 360 degrees
    if (angle >= 360) {
        angle -= 360;
    }

    // Calculate the position of the arrow
    let x = line.endPos.x + 10 * Math.cos(angle * Math.PI / 180);
    let y = line.endPos.y + 10 * Math.sin(angle * Math.PI / 180);

    return (
        <Arrow
            points={[line.endPos.x, line.endPos.y, x, y]}
            pointerLength={9}
            pointerWidth={7}
            fill={color}
            stroke={color}
        />
    );
};

export default ArrowEnd;