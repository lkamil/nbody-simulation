import Body from "./Body";
import Config from "../Config";
import Trajectory from '../Trajectory';
import * as THREE from 'three';

export default class Planet extends Body {

    private trajectory: Trajectory;

    constructor(scene: THREE.Scene, r: THREE.Vector3, v: THREE.Vector3, name: string = "") {
        super(scene, Config.planet.mass, r, v);

        this.mesh.material.color = new THREE.Color(Config.planet.color);

        const trajectoryLength = 3000;
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
        this.trajectory.line.material.dispose();
    }
}