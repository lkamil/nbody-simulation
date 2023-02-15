import { degToRad } from 'three/src/math/MathUtils';
import * as THREE from 'three';
import Body from './Models/Body';
import Config from './Enums/Config';
import { randomFromInterval, perpendicularOf, vectorFromSphericalCoords } from './Utility/helper';
import Planet from './Models/Planet';
import Star from './Models/Star';
import Planetesimal from './Models/Planetesimal';
import { Init } from './Enums/SimulationEvent';
import EventDescription from './Enums/EventDescriptions';

export default class NBodySimulation {

    readonly star: Body;
    readonly planets: Planet[];
    readonly planetesimals: Body[];

    events = {
        set current(name: string) {
            this.log.push(name);
        },
        log: ([] as Array<string>),
    };


    constructor(scene: THREE.Scene) {

        this.star = new Star(scene);
        this.planets = this.createPlanets(scene);
        this.planetesimals = this.createPlanetesimals(scene);

        
        let planetsEvent: Init = {kind: 'initPlanets', count: this.planets.length};
        this.events.current = EventDescription.getDescriptionOf(planetsEvent);

        let simulationInit: Init = {kind: 'initSimulation', count: 0};
        this.events.current = EventDescription.getDescriptionOf(simulationInit);
        
    }


    /* -------------- PUBLIC METHODS -------------- */

    update() {

        // Keep star centered
        let newStarPosition = this.star.getNewVectors(this.planets).position;

        let shift = newStarPosition.clone().negate();

        this.star.update(this.planets, shift);
        
        for (let planet of this.planets) {
            planet.update.call(planet, this.bodies(), shift);
            planet.checkDistance(this.star.r);
            planet.getAndClearCurrentEvents().forEach(event => {
                this.events.current = event;
            });
        }

        for (let planetesimal of this.planetesimals) {
            planetesimal.update(this.bodies(), shift);
        }
    }

    getObjectData() {

        let data = []
        let entry = { Object: "Star", Mass: this.star.mass, Distance: 0 }
        data.push(entry);

        for (let planet of this.planets) {
            let entry = { Object: planet.label.element.innerHTML, Mass: planet.mass, Distance: planet.r.distanceTo(this.star.r)}
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
            this.removePlanetFromScene(planet, scene);
        });

        this.planetesimals.forEach(planetesimal => {
            this.removePlanetesimalsFromScene(planetesimal, scene);
        });
    }

    displayTrajectories(on: boolean) {
        if (on) {
            this.planets.forEach(planet => {
                planet.trajectory.show();
            });
        } else {
            this.planets.forEach(planet => {
                planet.trajectory.hide();
            });
        }
    }

    displayOrbits(on: boolean) {
        if (on) {
            this.planets.forEach(planet => {
                planet.xzProjection.show();
            });
        } else {
            this.planets.forEach(planet => {
                planet.xzProjection.hide();
            });
        }
    }

    /* -------------- PRIVATE METHODS ------------- */

    private createPlanets(scene: THREE.Scene): Planet[] {

        let planets: Planet[] = [];
        for (let i = 0; i < Config.numberOfPlanets; i++) {
            let d = randomFromInterval(Config.minDistanceToStar, Config.maxDistanceToStar);
            let horizontalAngle = degToRad(randomFromInterval(Config.minHorizontalAngle, Config.maxHorizontalAngle));
            let polarAngle = degToRad(randomFromInterval(Config.minPolarAngle, Config.maxPolarAngle));

            let r = vectorFromSphericalCoords(d, horizontalAngle, polarAngle);
            let v = perpendicularOf(r);

            let name = "planet " + (i + 1);
            let planet = new Planet(scene, r, v, name);
            planets.push(planet);
        }

        return planets;
    }

    private createPlanetesimals(scene: THREE.Scene): Body[] {
        let planetesimals: Planetesimal[] = [];

        for (let i = 0; i < Config.numberOfPlanetesimals; i++) {
            let mass = randomFromInterval(Config.minPlanetesimalMass, Config.maxPlanetesimalMass);
            let distance = randomFromInterval(Config.minDistanceToStar, Config.minDistanceToStar * 2);
            let horizontalAngle = degToRad(randomFromInterval(Config.minHorizontalAngle, Config.maxHorizontalAngle));
            let polarAngle = degToRad(randomFromInterval(Config.minPolarAngle, Config.maxPolarAngle));

            let r = vectorFromSphericalCoords(distance, horizontalAngle, polarAngle);
            let v = perpendicularOf(r);

            let planetesimal = new Planetesimal(scene, mass, r, v);
            planetesimals.push(planetesimal);
        }

        return planetesimals;
    }

    private removePlanetFromScene(planet: Planet, scene: THREE.Scene) {
        planet.removeTrajectory(scene);
        planet.removeXZProjection(scene);
        planet.removeLabel();
        let uuid = planet.mesh.uuid;
        let object = scene.getObjectByProperty('uuid', uuid) as THREE.Mesh;
        object?.geometry.dispose();
        // @ts-ignore
        object?.material.dispose();
        scene.remove(object!);
    }

    private removePlanetesimalsFromScene(planetesimal: Planetesimal, scene: THREE.Scene) {
        let uuid = planetesimal.mesh.uuid;
        let object = scene.getObjectByProperty('uuid', uuid) as THREE.Mesh;

        object?.geometry.dispose();
        // @ts-ignore
        object?.material.dispose();
        scene.remove(object!);
    }

    private bodies(): Body[] {
        return [this.star].concat(this.planets).concat(this.planetesimals);
    }
}
