// ContextMenu.jsx
import React from 'react';
import { Group, Rect, Text } from 'react-konva';

function ContextMenu(props) {
    const {
        position,
        onDelete,
        onMouseLeave
    } = props;

    const rectWidth = 100;
    const rectHeight = 30;
    const padding = 8;

    return (
        <Group
            x={position.x}
            y={position.y}
            onMouseLeave={onMouseLeave}
        >
            <Rect
                width={rectWidth}
                height={rectHeight}
                fill="#0D1A22"
                stroke="darkgrey"
                cornerRadius={10}
            />
            <Text
                text="Delete"
                width={rectWidth}
                height={rectHeight}
                padding={padding}
                align="center"
                verticalAlign="middle"
                onClick={onDelete}
                fill="white"
                fontFamily="Inter, sans-serif"
                fontSize={14}
            />
        </Group>
    );
}

export default ContextMenu;