import * as THREE from 'three';

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

    constructor(r: THREE.Vector3, v: THREE.Vector3, mass: number) {

        let acc_x: number = Math.random();
        let acc_y: number = Math.random();
        let acc_z: number = Math.random();

        this.r = r;
        this.v = v;
        this.a = new THREE.Vector3(acc_x, acc_y, acc_z);

        this.r_new = r;
        this.v_new = v;
        this.a_new = this.a;

        this.mass = mass;

        // Planet Geometry
        const geometry = new THREE.SphereGeometry(0.8, 10, 10);
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