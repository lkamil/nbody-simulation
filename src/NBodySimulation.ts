import { degToRad } from 'three/src/math/MathUtils';
import * as THREE from 'three';
import Body from './Objects/Body';
import Config from './Config';
import { randomFromInterval, perpendicularOf } from './Utility/helper';
import Planet from './Objects/Planet';
import Star from './Objects/Star';

export default class NBodySimulation {

    readonly star: Body;
    readonly planets: Planet[];

    events = {
        set current(name: string) {
            this.log.unshift(name);
        },
        log: ([] as Array<string>),
    };


    constructor(scene: THREE.Scene) {

        this.star = new Star(scene);
        this.planets = this.createPlanets(scene);
    }

    update() {

        // Keep star centered
        let newStarPosition = this.star.getNewVectors(this.planets)[0];

        let shift = newStarPosition.clone().negate();

        this.star.update(this.planets, shift);
        

        for (let planet of this.planets) {
            planet.update(this.bodies(), shift);

            planet.getAndClearCurrentEvents().forEach(event => {
                this.events.current = event;
            });
        }
    }

    private createPlanets(scene: THREE.Scene): Planet[] {

        let planets: Planet[] = [];

        let d = Config.minDistanceToStar;
        let gap = Config.distanceBetweenPlanets;
        for (let i = 0; i < Config.numberOfPlanets; i++) {

            let horizontalAngle = degToRad(randomFromInterval(Config.minHorizontalAngle, Config.maxHorizontalAngle));
            let polarAngle = degToRad(randomFromInterval(Config.minPolarAngle, Config.maxPolarAngle));

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

    getObjectData() {

        let data = []
        let entry = { Object: "Star", Mass: Config.star.mass, Distance: "0" }
        data.push(entry);

        for (let planet of this.planets) {
            let entry = { Object: planet.label.element.innerHTML, Mass: Config.planet.mass, Distance: planet.r.distanceTo(this.star.r).toFixed(0)}
            data.push(entry);
        }  

        return data
    }

    removeObjectsFrom(scene: THREE.Scene) {
        scene.remove(this.star.mesh);
        this.star.mesh.geometry.dispose();
        // @ts-ignore
        this.star.mesh.material.dispose();

        this.planets.forEach(planet => {
            planet.removeTrajectory(scene);
            planet.removeLabel();
            let uuid = planet.mesh.uuid;
            let object = scene.getObjectByProperty('uuid', uuid) as THREE.Mesh;
            object?.geometry.dispose();
            // @ts-ignore
            object?.material.dispose();
            scene.remove(object!);
        });
    }
}
