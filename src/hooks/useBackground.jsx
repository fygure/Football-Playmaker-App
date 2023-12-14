// useBackground.jsx
import { useState, useEffect } from 'react';

function useBackground() {
    const [backgroundImage, setBackgroundImage] = useState(process.env.PUBLIC_URL + '/static/assets/field_college_middle.png');
    const [fieldType, setFieldType] = useState('college');
    const [zone, setZone] = useState('middle');
    const [redLine, setRedLine] = useState(false);

    //Background Handlers
    const changeBackground = () => {
        let newImage = `field_${fieldType}_${zone}`;
        if (redLine && fieldType === 'nfl') {
            newImage += '_redline';
        }
        newImage += '.png';
        setBackgroundImage(process.env.PUBLIC_URL + '/static/assets/' + newImage);
    };

    useEffect(() => { changeBackground(); }, [fieldType, zone, redLine]);

    return { backgroundImage, setFieldType, setZone, setRedLine };
}

export default useBackground;
