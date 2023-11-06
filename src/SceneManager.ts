import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import NBodySimulation from './NBodySimulation';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import TimeController from './Controllers/TimeController';
import CameraController from './Controllers/CameraController';
// import texture from '../assets/images/stars.jpg';
import Config from './Enums/Config';
import Grid from './Models/Grid';
import { views, ViewSetting, ViewType } from './Enums/Viewports';
import { RAND} from './Utility/Randomizer';
import './Utility/extensions';
import TablesController from './Controllers/TablesController';
import EventController from './Controllers/EventController';

export default class SceneManager {

    private scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    private labelRenderer: CSS2DRenderer;
    private timeController: TimeController;
    // private orbitControls: OrbitControls;
    cameraController: CameraController;
    private tablesController: TablesController;
    private eventController: EventController;
    private stats: Stats
    private grid: Grid;
    
    // private composer: EffectComposer;
    private bloomPass: UnrealBloomPass;

    private simulation: NBodySimulation;


    constructor() {
        this.scene = this.setupScene();
        this.renderer = this.setupRenderer();
        this.addPointLight(this.scene);
        this.labelRenderer = this.setupLabelRenderer();
        this.cameraController = new CameraController(this.scene);
        this.tablesController = new TablesController();
        this.eventController = new EventController();
        this.setupOrbitControls(this.cameraController.camera, this.renderer.domElement);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.5, 0);
        // this.composer = this.setupComposer(this.renderer, this.scene, this.cameraController.camera);
        this.timeController = new TimeController();

        this.simulation = this.addSimulation(this.scene);

        this.addLight(this.scene);
        // this.setupDatGui();
        this.stats = Stats();
        this.stats.domElement.id = "cpu";

        this.grid = new Grid(this.scene);
        document.body.appendChild(this.stats.dom);

        this.fillGeneralInfo();
    }

    update() {

        this.timeController.update();
        // this.composer.render();
        // this.cameraController.update(this.timeController.timer.getElapsed());
        // this.labelRenderer.render(this.scene, this.cameraController.camera);
        this.displayTime(this.timeController.getElapsed());
        this.simulation.update();
        this.tablesController.update(this.simulation.getObjectData(), this.simulation.getOrbitsData());
        this.eventController.update(this.simulation.events.log);
        this.stats.update();
        this.renderViewports();
        this.checkTime();
    }

    private fillGeneralInfo() {

        let numberOfStars = document.getElementById("numberOfStars")!;
        numberOfStars.innerHTML = "1";

        let numberOfPlanets = document.getElementById("numberOfPlanets")!;
        numberOfPlanets.innerHTML = Config.numberOfPlanets.toString();

        let numberOfPlanetesimals = document.getElementById("numberOfPlanetesimals")!;
        numberOfPlanetesimals.innerHTML = Config.numberOfPlanetesimals.toString();

    }   

    private renderViewports() {

        for (const view of views) {
            
            this.showElementsWith(view);

            const camera = view.camera;
            if (camera != undefined) {
                view.updateCamera(camera, this.timeController.getElapsed());

                let w = window.innerWidth;
                let h = window.innerHeight;
                const left = Math.floor(w * view.left);
                const bottom = Math.floor(h * view.bottom);
                const width = Math.floor(w * view.width);
                const height = Math.floor(h * view.height);

                if (view.type == ViewType.main) { 
                    this.labelRenderer.setSize(width, height);
                    this.labelRenderer.render(this.scene, camera);
                }
                this.renderer.setViewport(left, bottom, width, height);
                this.renderer.setScissor(left, bottom, width, height);
                this.renderer.setScissorTest(true);
                this.renderer.setClearColor(view.background);

                // this.composer.setSize(width, height);
                // this.composer.render();

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                this.renderer.render(this.scene, camera);
            }
            
        }
    }

    private showElementsWith(settings: ViewSetting) {

        if (settings.showTrajectories) {
            this.simulation.displayTrajectories(true);
        } else {
            this.simulation.displayTrajectories(false);
        }

        if (settings.showGrid) {
            this.grid.show();
        } else {
            this.grid.hide();
        }

        if (settings.showOrbits) {
            this.simulation.displayOrbits(true);
        } else {
            this.simulation.displayOrbits(false);
        }
    }

    resizeScene() {
        let w = window.innerWidth;
        let h = window.innerHeight;

        this.cameraController.camera.aspect = w / h;
        this.cameraController.camera.updateProjectionMatrix();

        this.renderer.setSize(w, h);
        this.labelRenderer.setSize(w, h);
    }

    private checkTime() {

        if (this.timeController.getElapsed() > Config.runTime) {
            console.log("RESET");
            RAND.reset();
            this.timeController.hardReset();
            this.simulation.removeObjectsFrom(this.scene);

            this.simulation = new NBodySimulation(this.scene);
        }
    }

    /* ------------------- SETUP ------------------ */

    private setupScene(): THREE.Scene {
        const scene = new THREE.Scene();
        // this.setBackgroundTexture(scene);

        // scene.fog = new THREE.Fog(0x333333, 700, 1300); 

        return scene;
    }

    // private setBackgroundTexture(scene: THREE.Scene) {
    //     let geometry = new THREE.SphereGeometry(8000, 16, 16);
    //     geometry.scale(-1, 1, 1);
    //     let material = new THREE.MeshBasicMaterial({
    //         map: new THREE.TextureLoader().load(texture),
    //         transparent: true,
    //         opacity: 0.8
    //     });
    //     let mesh = new THREE.Mesh(geometry, material);
    //     mesh.name = "sceneTexture";

    //     scene.add(mesh);
    // }

    private setupRenderer(): THREE.WebGLRenderer {
        let renderer = new THREE.WebGLRenderer();

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1);
        document.body.appendChild(renderer.domElement);

        return renderer
    }

    private addPointLight(scene: THREE.Scene) {
        const light = new THREE.PointLight(Config.colors.starLight, 1, 1000);
        light.position.set(0, 0, 0);
        scene.add(light);
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
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    }

    private addSimulation(scene: THREE.Scene): NBodySimulation {
        let simulation = new NBodySimulation(scene);

        return simulation;
    }

    // @ts-ignore
    private setupComposer(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): EffectComposer {
        let composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        this.bloomPass.renderToScreen = true;
        composer.addPass(this.bloomPass);

        // let pixelPass = new ShaderPass(PixelShader);
        // pixelPass.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        // pixelPass.uniforms['resolution'].value.multiplyScalar(0.8);
        // composer.addPass(pixelPass);

        const filmPass = new FilmPass(
            0.1,   // noise intensity
            0.0,  // scanline intensity
            0,    // scanline count
            0,  // grayscale
        );
        composer.addPass(filmPass);
    
        composer.setSize(window.innerWidth, window.innerHeight);

        return composer        
    }

    // @ts-ignore
    private setupDatGui(): GUI {
        let gui = new GUI;
        gui.domElement.id = 'gui';
        let folder = gui.addFolder('Bloompass');

        folder.add(this.bloomPass, 'strength', 0, 5);
        folder.add(this.bloomPass, 'radius', 0, 1);
        folder.add(this.bloomPass, 'threshold', 0, 1);
        

        return gui
    }

    private displayTime(elapsed: number) {
        let timeContainer = document.getElementById("time")!;
        timeContainer.innerHTML = elapsed.toFixed(2);
    }
}
