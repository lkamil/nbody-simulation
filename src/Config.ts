
export default abstract class Config {
    // Simulation Settings
    static readonly numberOfPlanets = 10;

    // Inital Planet Positioning
    static readonly minHorizontalAngle = 0;
    static readonly maxHorizontalAngle = 0;
    static readonly minPolarAngle = 0;
    static readonly maxPolarAngle = 360;
    static readonly minDistanceToStar = 100;
    static readonly distanceBetweenPlanets = 20;

    // Simulation Constants
    static readonly softening = 2;
    static readonly G = 1;

    // Time Passing Speed
    static readonly DT = 1;

    static star = {
        color: 0xffff00,
        mass: 500
    }

    static planet = {
        color: 0x555555,
        mass: 10
    }

    static trajectory = {
        color: 0xffffff
    }
}
