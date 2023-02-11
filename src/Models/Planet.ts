import Body from "./Body";
import Config from "../Enums/Config";
import Trajectory from "./Trajectory";
import * as THREE from 'three';
import { ObjectState } from "../Enums/ObjectState";
import { SimulationEvent, DistanceEvent } from "../Enums/SimulationEvent";
import { BodyType } from "../Enums/BodyType";
import { randomFromInterval } from "../Utility/helper";

export default class Planet extends Body {

    private trajectory: Trajectory;

    state: ObjectState;

    constructor(scene: THREE.Scene, r: THREE.Vector3, v: THREE.Vector3, name: string = "") {
        let color = new THREE.Color(Config.planet.color);
        let mass = randomFromInterval(Config.planet.minMass, Config.planet.maxMass);
        super(scene, mass, r, v, BodyType.planet, color);
        
        const trajectoryLength = 3000;
        this.trajectory = new Trajectory(trajectoryLength, scene);

        this.state = ObjectState.default
        this.setLabelText(name);
    }

    /* -------------- PUBLIC METHODS -------------- */

    update = (bodies: Body[], shift: THREE.Vector3 = new THREE.Vector3(0, 0, 0)): void => {

        if (this.state != ObjectState.crashed) {
            let newValues = super.getNewVectors(bodies);
            this.events = newValues.events
            this.handleEvents.call(this, this.events);
            
            super.updateVectors(newValues, shift);
            this.trajectory.addPosition(this.r);
        }
    }

    removeTrajectory(scene: THREE.Scene) {
        scene.remove(this.trajectory.line);

        this.trajectory.line.geometry.dispose();
        // @ts-ignore
        this.trajectory.line.material.dispose();
    }

    checkDistance(starPostion: THREE.Vector3): void {

        let distToStar = this.r.distanceTo(starPostion);
        if (this.state != ObjectState.away && distToStar > Config.outOfSystemThreshold) {
            this.state = ObjectState.away;

            let event: DistanceEvent = { object: this, kind: "driftedAway" }
            this.events.unshift(event);
        } else if (this.state == ObjectState.away && distToStar < Config.outOfSystemThreshold) {
            this.state = ObjectState.default;

            let event: DistanceEvent = { object: this, kind: "reentered" }
            this.events.unshift(event);
        }
    }

    /* -------------- PRIVATE METHODS ------------- */

    private handleEvents = (events: SimulationEvent[]) => {
        events.forEach(e => {
            switch (e.kind) {
                case "collision":
                    this.state = ObjectState.crashed;
                    this.halt();
                    break
    
                case "default":
        
                    if (this.state != ObjectState.crashed) {
                        this.state = ObjectState.default;
                    }
                    break
    
                case "driftedAway":
                    this.state = ObjectState.away;
                    break
        
                case "reentered":
                    this.state = ObjectState.default;
                    break
            }
        });
    }
    
    private halt() {
        super.v = new THREE.Vector3();
        super.a = new THREE.Vector3();
    }
}