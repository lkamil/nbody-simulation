import * as THREE from 'three';

export default abstract class Config {

    static readonly framerate = 40;
    // Simulation Settings
    static readonly numberOfPlanets = 10;
    static readonly numberOfPlanetesimals = 100;
    static readonly runTime = 100;
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
            XZ: new THREE.Color(0x7c84cc),
            YZ: new THREE.Color(0x408c9c),
        },
        orbitColor: new THREE.Color(0x1257af),
        planet: new THREE.Color(0x00c284),
        star: new THREE.Color(0xffffe0),
        starLight: new THREE.Color(0xffffff),
        trajectory: {
            r: 0,
            g: 0.76,
            b: 0.52
            // 00c284
        },
        planetesimal: new THREE.Color(0x357d5b), // 3e3e3e
        // Backgrounds
        mainBackground: new THREE.Color(0x3f3c48),
        miniBackground: new THREE.Color(0x3d3c41),
        topOrbitsBackground: new THREE.Color(0x313235),
        topTrajectoriesBackground: new THREE.Color(0x57565e),
        sideOrbitsBackground: new THREE.Color(0x9292b7)
    }
}
