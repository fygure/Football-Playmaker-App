import React from 'react';
import { Arrow } from 'react-konva';

const ArrowEnd = ({ line, controlPoint, color, handleLineClick }) => {
    let t = 1;
    let dx2 = (1 - t) * (controlPoint.x - line.startPos.x) + t * (line.endPos.x - controlPoint.x);
    let dy2 = (1 - t) * (controlPoint.y - line.startPos.y) + t * (line.endPos.y - controlPoint.y);
    let angle = Math.atan2(dy2, dx2) * 180 / Math.PI;

    if (angle < 0) {
        angle += 360;
    }

    if (angle >= 360) {
        angle -= 360;
    }

    let x = line.endPos.x + 10 * Math.cos(angle * Math.PI / 180);
    let y = line.endPos.y + 10 * Math.sin(angle * Math.PI / 180);

    return (
        <Arrow
            points={[line.endPos.x, line.endPos.y, x, y]}
            pointerLength={9}
            pointerWidth={7}
            fill={color}
            stroke={color}
            onClick={handleLineClick}
        />
    );
};

export default ArrowEnd;