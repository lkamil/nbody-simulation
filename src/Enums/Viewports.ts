import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';

interface CameraSettings {
    distance: number,
    near: number,
    far: number,
    phi: number,
    theta: number, 
    fov: number,
    lookAt: THREE.Vector3
}

interface ViewSetting {
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
        background: new THREE.Color(0.5, 0.5, 0.7),
        cameraSettings: {
            distance: 400,
            near: 0.001,
            far: 8000,
            phi: 30,
            theta: 0,
            fov: 45,
            lookAt: new THREE.Vector3(0,0,0)
        },
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 1,
        updateCamera: function (camera: THREE.PerspectiveCamera,  elapsedTime: number): void {
            let speed = elapsedTime * 0.1;
            camera.position.x = this.cameraSettings.distance * 3 * Math.cos(speed);
            camera.position.z = this.cameraSettings.distance * Math.sin(speed);
            camera.position.y = (this.cameraSettings.distance * 3 * Math.sin(speed) * 0.3) + 100;

            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: true,
        showOrbits: false,
        showGrid: false
    },
    {
        type: ViewType.top,
        background: new THREE.Color(0.7, 0.5, 0.7),
        cameraSettings: {
            distance: 2000,
            near: 0.001,
            far: 8000,
            phi: 0,
            theta: 0,
            fov: 20,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.75,
        width: 0.25,
        bottom: 0,
        height: 0.25,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: false,
        showGrid: true,
        showOrbits: false
    },
    {
        type: ViewType.test,
        background: new THREE.Color(0.5, 0.7, 0.7),
        cameraSettings: {
            distance: 1000,
            near: 0.001,
            far: 8000,
            phi: degToRad(90),
            theta: degToRad(90),
            fov: 45,
            lookAt: new THREE.Vector3(0, 0, 0)
        },
        left: 0.5,
        width: 0.5,
        bottom: 0.25,
        height: 0.75,
        // @ts-ignore
        updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
            camera.lookAt(this.cameraSettings.lookAt);
        },
        showTrajectories: false,
        showGrid: true,
        showOrbits: true
    },
    // {
    //     type: ViewType.test,
    //     background: new THREE.Color(0.5, 0.7, 0.7),
    //     cameraSettings: {
    //         distance: 800,
    //         near: 0.001,
    //         far: 8000,
    //         phi: degToRad(90),
    //         theta: degToRad(225),
    //         fov: 45,
    //         lookAt: new THREE.Vector3(0, 0, 0)
    //     },
    //     left: 0.75,
    //     width: 0.25,
    //     bottom: 0.75,
    //     height: 0.25,
    //     updateCamera: function (camera: THREE.PerspectiveCamera, elapsedTime: number) {
    //         camera.lookAt(this.cameraSettings.lookAt);
    //     }
    // }
]