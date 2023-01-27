import * as THREE from 'three';
import Config from '../Config';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

export default class Body {

    r: THREE.Vector3; // Position
    private v: THREE.Vector3; // Velocity
    private a: THREE.Vector3; // Accelaration

    private mass: number;

    private label: CSS2DObject;
    mesh: THREE.Mesh;

    events: string[] = [];

    constructor(scene: THREE.Scene, mass: number, r: THREE.Vector3 = new THREE.Vector3(), v: THREE.Vector3 = new THREE.Vector3(), color: THREE.Color = new THREE.Color(Config.planet.color)) {

        this.r = r;
        this.v = v;
        this.a = new THREE.Vector3();

        this.mass = mass;

        this.mesh = this.setupMesh(color);
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        scene.add(this.mesh);

        this.label = this.setupLabel();
    }

    private setupMesh(color: THREE.Color): THREE.Mesh {

        let material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: color });
        const geometry = new THREE.SphereGeometry(1, 10, 10);

        return new THREE.Mesh(geometry, material);
    }

    private setupLabel(): CSS2DObject {
        const planetDiv = document.createElement('div');
        planetDiv.className = "label";
        planetDiv.textContent = "";
        let label = new CSS2DObject(planetDiv);

        this.mesh.add(label);
        return label
    }

    update(bodies: Body[], shift: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) {
        this.updateVectors(bodies, shift);
    }

    updateVectors(bodies: Body[], shift: THREE.Vector3) {

        let newVectors = this.getNewVectors(bodies);

        this.r = newVectors[0].add(shift);
        this.v = newVectors[1].add(shift);
        this.a = newVectors[2].add(shift);

        this.mesh.position.x = this.r.x;
        this.mesh.position.y = this.r.y;
        this.mesh.position.z = this.r.z;
    }

    getNewVectors(bodies: Body[]): THREE.Vector3[] {
        // Kick
        let velocity = this.v.clone().add(this.a.clone().multiplyScalar(Config.DT / 2));

        // Drift
        let newPosition = this.r.clone().add(velocity.clone().multiplyScalar(Config.DT));

        // Acceleration
        let acceleration = this.getAcceleration(bodies, newPosition);

        // Kick
        velocity.add(acceleration.multiplyScalar(Config.DT / 2));

        return [newPosition, velocity, acceleration];
    }

    // Calculates the acceleration of one body relative to all other bodies
    getAcceleration(bodies: Body[], r_new: THREE.Vector3): THREE.Vector3 {

        let acc = new THREE.Vector3();

        // Loop through all elements
        for (let bn of bodies) {

            if (this.equals(bn)) {
                continue;
            }

            let dx = bn.r.x - r_new.x;
            let dy = bn.r.y - r_new.y;
            let dz = bn.r.z - r_new.z;

            if (bn.r.distanceTo(r_new) <= Config.DT) {
                this.events.unshift(`[!] ${bn.label.element.innerText} and ${this.label.element.innerText} crashed into each other.`);
            }
            
            let inv_r3 = Math.pow( (Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2) + Math.pow(Config.softening, 2)), (-1.5));
            

            acc.x += Config.G * (dx * inv_r3) * bn.mass;
            acc.y += Config.G * (dy * inv_r3) * bn.mass;
            acc.z += Config.G * (dz * inv_r3) * bn.mass;
        }
        return acc;
    }

    setLabelText(text: string) {
        this.label.element.innerHTML = text;
        this.events.unshift(`[*] ${this.label.element.innerText} instantiated`);
    }

    private equals(body: Body): Boolean {
        return this.r == body.r && this.v == body.v && this.a == body.a;
    }

    getAndClearCurrentEvents(): Array <string> {
        let currentEvents = this.events;
        this.events = [];
        return currentEvents;
    }
}