import React, { useRef } from "react";
import { Circle } from "react-konva";

function dragBounds(ref) {
    if (ref.current !== null) {
        return ref.current.getAbsolutePosition();
    }
    return {
        x: 0,
        y: 0,
    };
}

export function Anchor({ x, y, onMouseDown, onMouseMove }) {
    const anchor = useRef(null);
    return (
        <Circle
            x={x}
            y={y}
            radius={3}
            stroke="silver"
            fill="blue"
            onClick={(e) => { console.log('Anchor Clicked'); }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            dragBoundFunc={() => dragBounds(anchor)}
            perfectDrawEnabled={true}
            ref={anchor}
        />
    );
}
