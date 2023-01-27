import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import NBodySimulation from './NBodySimulation';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import TimeController from './TimeController';

export default class SceneManager {

    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private labelRenderer: CSS2DRenderer;
    private camera: THREE.PerspectiveCamera;
    private timeController: TimeController;

    // private datGui: GUI;
    private stats: Stats
    
    // private orbitControls: OrbitControls;
    private composer: EffectComposer;
    private bloomPass: UnrealBloomPass;

    private simulation: NBodySimulation;

    constructor() {
        this.scene = this.setupScene();
        this.renderer = this.setupRenderer();
        this.labelRenderer = this.setupLabelRenderer();
        this.camera = this.setupCamera(this.scene);
        this.setupOrbitControls(this.camera, this.renderer.domElement);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.5, 0);
        this.composer = this.setupComposer(this.renderer, this.scene, this.camera);
        this.timeController = new TimeController();

        this.simulation = this.addSimulation(this.scene);

        this.addLight(this.scene);
        this.setupDatGui();
        this.setDataTable();
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
    }

    update() {
        this.timeController.timer.update();
        // this.clock.getDelta()
        this.composer.render();
        this.labelRenderer.render(this.scene, this.camera);

        this.simulation.update();
        this.setDataTable();
        this.logEvents();
        this.stats.update();

        this.checkTime();
    }

    private checkTime() {

        if (this.timeController.timer.getElapsed() > 5) {
            console.log("RESET");
            this.timeController.timer.hardReset();
            this.simulation.removeObjectsFrom(this.scene);

            // TODO: reset label renderer correctly
            let labelRenderer = document.getElementById("label-renderer");
            if (labelRenderer != null) {
                labelRenderer.parentNode?.removeChild(labelRenderer);
            }

            this.simulation = new NBodySimulation(this.scene);
        }
    }

    // - SETUP -

    private setupScene(): THREE.Scene {
        const scene = new THREE.Scene();

        this.setBackgroundTexture(scene);

        return scene;
    }

    private setBackgroundTexture(scene: THREE.Scene) {
        let geometry = new THREE.SphereGeometry(2000, 16, 16);
        geometry.scale(-1, 1, 1);
        let material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../assets/8k_stars.jpg'),
            // map: new THREE.TextureLoader().load('../assets/celestial_grid.jpg'),
            transparent: true,
            opacity: 0.4
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = "sceneTexture";

        scene.add(mesh);
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
        // renderer.setPixelRatio(2);
        document.body.appendChild(renderer.domElement);

        return renderer
    }

    private setupLabelRenderer(): CSS2DRenderer {
        let labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '-12px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        labelRenderer.domElement.id = "label-renderer";
        document.body.appendChild(labelRenderer.domElement);

        return labelRenderer;
    }

    private setupOrbitControls(camera: THREE.PerspectiveCamera, domElement: HTMLCanvasElement): OrbitControls {
        let orbitControls = new OrbitControls(camera, domElement);

        return orbitControls
    }

    private addLight(scene: THREE.Scene) {
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

    private setDataTable() {

        let data = this.simulation.getObjectData();

        const tableData = data.map(value => {
            return (
                `<tr>
                    <td>${value.Object}</td>
                    <td>${value.Mass}</td>
                    <td>${value.Distance}</td>
                </tr>`
            );
        }).join('');

        const tableBody = document.querySelector("#data-table-body")!;
        tableBody.innerHTML = tableData;
    }

    private logEvents() {
        let logs = this.simulation.events.log;
        logs.splice(5);

        const consoleData = logs.map(event => {
            return (
                `<tr>
                    <td>${event}</td>
                 </tr>`
            );
        }).join('');
        const consoleBody = document.querySelector("#console-body")!;
        consoleBody.innerHTML = consoleData;
    }
}
