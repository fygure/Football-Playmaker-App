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
                fill="#f0f0f0" // Light gray background color
                stroke="#888" // Gray border color
                cornerRadius={5} // Rounded corners
                shadowBlur={5}
                shadowColor="#aaa" // Shadow color
            />
            <Text
                text="Delete"
                width={rectWidth}
                height={rectHeight}
                padding={padding}
                align="center"
                verticalAlign="middle"
                onClick={onDelete}
                fill="#333" // Text color
                fontFamily="Arial" // Specify a font family
                fontSize={14} // Specify a font size
            />
        </Group>
    );
}

export default ContextMenu;