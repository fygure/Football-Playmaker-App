// Footer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Footer(props){
    const {
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
    const handleDeletePlay = (id) => {
        onPlayDelete(id);
    }
    const handleDeleteAllPlays = () => {
        onDeleteAllPlays();
    }

    const handlePlayNameChange = (id, newPlayName) => {
        onPlayChange(id, {playName: newPlayName});
    }





}
export default Footer;