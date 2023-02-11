import * as THREE from 'three';
import Config from '../Enums/Config';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import {DistanceEvent, Collision, Default, SimulationEvent} from '../Enums/SimulationEvent'
import EventDescription from '../Enums/EventDescriptions';
import { BodyType } from '../Enums/BodyType';

interface NewValues {
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    acceleration: THREE.Vector3,
    events: SimulationEvent[]
}

export default class Body {

    r: THREE.Vector3; // Position
    v: THREE.Vector3; // Velocity
    a: THREE.Vector3; // Accelaration

    mass: number;

    label: CSS2DObject;
    mesh: THREE.Mesh;
    bodytype: BodyType

    events: SimulationEvent[] = [];

    constructor(scene: THREE.Scene, mass: number, r: THREE.Vector3 = new THREE.Vector3(), v: THREE.Vector3 = new THREE.Vector3(), bodyType: BodyType = BodyType.planet, color: THREE.Color = new THREE.Color(Config.planet.color)) {

        this.r = r;
        this.v = v;
        this.a = new THREE.Vector3();

        this.bodytype = bodyType;

        this.mass = mass;

        this.mesh = this.setupMesh(color);
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        scene.add(this.mesh);

        this.label = this.setupLabel();
    }

    /* -------------- PUBLIC METHODS -------------- */

    removeLabel() {
        this.label.element.parentNode?.removeChild(this.label.element);
    }

    update(bodies: Body[], shift: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) {

        let newValues = this.getNewVectors(bodies);
        this.updateVectors(newValues, shift);
    }

    updateVectors(newValues: NewValues, shift: THREE.Vector3) {

        this.r = newValues.position.add(shift);
        this.v = newValues.velocity;
        this.a = newValues.acceleration;

        // TODO: HANDLE EVENTS

        this.mesh.position.x = this.r.x;
        this.mesh.position.y = this.r.y;
        this.mesh.position.z = this.r.z;
    }

    getNewVectors(bodies: Body[]): NewValues {
        // Kick
        let velocity = this.v.clone().add(this.a.clone().multiplyScalar(Config.DT / 2));

        // Drift
        let newPosition = this.r.clone().add(velocity.clone().multiplyScalar(Config.DT));

        // Acceleration
        let acc = this.getAcceleration(bodies, newPosition)
        let acceleration = acc[0];
        let events = acc[1];

        // Kick
        velocity.add(acceleration.multiplyScalar(Config.DT / 2));

        return {position: newPosition, velocity: velocity, acceleration: acceleration, events: events}
    }

    // Calculates the acceleration of one body relative to all other bodies
    getAcceleration(bodies: Body[], r_new: THREE.Vector3): [THREE.Vector3, SimulationEvent[]] {

        let acc = new THREE.Vector3();
        let events: SimulationEvent[] = [];

        // Loop through all elements
        for (let bn of bodies) {

            if (this.equals(bn)) {
                continue;
            }

            let dx = bn.r.x - r_new.x;
            let dy = bn.r.y - r_new.y;
            let dz = bn.r.z - r_new.z;

            if (bn.bodytype != BodyType.planetesimal && bn.r.distanceTo(r_new) <= Config.DT) {
                let collision: Collision = {object: this, objectN: bn, kind: "collision"}
                events.push(collision);
            }
            
            let inv_r3 = Math.pow( (Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2) + Math.pow(Config.softening, 2)), (-1.5));
            
            acc.x += Config.G * (dx * inv_r3) * bn.mass;
            acc.y += Config.G * (dy * inv_r3) * bn.mass;
            acc.z += Config.G * (dz * inv_r3) * bn.mass;
        }
        return [acc, events];
    }

    setLabelText(text: string) {
        this.label.element.innerHTML = text;
        // this.events.unshift(`[*] ${this.label.element.innerText} instantiated`);
    }

    getAndClearCurrentEvents(): Array <string> {
        let currentEvents = this.events;
        this.events = [];

        let descriptons: string[] = [];
        currentEvents.forEach(e => {
            descriptons.unshift(EventDescription.getDescriptionOf(e));
        });
        return descriptons;
    }

    /* ------------------- SETUP ------------------ */

    private setupMesh(color: THREE.Color): THREE.Mesh {

        let material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: color });
        const geometry = new THREE.SphereGeometry(1, 15, 15);

        if (this.bodytype == BodyType.star) {
            let scale = 0.015;
            geometry.scale(this.mass * scale, this.mass * scale, this.mass * scale);
        } else if (this.bodytype == BodyType.planetesimal) {
            let scale = 10;
            geometry.scale(this.mass * scale, this.mass * scale, this.mass * scale);
        } else {
            let scale = 0.7;
            geometry.scale(this.mass * scale, this.mass * scale, this.mass * scale);
        }
        
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

    /* ------------------ HELPER ------------------ */

    private equals(body: Body): Boolean {
        return this.r == body.r && this.v == body.v && this.a == body.a;
    }

}