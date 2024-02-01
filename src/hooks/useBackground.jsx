// useBackground.jsx
import { useState, useEffect } from 'react';
import waterMarkIcon from '../components/assets/chlk-watermark.png';

function useBackground() {
    const [backgroundImage, setBackgroundImage] = useState(process.env.PUBLIC_URL + '/static/assets/field_college_middle.png');
    const [fieldType, setFieldType] = useState('college');
    const [zone, setZone] = useState('middle');
    const [redLine, setRedLine] = useState(false);
    const [waterMark, setWatermark] = useState(null);


    useEffect(() => {
        const changeBackground = () => {
            let newImage = `field_${fieldType}_${zone}`;
            if (redLine && (fieldType === 'nfl' || fieldType === 'college')) {
                newImage += '_redline';
              }
            newImage += '.png';
            setBackgroundImage(process.env.PUBLIC_URL + '/static/assets/' + newImage);
        };
          const img = new window.Image();
        img.src = waterMarkIcon;
        img.onload = () => {
            setWatermark(img);
        };

        changeBackground();
    }, [fieldType, zone, redLine]);

    return { backgroundImage, fieldType, setFieldType, setZone, zone, setRedLine, redLine, waterMark, setWatermark };
}

export default useBackground;
