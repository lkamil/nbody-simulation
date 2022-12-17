import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Body from './Body';

export default class SceneManager {

    private scene: THREE.Scene;
    private renderer: THREE.Renderer;
    private camera: THREE.PerspectiveCamera;
    
    private orbitControls: OrbitControls;

    private planet: Body;

    constructor() {
        console.log("initializing scene manager");
        this.scene = this.setupScene();
        this.renderer = this.setupRenderer();
        this.camera = this.setupCamera(this.scene);
        this.orbitControls = this.setupOrbitControls(this.camera, this.renderer.domElement);

        this.addLight(this.scene);
        this.planet = this.addObject();
    }

    update() {
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);

        this.planet.update();
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
        const far = 1000;

        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        const initialPosition = new THREE.Vector3(-0.8, -0.3, 0.5);
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

    private addObject(): Body {
        let r = new THREE.Vector3(0, 0, 0);
        let v = new THREE.Vector3(0, 0, 0);
        let mass = 5;
        let planet = new Body(r, v, mass);
        this.scene.add(planet.mesh);
        console.log("added planet");

        return planet;
    }
}