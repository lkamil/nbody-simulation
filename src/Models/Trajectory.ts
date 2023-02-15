
import * as THREE from 'three';
import { BufferAttribute } from 'three';
import Config from '../Enums/Config';

export default class Trajectory {

    positions: Float32Array;
    private maxPoints: number;
    drawRange: number;
    line: THREE.Line;

    constructor(length: number, scene: THREE.Scene) {

        this.maxPoints = length;
        this.positions = new Float32Array(this.maxPoints * 3); // Three vertices per point
        this.line = this.setupLine();

        // Set draw range
        this.drawRange = 0;
        this.line.geometry.setDrawRange(0, this.drawRange); 
        
        scene.add(this.line);
    }

    show() {
        this.line.visible = true;
    }

    hide() {
        this.line.visible = false;
    }

    private setupLine(): THREE.Line {

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        const colors = this.gradientArray();
        geometry.setAttribute('color', new BufferAttribute(colors, 4));
        // geometry.setAttribute('tr')

        const material = new THREE.LineBasicMaterial({ 
            vertexColors: true, // Geometry provides color info
            transparent: true,
            // opacity: 0.1,
        });

        return new THREE.Line(geometry, material);
    }

    addPosition(newPosition: THREE.Vector3) {
        // Shift values by three positions
        for (let i = this.positions.length - 1; i > 3; i -= 3) {
            this.positions[i] = this.positions[i - 3];
            this.positions[i - 1] = this.positions[i - 4];
            this.positions[i - 2] = this.positions[i - 5];
        }
        
        this.positions[0] = newPosition.x;
        this.positions[1] = newPosition.y;
        this.positions[2] = newPosition.z;

        if (this.drawRange != this.positions.length) {
            this.drawRange++;
        }
        this.line.geometry.setDrawRange(0, this.drawRange);
        this.line.geometry.attributes.position.needsUpdate = true
    }

    private gradientArray(): Float32Array {
        let step = 1 / this.maxPoints;
        let dec = step;

        const colors = new Float32Array(this.maxPoints * 4);
        for (let i = 0; i < colors.length - 3; i += 4) {
            colors[i] = Config.colors.trajectory.r; // r
            colors[i + 1] = Config.colors.trajectory.g;  // g
            colors[i + 2] = Config.colors.trajectory.b; // b
            colors[i + 3] = 1 - dec; // alpha

            dec += step;
        }

        return colors

    }
}