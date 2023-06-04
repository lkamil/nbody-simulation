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
        orbitColor: new THREE.Color(0x9f84ec), // 0x0E00FC, 0xebcd9c
        planet: new THREE.Color(0xa3a3a3),
        star: new THREE.Color(0xffffff),
        starLight: new THREE.Color(0xffffff),
        trajectory: {
            r: 0.05,
            g: 0,
            b: 0.98
        },
        planetesimal: new THREE.Color(0x95af9b), // 3e3e3e
        // Backgrounds
        mainBackground: new THREE.Color(0xE1E0DC),
        miniBackground: new THREE.Color(0xDEDCD6),
        topOrbitsBackground: new THREE.Color(0xEFEEE7),
        topTrajectoriesBackground: new THREE.Color(0xC7C7C1),
        sideOrbitsBackground: new THREE.Color(0xDEDCD6)
    }
}

// red / organge:
// r: 0.92,
// g: 0.41,
// b: 0.2

// orange
// r: 0.97,
// g: 0.54,
// b: 0.27 

 //red: 0.97,  grey: 86 => 0.33,
 //red: 0.27, // grey: 80 => 0.31,
  // red: 0.26 // grey: 76 => 0.29,

// blue
// r: 0.05,
// g: 0,
// b: 0.98