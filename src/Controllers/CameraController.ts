import * as THREE from 'three';

export default class CameraController {

    camera: THREE.PerspectiveCamera;
    private radius: number;
    private center: THREE.Vector3

    constructor(scene: THREE.Scene) {
        const fov = 45;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.0001;
        const far = 8000;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.radius = 400;
        let phi = 30;
        let theta = 0;
        this.camera.position.setFromSphericalCoords(this.radius, phi, theta);

        this.center = scene.position.clone();
        this.camera.lookAt(this.center);

        scene.add(this.camera);
    }

    update(elapsedTime: number) {
        let speed = elapsedTime * 0.1;
        this.camera.position.x = this.radius * 3 * Math.cos(speed);
        this.camera.position.z = this.radius * Math.sin(speed);
        this.camera.position.y = (this.radius * 3 * Math.sin(speed) * 0.3) + 100;

        this.camera.lookAt(this.center);
    }
}