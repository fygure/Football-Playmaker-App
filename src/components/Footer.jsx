// Footer.jsx
import React, { useState, useRef, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import { Group } from 'react-konva';
import Play from '../components/plays/Play';
function Footer(props){
    const {
        plays,
        appState,
        // stageData,
        onAddPlay,
        OnPlayDelete,
        onDeleteAllPlays,
        onPlayChange,
    } = props;



  const [selectedPlayID, setSelectedPlayID] = useState("$");
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Tab') {
                event.preventDefault();

                const currentIndex = plays.findIndex(play => play.id === selectedPlayID);
                let nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;

                // If nextIndex is -1, set it to the last index
                if (nextIndex < 0) {
                  nextIndex = plays.length - 1;
                }
                // If nextIndex is equal to the length of the array, set it to the first index
                else if (nextIndex === plays.length) {
                  nextIndex = 0;
                }

                setSelectedPlayID(plays[nextIndex].id);
              }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
              document.removeEventListener('keydown', handleKeyDown);
            };
    }, [plays, selectedPlayID]);

    const handleAddPlay = (playName) => {
        // onAddPlay(playName);
        console.log('Add Play Clicked');
    }

    const handleDeleteAllPlays = () => {
        // onDeleteAllPlays();
        console.log('Delete All Plays Clicked');
    }

    //Use stencil as reference to handleAddPlay and handleDeleteAllPlays
    return (
        <>

<MenuIcon style={{ marginLeft: '-13px' }} />


        {/* <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 20, right: 1800 }}
        icon={<SpeedDialIcon/>}
        >
        </SpeedDial> */}



        {/* {plays.map((play) => (
            <Play
                key={play.id}
                id={play.id}
                plays={plays}
                appState={appState}
                onPlayChange={onPlayChange}
                OnPlayDelete={OnPlayDelete}
                selectedPlayID={selectedPlayID} setSelectedPlayID={setSelectedPlayID}
            />
        ))} */}

        </>
    );
}
export default Footer;