// LineContextMenu.jsx
import React from 'react';
import { Group, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';

function LineContextMenu(props) {
    const {
        position,
        onDelete,
        onMouseLeave,
        selectedLineEnd,
        setSelectedLineEnd,
        setStrokeEndButtonPressCount,
    } = props;

    const rectWidth = 60;
    const rectHeight = 30;
    const padding = 8;

    const totalHeight = rectHeight * 3;

    const [arrow] = useImage(process.env.PUBLIC_URL + '/static/assets/end-arrow.png');
    const [dotted] = useImage(process.env.PUBLIC_URL + '/static/assets/end-dotted.png');
    const [straight] = useImage(process.env.PUBLIC_URL + '/static/assets/end-straight.png');
    const [perpendicular] = useImage(process.env.PUBLIC_URL + '/static/assets/end-perpendicular.png');

    //Function to update the state to force a re-render of the same clicked line end button
    const handleStrokeEndButtonPress = () => {
        setStrokeEndButtonPressCount(prevCount => prevCount + 1);
    };

    return (
        <Group
            x={position.x}
            y={position.y}
            onMouseLeave={() => {
                onMouseLeave();
                setSelectedLineEnd('straight');
            }}
        >
            <Rect
                width={rectWidth}
                height={totalHeight}
                fill="transparent"
            //stroke="blue"
            //strokeWidth={5}
            //cornerRadius={10}
            />
            <Group y={0}>
                <Rect
                    width={rectWidth / 2}
                    height={rectHeight}
                    fill={selectedLineEnd === 'arrow' ? '#517388' : "#0D1A22"}
                    stroke="darkgrey"
                    cornerRadius={[10, 0, 0, 0]}
                    shadowBlur={0}
                    shadowColor="#aaa"
                />
                <Image
                    image={arrow}
                    width={rectWidth / 2}
                    height={rectHeight}
                    onClick={() => {
                        setSelectedLineEnd('arrow');
                        handleStrokeEndButtonPress();
                    }} // index 0
                />
                <Rect
                    x={rectWidth / 2}
                    width={rectWidth / 2}
                    height={rectHeight}
                    fill={selectedLineEnd === 'dotted' ? '#517388' : "#0D1A22"}
                    stroke="darkgrey"
                    cornerRadius={[0, 10, 0, 0]}
                    shadowBlur={0}
                    shadowColor="#aaa"
                />
                <Image
                    image={dotted}
                    x={rectWidth / 2}
                    width={rectWidth / 2}
                    height={rectHeight}
                    onClick={() => { setSelectedLineEnd('dotted'); handleStrokeEndButtonPress(); }} // index 2
                />
            </Group>
            <Group y={rectHeight}>
                <Rect
                    width={rectWidth / 2}
                    height={rectHeight}
                    fill={selectedLineEnd === 'straight' ? '#517388' : "#0D1A22"}
                    stroke="darkgrey"
                    cornerRadius={0}
                    shadowBlur={0}
                    shadowColor="#aaa"
                />
                <Image
                    image={straight}
                    width={rectWidth / 2}
                    height={rectHeight}
                    onClick={() => { setSelectedLineEnd('straight'); handleStrokeEndButtonPress(); }} // index 3
                />
                <Rect
                    x={rectWidth / 2}
                    width={rectWidth / 2}
                    height={rectHeight}
                    fill={selectedLineEnd === 'perpendicular' ? '#517388' : "#0D1A22"}
                    stroke="darkgrey"
                    cornerRadius={0}
                    shadowBlur={0}
                    shadowColor="#aaa"
                />
                <Image
                    image={perpendicular}
                    x={rectWidth / 2}
                    width={rectWidth / 2}
                    height={rectHeight}
                    onClick={() => { setSelectedLineEnd('perpendicular'); handleStrokeEndButtonPress(); }} // index 1
                />
            </Group>
            <Group y={rectHeight * 2}>
                <Rect
                    width={rectWidth}
                    height={rectHeight}
                    fill="#0D1A22"
                    stroke="darkgrey"
                    cornerRadius={[0, 0, 10, 10]}
                    shadowBlur={0}
                    shadowColor="#aaa"
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
                    fontSize={12}
                />
            </Group>
        </Group>
    );
}

export default LineContextMenu;