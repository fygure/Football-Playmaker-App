// Footer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Footer(props){
    const {
        id,
        plays,
        appState,
        // stageData,
        selectedPlayID,
        setSelectedPlayID,
        onAddPlay,
        onPlayDelete,
        onDeleteAllPlays,
        onPlayChange,
    } = props;

    useEffect(() => {
        // This code will run whenever appState changes
        console.log('appState changed:', appState);
    }, [appState]);

    const handleAddPlay = (playName) => {
        onAddPlay(playName);
    }
    const handleDeletePlay = () => {
        onPlayDelete(id);
    }
    const handleDeleteAllPlays = () => {
        onDeleteAllPlays();
    }

    const handlePlayNameChange = (newPlayName) => {
        onPlayChange(id, {playName: newPlayName});
    }

    const handleOnClick = () => {
        setSelectedPlayID("$");
        const selectedPlay = plays.find(play => play.id === id);
        setSelectedPlayID(selectedPlay.id);
    }





}
export default Footer;