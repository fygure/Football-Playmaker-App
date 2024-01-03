import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import theme from '../config/theme';
function useFooter(appState) {
    const initialPlay = {
        id: uuidv4(),
        playName: 'Play 1',
        shapes: appState.shapes,
        textTags: appState.textTags,
        selectedColor: appState.selectedColor,
        backgroundImage: appState.backgroundImage,
        fieldType: appState.fieldType,
        zone: appState.zone,
        redline: appState.redLine,
    }


    const [plays, setPlays] = useState([initialPlay]);

    const addPlay = (playName) => {

        const newPlay = {
            id: uuidv4(),
            playName: playName,
            shapes:[],
            textTags: [],
            selectedColor: theme.palette.pitchBlack.main,
            backgroundImage: process.env.PUBLIC_URL + '/static/assets/field_college_middle.png',
            fieldType: 'college',
            zone: 'middle',
            redline: false,
        };
        setPlays([...plays, newPlay]);
    }
    const deletePlay = (id) => {
        setPlays(plays.filter(play => play.id !== id));
    }

    const deleteAllPlays = () => {
        setPlays([]);
    }

    const updatePlay = (id, newAttributes) => {
        setPlays(plays.map(play => play.id === id ? { ...play, ...newAttributes } : play));
    };


    return { plays, addPlay, deletePlay, deleteAllPlays, updatePlay };
}
export default useFooter;

