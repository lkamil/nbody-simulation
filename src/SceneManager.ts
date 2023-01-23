import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import NBodySimulation from './NBodySimulation';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GUI } from 'dat.gui';

export default class SceneManager {

    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private labelRenderer: CSS2DRenderer;
    private camera: THREE.PerspectiveCamera;
    private datGui: GUI;
    
    private orbitControls: OrbitControls;
    private composer: EffectComposer;
    private bloomPass: UnrealBloomPass;

    private simulation: NBodySimulation;

    constructor() {
        this.scene = this.setupScene();
        this.renderer = this.setupRenderer();
        this.labelRenderer = this.setupLabelRenderer();
        this.camera = this.setupCamera(this.scene);
        this.orbitControls = this.setupOrbitControls(this.camera, this.renderer.domElement);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.5, 0);
        this.composer = this.setupComposer(this.renderer, this.scene, this.camera);

        this.simulation = this.addSimulation(this.scene);

        this.addLight(this.scene);
        this.datGui = this.setupDatGui();

        this.animate();
    }

    private animate() {
        requestAnimationFrame(() => {
            this.animate();
        });
        
        this.update();

    }

    private update() {
        this.composer.render();
        this.labelRenderer.render(this.scene, this.camera);

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
        const far = 8000;

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

        document.body.appendChild(renderer.domElement);

        return renderer
    }

    private setupLabelRenderer(): CSS2DRenderer {
        let labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '-12px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(labelRenderer.domElement);

        return labelRenderer;
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

    private setupComposer(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): EffectComposer {
        let composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        this.bloomPass.renderToScreen = true;
        composer.addPass(this.bloomPass);
    
        composer.setSize(window.innerWidth, window.innerHeight);

        return composer        
    }

    private setupDatGui(): GUI {
        let gui = new GUI;
        gui.domElement.id = 'gui';
        let folder = gui.addFolder('Bloompass');

        folder.add(this.bloomPass, 'strength', 0, 5);
        folder.add(this.bloomPass, 'radius', 0, 1);
        folder.add(this.bloomPass, 'threshold', 0, 1);
        

        return gui
    }
}