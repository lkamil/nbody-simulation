import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import Config from './Config';

interface CameraSettings {
    distance: number,
    near: number,
    far: number,
    phi: number,
    theta: number, 
    fov: number,
    lookAt: THREE.Vector3
}

export interface ViewSetting {
    type: ViewType,
    background: THREE.Color,
    camera?: THREE.PerspectiveCamera
    cameraSettings: CameraSettings,
    left: number,
    bottom: number,
    width: number,
    height: number,
    updateCamera: (camera: THREE.PerspectiveCamera, elapsedTime: number) => void,
    showTrajectories: boolean,
    showOrbits: boolean,
    showGrid: boolean
}

export enum ViewType {
    main,
    top,
    test
}

export const views: ViewSetting[] = [
    {   
        type: ViewType.main,
        background: Config.colors.mainBackground,
        cameraSettings: {
            distance: 400,
            near: 0.001,
            far: 8000,
            phi: 30,
            theta: 0,
            fov: 45,
            lookAt: new THREE.Vector3(0,0,0)
        },
        left: 0.1,
        bottom: 0,
        width: 0.8,
        height: 1,
        updateCamera: function (camera: THREE.PerspectiveCamera,  elapsedTime: number): void {
            let speed = elapsedTime * 0.05;
            camera.position.x = this.cameraSettings.distance * 3 * Math.cos(speed);
            camera.position.z = this.cameraSettings.distance * Math.sin(speed);
            camera.position.y = (this.cameraSettings.distance * 3 * Math.sin(speed) * 0.3) + 100;

            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: true,
        showOrbits: true,
        showGrid: false
    },
    {
        type: ViewType.top,
        background: Config.colors.topTrajectoriesBackground,
        cameraSettings: {
            distance: 2000,
            near: 0.001,
            far: 8000,
            phi: 0,
            theta: 0,
            fov: 20,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.8,
        width: 0.2,
        bottom: 0.67,
        height: 0.34,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: true,
        showGrid: true,
        showOrbits: false
    },
    {
        type: ViewType.test,
        background: Config.colors.sideOrbitsBackground,
        cameraSettings: {
            distance: 1000,
            near: 0.001,
            far: 8000,
            phi: degToRad(90),
            theta: degToRad(270),
            fov: 45,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.8,
        width: 0.2,
        bottom: 0.34,
        height: 0.34,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: false,
        showGrid: true,
        showOrbits: true
    },
    {
        type: ViewType.test,
        background: Config.colors.topOrbitsBackground,
        cameraSettings: {
            distance: 2000,
            near: 0.001,
            far: 8000,
            phi: 0,
            theta: 0,
            fov: 20,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.8,
        width: 0.2,
        bottom: 0,
        height: 0.34,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: false,
        showGrid: true,
        showOrbits: true
    },
    {
        type: ViewType.top,
        background: Config.colors.miniBackground,
        cameraSettings: {
            distance: 800,
            near: 0.001,
            far: 10000,
            phi: 45,
            theta: 0,
            fov: 45,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.22,
        bottom: 0.01,
        width: 0.14,
        height: 0.25,
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number): void {
            let speed = elapsedTime * 0.05;
            camera.position.x = this.cameraSettings.distance * 3 * Math.cos(speed);
            camera.position.z = this.cameraSettings.distance * Math.sin(speed);
            camera.position.y = (this.cameraSettings.distance * 3 * Math.sin(speed) * 0.3) + 100;

            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: true,
        showOrbits: true,
        showGrid: true
    },
    
]