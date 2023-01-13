
export default abstract class Config {
    // Simulation Settings
    static readonly numberOfPlanets = 5;

    // Inital Planet Positioning
    static readonly minHorizontalAngle = 0;
    static readonly maxHorizontalAngle = 359;
    static readonly minPolarAngle = 0;
    static readonly maxPolarAngle = 180;
    static readonly minDistanceToSun = 50;
    static readonly distanceBetweenPlanets = 1;

    // Simulation Constants
    static readonly softening = 5;
    static readonly G = 1;

    // Time Passing Speed
    static readonly DT = 0.2;

    static sun = {
        color: 0xffff00,
        mass: 150
    }

    static planet = {
        color: 0x9872ff,
        mass: 20
    }
}
