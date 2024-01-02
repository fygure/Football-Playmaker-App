import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function useFooter() {

    const [plays, setPlays] = useState([]);

    const addPlay = (playName) => {

        const newPlay = {
            id: uuidv4(),
            playName: playName,
        };
        setPlays([...plays, newPlay]);
    }
    const removePlay = (id) => {
        setPlays(plays.filter(play => play.id !== id));
    }

    const removeAllPlays = () => {
        setPlays([]);
    }
    const updatePlayName = (id, newPlayName) => {
        setPlays(plays.map(play => play.id === id ? { ...play, playName: newPlayName } : play));
      };


    return { plays, addPlay, removePlay, removeAllPlays, updatePlayName };
}
export default useFooter;

