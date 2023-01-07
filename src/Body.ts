import * as THREE from 'three';
import Config from './Config';
import { BodyType } from './BodyType';

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

    constructor(type: BodyType, r: THREE.Vector3 = new THREE.Vector3(), v: THREE.Vector3 = new THREE.Vector3()) {

        this.r = r;
        this.v = v;
        this.a = new THREE.Vector3();

        this.r_new = this.r;
        this.v_new = this.v;
        this.a_new = this.a;

        this.mass = (type == BodyType.sun) ? Config.sun.mass : Config.planet.mass;

        this.mesh = this.setupMesh(type);
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
    }

    private setupMesh(type: BodyType): THREE.Mesh {

        let material: THREE.MeshLambertMaterial
        switch (type as BodyType) {
            case BodyType.sun:
                material = new THREE.MeshLambertMaterial({ color: new THREE.Color(Config.sun.color) });
                break

            case BodyType.planet:
                material = new THREE.MeshLambertMaterial({ color: new THREE.Color(Config.planet.color) });
                break
        }  

        // Planet Geometry
        const geometry = new THREE.SphereGeometry(1, 10, 10);

        return new THREE.Mesh(geometry, material);
    }

    update(bodies: Body[]) {
        // Kick
        this.v_new.add(this.a_new.clone().multiplyScalar(Config.DT / 2));

        // Drift
        this.r_new.add(this.v_new.clone().multiplyScalar(Config.DT));

        // Update Acc
        this.a_new = this.getAcceleration(bodies);

        // Kick
        this.v_new.add(this.a_new.clone().multiplyScalar(Config.DT / 2));

        this.r = this.r_new;
        this.v = this.v_new;
        this.a = this.a_new;

        this.mesh.position.x = this.r.x;
        this.mesh.position.y = this.r.y;
        this.mesh.position.z = this.r.z;
    }

    // Calculates the acceleration of one body relative to all other bodies
    getAcceleration(bodies: Body[]): THREE.Vector3 {

        let acc = new THREE.Vector3();

        // Loop through all elements
        for (let bn of bodies) {

            if (this.equals(bn)) {
                continue;
            }

            let dx = bn.r.x - this.r_new.x;
            let dy = bn.r.y - this.r_new.y;
            let dz = bn.r.z - this.r_new.z;
            
            let inv_r3 = Math.pow( (Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2) + Math.pow(Config.softening, 2)), (-1.5));

            acc.x += Config.G * (dx * inv_r3) * bn.mass;
            acc.y += Config.G * (dy * inv_r3) * bn.mass;
            acc.z += Config.G * (dz * inv_r3) * bn.mass;
        }
        return acc;
    }

    equals(body: Body): Boolean {
        return this.r == body.r && this.v == body.v && this.a == body.a;
    }
}