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

export function Anchor({ x, y, id, onDragMove, onDragEnd, onDragStart }) {
    const anchor = useRef(null);
    return (
        <Circle
            x={x}
            y={y}
            radius={3}
            stroke="silver"
            fill="blue"
            //draggable (uncomment to add functionality)
            onClick={(e) => { console.log('Anchor Clicked'); }}
            onDragStart={(e) => { console.log('onDragStart'); }}
            onDragMove={(e) => { console.log('onDragMove'); }}
            onDragEnd={(e) => { console.log('onDragEnd'); }}
            dragBoundFunc={() => dragBounds(anchor)}
            perfectDrawEnabled={false}
            ref={anchor}
        />
    );
}
