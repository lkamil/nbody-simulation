import Body from "./Body";
import * as THREE from 'three';
import { BodyType } from "../Enums/BodyType";
import Config from "../Enums/Config";

export default class Planetesimal extends Body {
    constructor(scene: THREE.Scene, mass: number, r: THREE.Vector3, v: THREE.Vector3) {
        let color = new THREE.Color(Config.planetesimal.color);
        super(scene, mass, r, v, BodyType.planetesimal, color);
    }
}