import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import Config from '../Enums/Config';

export class XZProjection {

    line: THREE.Line;
    linePositions: Float32Array;

    circle: THREE.Line

    readonly opacity = 1;
    // readonly color = new THREE.Color(0x328f11);

    constructor(scene: THREE.Scene) {
        this.linePositions = new Float32Array(2 * 3); // 3 vertices for starting- and endpoint
        this.line = this.setupLine(scene);

        this.circle = this.setupCircle(scene);
    }

    update(r: THREE.Vector3) {
        this.updateLine(r);

        
        let planeNormal = new THREE.Vector3(0, 1, 0);
        let xzPos = r.projectOnPlane(planeNormal);
        let scale = xzPos.distanceTo(new THREE.Vector3());
        this.circle.scale.set(scale, scale, scale);
    }

    show() {
        this.line.visible = true;
        this.circle.visible = true;
    }

    hide () {
        this.line.visible = false;
        this.circle.visible = false;
    }

    private updateLine(r: THREE.Vector3) {

        this.linePositions[0] = r.x;
        this.linePositions[1] = r.y;
        this.linePositions[2] = r.z;

        let planeNormal = new THREE.Vector3(0, 1, 0);
        let xzPos = r.projectOnPlane(planeNormal);

        this.linePositions[3] = xzPos.x;
        this.linePositions[4] = xzPos.y;
        this.linePositions[5] = xzPos.z;

        this.line.geometry.attributes.position.needsUpdate = true;
    }

    private setupLine(scene: THREE.Scene): THREE.Line {
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this.linePositions, 3));
        const material = new THREE.LineBasicMaterial({
            color: Config.colors.orbitColor,
            opacity: this.opacity,
            transparent: true
        });

        let line = new THREE.Line(geometry, material);
        scene.add(line);

        return line;
    }

    private setupCircle(scene: THREE.Scene): THREE.Line {
        let aX = 0;
        let aY = 0;
        let radiusX = 1;
        let radiusY = 1;
        let aStartAngle = 0;
        let aEndAngle = 2 * Math.PI;
        let clockwise = false;
        let aRotation = 0;
    
        const curve = new THREE.EllipseCurve(
            aX, aY,
            radiusX, radiusY,
            aStartAngle, aEndAngle,
            clockwise, aRotation
        )

        let resolution = 50;
        const points = curve.getPoints(resolution);

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: Config.colors.orbitColor,
            opacity: this.opacity,
            transparent: true,
        });

        const circle = new THREE.Line(geometry, material);
        circle.rotateX(degToRad(90));
        scene.add(circle);

        return circle;
    }
}