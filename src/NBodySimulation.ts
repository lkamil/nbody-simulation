import { degToRad } from 'three/src/math/MathUtils';
import * as THREE from 'three';
import Body from './Objects/Body';
import Config from './Config';
import { randomFromInterval, perpendicularOf } from './Utility/helper';
import Planet from './Objects/Planet';
import Star from './Objects/Star';


export default class NBodySimulation {

    private star: Body;
    private planets: Planet[];

    constructor(scene: THREE.Scene) {

        this.star = new Star(scene);
        this.planets = this.createPlanets(scene);
    }

    update() {

        // Keep sun centered
        let newSunPosition = this.star.getNewVectors(this.planets)[0];

        let shift = newSunPosition.clone().negate();

        this.star.update(this.planets, shift);

        for (let planet of this.planets) {
            planet.update(this.bodies(), shift);
        }
    }

    private createPlanets(scene: THREE.Scene): Planet[] {

        let planets: Planet[] = [];

        let d = Config.minDistanceToStar;
        let gap = Config.distanceBetweenPlanets;
        for (let i = 0; i < Config.numberOfPlanets; i++) {

            let horizontalAngle = degToRad(randomFromInterval(Config.minHorizontalAngle, Config.maxHorizontalAngle));
            let polarAngle = degToRad(randomFromInterval(Config.minPolarAngle, Config.maxPolarAngle));
            // let horizontalAngle = 5;
            // let polarAngle = i*2;

            let x = d * Math.sin(polarAngle) * Math.cos(horizontalAngle);
            let y = d * Math.sin(polarAngle) * Math.sin(horizontalAngle);
            let z = d * Math.cos(polarAngle);

            let r = new THREE.Vector3(x, y, z);
            let v = perpendicularOf(r);

            let name = "planet " + (i+1);
            let planet = new Planet(scene, r, v, name);
            planets.push(planet);

            d += gap;
        }

        return planets;
    }

    private bodies(): Body[] {
        return [this.star].concat(this.planets)
    }
}