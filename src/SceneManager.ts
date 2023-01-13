import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import NBodySimulation from './NBodySimulation';

export default class SceneManager {

    private scene: THREE.Scene;
    private renderer: THREE.Renderer;
    private camera: THREE.PerspectiveCamera;
    
    private orbitControls: OrbitControls;

    private simulation: NBodySimulation

    constructor() {
        this.scene = this.setupScene();
        this.renderer = this.setupRenderer();
        this.camera = this.setupCamera(this.scene);
        this.orbitControls = this.setupOrbitControls(this.camera, this.renderer.domElement);

        this.simulation = this.addSimulation(this.scene);

        this.addLight(this.scene);
    }

    update() {
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);

        this.simulation.update();
    }

    // - SETUP -

    private setupScene(): THREE.Scene {
        const scene = new THREE.Scene();

        return scene;
    }

    private setupCamera(scene: THREE.Scene): THREE.PerspectiveCamera {

        const fov = 45;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.0001;
        const far = 3000;

        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        const initialPosition = new THREE.Vector3(50, 40, 50);
        camera.position.copy(initialPosition);

        camera.lookAt(scene.position);

        return camera;
    }

    private setupRenderer(): THREE.WebGLRenderer {
        let renderer = new THREE.WebGLRenderer();

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // canvas.appendChild(renderer.domElement);
        document.body.appendChild(renderer.domElement);

        return renderer
    }

    private setupOrbitControls(camera: THREE.PerspectiveCamera, domElement: HTMLCanvasElement): OrbitControls {
        let orbitControls = new OrbitControls(camera, domElement);

        return orbitControls
    }

    private addLight(scene: THREE.Scene) {
        console.log("added Light");
        let ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);
    }

    private addSimulation(scene: THREE.Scene): NBodySimulation {
        let simulation = new NBodySimulation(scene);

        return simulation;
    }
}