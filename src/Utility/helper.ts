import * as THREE from 'three';
import { RAND } from './Randomizer';

function randomFromInterval(min: number, max: number): number {
    return RAND.number() * (max - min) + min;
}

// Calculate a vector that is perpendicular to a given vector
function perpendicularOf(v: THREE.Vector3): THREE.Vector3 {
    // choose arbitrary values for y and z and calculate x
    let y2 = 1;
    let z2 = 2;

    if (-v.x == 0) {
        console.log("[!] Cannot devide by 0!");
        return new THREE.Vector3();
    }

    let x2 = ((v.y * y2) + (v.z * z2)) / (-v.x);

    let v_perp = new THREE.Vector3(x2, y2, z2);

    // make sure all vectors have the same direction
    if (v.x > 0) {
        v_perp.multiplyScalar(-1);
    }

    return v_perp.normalize();
}

function vectorFromSphericalCoords(distance: number, horizontalAngle: number, polarAngle: number): THREE.Vector3 {

    let x = distance * Math.sin(polarAngle) * Math.cos(horizontalAngle);
    let y = distance * Math.sin(polarAngle) * Math.sin(horizontalAngle);
    let z = distance * Math.cos(polarAngle);

    return new THREE.Vector3(x, y, z);
}

function printVector(v: THREE.Vector3) {
    console.log("x: " + v.x + ", y: " + v.y + ", z: " + v.z);
}

function msToSeconds(ms: number): number {
    return ms / 1000;
}

function deviation(currentValue: number, previousValue: number | undefined): number | undefined {
    if (previousValue == undefined) {
        return undefined;
    }
    const diff = Math.abs(previousValue - currentValue);

    return (diff / previousValue) * 100;
}

export {
    deviation,
    msToSeconds,
    randomFromInterval,
    perpendicularOf,
    printVector,
    vectorFromSphericalCoords
}
