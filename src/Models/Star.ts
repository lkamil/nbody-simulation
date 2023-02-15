import Body from "./Body";
import Config from "../Enums/Config";
import * as THREE from 'three';
import { BodyType } from "../Enums/BodyType";
import { randomFromInterval } from "../Utility/helper";

export default class Star extends Body {
    constructor(scene: THREE.Scene) {
        let r = new THREE.Vector3(0, 0, 0);
        let v = new THREE.Vector3(0, 0, 0);
        let color = new THREE.Color(Config.colors.star);

        const mass = randomFromInterval(Config.star.minMass, Config.star.maxMass);
        super(scene, mass, r, v, BodyType.star, color);

        this.setLabelText("star");
    }
}