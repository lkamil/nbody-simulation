import Body from "./Body";
import * as THREE from 'three';
import { BodyType } from "../Enums/BodyType";

export default class Planetesimal extends Body {
    constructor(scene: THREE.Scene, mass: number, r: THREE.Vector3, v: THREE.Vector3) {
        super(scene, mass, r, v);
        super.bodytype = BodyType.planetesimal;
    }
}