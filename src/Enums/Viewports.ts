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
    sub
}

export const views: ViewSetting[] = [
    {   
        type: ViewType.main,
        background: Config.colors.mainBackground,
        cameraSettings: {
            distance: 500,
            near: 0.001,
            far: 8000,
            phi: 30,
            theta: 0,
            fov: 45,
            lookAt: new THREE.Vector3(0,0,0)
        },
        left: 0,
        bottom: 0,
        width: 1,
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
        type: ViewType.sub,
        background: Config.colors.topTrajectoriesBackground,
        cameraSettings: {
            distance: 1000,
            near: 0.001,
            far: 8000,
            phi: degToRad(360),
            theta: degToRad(270),
            fov: 45,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.78,
        width: 0.16,
        bottom: 0.68,
        height: 0.3,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: true,
        showGrid: true,
        showOrbits: false
    },
    {
        type: ViewType.sub,
        background: Config.colors.sideOrbitsBackground,
        cameraSettings: {
            distance: 1000,
            near: 0.001,
            far: 8000,
            phi: degToRad(90),
            theta: degToRad(90),
            fov: 45,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.83,
        width: 0.16,
        bottom: 0.34,
        height: 0.3,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: false,
        showGrid: false,
        showOrbits: true
    },
    {
        type: ViewType.sub,
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
        width: 0.12,
        height: 0.21,
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