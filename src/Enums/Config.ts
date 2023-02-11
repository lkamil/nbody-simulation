
export default abstract class Config {
    // Simulation Settings
    static readonly numberOfPlanets = 10;
    static readonly numberOfPlanetesimals = 100;
    static readonly runTime = 200;
    static readonly outOfSystemThreshold = 1500;

    // Inital Planet Positioning
    static readonly minHorizontalAngle = 0;
    static readonly maxHorizontalAngle = 0;
    static readonly minPolarAngle = 0;
    static readonly maxPolarAngle = 360;
    static readonly minDistanceToStar = 100;
    static readonly maxDistanceToStar = 300;
    static readonly distanceBetweenPlanets = 20;

    // Initial Planetesimal Positioning
    static readonly minPlanetesimalMass = 0.05;
    static readonly maxPlanetesimalMass = 0.1;

    // Simulation Constants
    static readonly softening = 4;
    static readonly G = 1;

    // Time Passing Speed
    static readonly DT = 1;

    static star = {
        color: 0xffffe0,
        mass: 300
    }

    static planet = {
        color: 0x555555,
        minMass: 1,
        maxMass: 5
    }

    static trajectory = {
        color: 0xffffff
    }

    static planetesimal = {
        color: 0x3e3e3e
    }
}
