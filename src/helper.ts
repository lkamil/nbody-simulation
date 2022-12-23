import * as THREE from 'three';

function randomFromInterval(min: number, max: number): number {
    return Math.random() * (max - min) + min
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

export {
    randomFromInterval,
    perpendicularOf
}
