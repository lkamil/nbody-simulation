
export default abstract class Config {
    // Simulation Settings
    static readonly sunMass = 150;
    static readonly planetMass = 20;
    static readonly numberOfPlanets = 4;

    // Inital Planet Positioning
    static readonly minHorizontalAngle = 0;
    static readonly maxHorizontalAngle = 359;
    static readonly minPolarAngle = 0;
    static readonly maxPolarAngle = 180;
    static readonly minDistanceToSun = 50;
    static readonly distanceBetweenPlanets = 5;

    // Simulation Constants
    static readonly softening = 5;
    static readonly G = 1;

    // Time Passing Speed
    static readonly DT = 1;
}