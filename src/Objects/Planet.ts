import Body from "./Body";
import Config from "../Config";
import Trajectory from '../Trajectory';
import * as THREE from 'three';
import { ObjectState } from "./ObjectState";

export default class Planet extends Body {

    private trajectory: Trajectory;

    constructor(scene: THREE.Scene, r: THREE.Vector3, v: THREE.Vector3, name: string = "") {
        let color = new THREE.Color(Config.planet.color)
        super(scene, Config.planet.mass, r, v, color);
        
        const trajectoryLength = 2000;
        this.trajectory = new Trajectory(trajectoryLength, scene);

        this.setLabelText(name);
    }

    update(bodies: Body[], shift: THREE.Vector3 = new THREE.Vector3(0, 0, 0)): void {
        this.updateVectors(bodies, shift);

        this.trajectory.addPosition(this.r);
    }

    removeTrajectory(scene: THREE.Scene) {
        scene.remove(this.trajectory.line);

        this.trajectory.line.geometry.dispose();
        // @ts-ignore
        this.trajectory.line.material.dispose();
    }

    checkDistance(starPostion: THREE.Vector3) {
        let threshold = 1500;

        let distToStar = this.r.distanceTo(starPostion);
        if (this.state != ObjectState.away && distToStar > threshold) {
            console.log(this.label.name + " drfited away");
            this.state = ObjectState.away;
            this.events.unshift(`[!] ${this.label.element.innerText} drifted away.`);
        } else if (this.state == ObjectState.away && distToStar < threshold ) {
            this.state = ObjectState.default;
            this.events.unshift(`[!] ${this.label.element.innerText} reentered system.`);
        }
    }
}