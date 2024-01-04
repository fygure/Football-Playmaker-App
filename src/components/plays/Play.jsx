import React, { useState, useRef, useEffect } from 'react';
import { Group } from 'react-konva';

function Play(props)
{
    const {
        plays,
        id,
        appState,
        onPlayChange,
        onPlayDelete,
        selectedPlayID,
        setSelectedPlayID,
    } = props

    const playRef = useRef();

    const handleOnClick = () => {
        setSelectedPlayID("$");
        const selectedPlay = plays.find(play => play.id === id);
        if (selectedPlay) {
            console.log('Play Clicked', selectedPlay);
        }
        setSelectedPlayID(id);
    }
    const handleDeletePlay = () => {
        onPlayDelete(id);
    }

    const handlePlayNameChange = (newPlayName) => {
        onPlayChange(id, {playName: newPlayName});
    }
    return (
        <>
            <Group
                onClick={handleOnClick}
                onDeletePlay={handleDeletePlay}
                onPlayNameChange={handlePlayNameChange}
                ref = {playRef}
                appState={appState}
            >





            {selectedPlayID === id}
            </Group>
        </>
    );

}
export default Play;