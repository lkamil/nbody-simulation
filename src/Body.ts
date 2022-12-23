import * as THREE from 'three';
import { randomFromInterval } from './helper';

export default class Body {

    r: THREE.Vector3; // Position
    v: THREE.Vector3; // Velocity
    a: THREE.Vector3; // Accelaration

    r_new: THREE.Vector3;
    v_new: THREE.Vector3;
    a_new: THREE.Vector3;

    mass: number;

    // Display Properties
    mesh: THREE.Mesh

    constructor(mass: number, r: THREE.Vector3 = new THREE.Vector3(), v: THREE.Vector3 = new THREE.Vector3()) {

        let acc_x: number = randomFromInterval(-0.003, 0.003);
        let acc_y: number = randomFromInterval(-0.002, 0.002);
        let acc_z: number = randomFromInterval(-0.002, 0.002);

        this.r = r;
        this.v = new THREE.Vector3(acc_x, acc_y, acc_z);
        this.a = new THREE.Vector3();

        this.r_new = this.r;
        this.v_new = this.v;
        this.a_new = this.a;

        this.mass = mass;

        // Planet Geometry
        const geometry = new THREE.SphereGeometry(0.01, 10, 10);
        const material = new THREE.MeshLambertMaterial();

        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
    }

    update() {
        this.v.add(this.a)
        this.r.add(this.v)

        this.mesh.position.x = this.r.x
        this.mesh.position.y = this.r.y
        this.mesh.position.z = this.r.z
    }
}