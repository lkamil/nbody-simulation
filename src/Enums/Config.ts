import * as THREE from 'three';

export default abstract class Config {

    static readonly framerate = 40;
    // Simulation Settings
    static readonly numberOfPlanets = 10;
    static readonly numberOfPlanetesimals = 50;
    static readonly runTime = 100;
    static readonly outOfSystemThreshold = 1500;

    // Inital Planet Positioning
    static readonly minHorizontalAngle = 0;
    static readonly maxHorizontalAngle = 0;
    static readonly minPolarAngle = 0;
    static readonly maxPolarAngle = 360;
    static readonly minDistanceToStar = 130;
    static readonly maxDistanceToStar = 330;
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
        minMass: 150,
        maxMass: 400,
    }

    static planet = {
        minMass: 1,
        maxMass: 10
    }

    static colors = {
        grid: {
            XY: new THREE.Color(0x4287f5),
            XZ: new THREE.Color(0x9f84ec),
            YZ: new THREE.Color(0x408c9c),
        },
        orbitColor: new THREE.Color(0x1257af),
        planet: new THREE.Color(0xa3a3a3),
        star: new THREE.Color(0xffffe0),
        starLight: new THREE.Color(0xffffff),
        trajectory: {
            r: 0.9,
            g: 0.9,
            b: 0.9
            // 00c284
        },
        planetesimal: new THREE.Color(0x95af9b), // 3e3e3e
        // Backgrounds
        mainBackground: new THREE.Color(0x514e5a),
        miniBackground: new THREE.Color(0x514e5a),
        topOrbitsBackground: new THREE.Color(0x38383a),
        topTrajectoriesBackground: new THREE.Color(0x434259),
        sideOrbitsBackground: new THREE.Color(0x9292b7) // 0x9292b7, 0x727297
    }
}
