import Body from "./Body";
import Config from "../Config";
import * as THREE from 'three';

export default class Star extends Body {
    constructor(scene: THREE.Scene) {
        let r = new THREE.Vector3(0, 0, 0);
        let v = new THREE.Vector3(0, 0, 0);
        let color = new THREE.Color(Config.star.color)
        super(scene, Config.star.mass, r, v, color);

        this.setLabelText("star");
    }
}