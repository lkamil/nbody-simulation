import { degToRad } from 'three/src/math/MathUtils';
import * as THREE from 'three';
import Body from './Body';
import Config from './Config';
import { randomFromInterval, perpendicularOf } from './helper';


export default class NBodySimulation {

    private star: Body;
    private planets: Body[];

    constructor(scene: THREE.Scene) {

        this.star = new Body(Config.sunMass);
        this.planets = this.createPlanets();

        scene.add(this.star.mesh);
        for (let i = 0; i < this.planets.length; i++) {
            scene.add(this.planets[i].mesh);
        }
    }

    update() {
        this.star.update();

        for (let planet of this.planets) {
            planet.update();
        }
    }

    private createPlanets(): Body[] {

        let planets: Body[] = [];

        let d = Config.minDistanceToSun;
        let gap = Config.distanceBetweenPlanets;
        for (let i = 0; i < Config.numberOfPlanets; i++) {
            let horizontalAngle = degToRad(randomFromInterval(Config.minHorizontalAngle, Config.maxHorizontalAngle));
            let polarAngle = degToRad(randomFromInterval(Config.minPolarAngle, Config.maxPolarAngle));

            let x = d * Math.sin(polarAngle) * Math.cos(horizontalAngle);
            let y = d * Math.sin(polarAngle) * Math.sin(horizontalAngle);
            let z = d * Math.cos(polarAngle);

            let r = new THREE.Vector3(x, y, z);
            let v = perpendicularOf(r);

            let planet = new Body(Config.planetMass, r, v);
            console.log(planet);
            planets.push(planet);

            d += gap;
        }

        return planets;
    }
}