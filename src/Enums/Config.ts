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

    static viewPortColors = {
        orbitColor: new THREE.Color(0x1257af),
        mainBackground: new THREE.Color(0x7F7FB2),
        miniBackground: new THREE.Color(0x7F7FB2),
        topOrbitsBackground: new THREE.Color(0x313235),
        topTrajectoriesBackground: new THREE.Color(0x3F3F52),
        sideOrbitsBackground: new THREE.Color(0x9292b7)
    }
}
