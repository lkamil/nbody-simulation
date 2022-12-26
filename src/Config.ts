
export default abstract class Config {
    static readonly sunMass = 500;
    static readonly planetMass = 20;

    static readonly numberOfPlanets = 5;

    static readonly minHorizontalAngle = 0;
    static readonly maxHorizontalAngle = 359;
    static readonly minPolarAngle = 0;
    static readonly maxPolarAngle = 180;
    static readonly minDistanceToSun = 0.001;
    static readonly distanceBetweenPlanets = 0.001;
}