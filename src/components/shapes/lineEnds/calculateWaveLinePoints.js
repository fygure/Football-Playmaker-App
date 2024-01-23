// waveLinePoints.js
const calculateWaveLinePoints = (line, controlPoint) => {
    // Calculate the direction of the line
    const dx = line.endPos.x - line.startPos.x;
    const dy = line.endPos.y - line.startPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the direction perpendicular to the line
    const perp_dx = -dy / distance;
    const perp_dy = dx / distance;

    // Define the frequency and amplitude of the waves
    const waves = 12;
    const amplitude = 3;

    // Calculate the number of points based on the distance
    const pointsCount = Math.floor(distance / 5); // Adjust the divisor to change the density of the points

    // Generate the points for the wavy line
    const waveLinePoints = [];
    const cutOffLength = 2.5;
    for (let i = 0; i <= pointsCount; i++) {
        const t = i / pointsCount;
        const wave = amplitude * Math.sin(t * 2 * Math.PI * waves);

        // Calculate the position along the curve defined by the control point
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const p = { x: 0, y: 0 };
        p.x = uu * line.startPos.x; //influence of the starting point
        p.y = uu * line.startPos.y;
        p.x += 2 * u * t * controlPoint.x; //influence of the control point
        p.y += 2 * u * t * controlPoint.y;
        p.x += tt * line.endPos.x; //influence of the end point
        p.y += tt * line.endPos.y;

        // Add the sine wave along the direction perpendicular to the curve
        let x = p.x + perp_dx * wave;
        let y = p.y + perp_dy * wave;

        if (i >= cutOffLength) {
            waveLinePoints.push(x, y);
        }
    }

    return waveLinePoints;
};

export default calculateWaveLinePoints;