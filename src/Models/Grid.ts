import * as THREE from 'three';

export default class Grid {

    readonly size = 8000;
    gridMesh: THREE.Group

    constructor(scene: THREE.Scene) {
        // this.initAxes(scene);
        this.gridMesh = this.addGrid(scene);
    }

    show() {
        this.gridMesh.visible = true;
    }

    hide () {
        this.gridMesh.visible = false;
    }

    private addGrid(scene: THREE.Scene): THREE.Group {
        let gridMeshes = new THREE.Group();

        let size = 800;

        let gXY = new THREE.PlaneGeometry(1, 1, 10, 10);
        this.toQuads(gXY);
        let mXY = new THREE.LineBasicMaterial({ color: 0x4287f5, opacity: 0.2, transparent: true });
        let grXY = new THREE.LineSegments(gXY, mXY);
        grXY.scale.set(size, size, 1);
        grXY.position.set(0, 0, size / 2);
        gridMeshes.add(grXY);

        let gXZ = new THREE.PlaneGeometry(1, 1, 10, 10);
        this.toQuads(gXZ);
        let mXZ = new THREE.LineBasicMaterial({ color: 0x7c84cc, opacity: 0.2, transparent: true });
        let grXZ = new THREE.LineSegments(gXZ, mXZ);
        grXZ.scale.set(size, size, 1);
        grXZ.rotation.x = Math.PI * -0.5;
        grXZ.position.set(0, -size / 2, 0);
        gridMeshes.add(grXZ);

        let gYZ = new THREE.PlaneGeometry(1, 1, 10, 10);
        this.toQuads(gYZ);
        let mYZ = new THREE.LineBasicMaterial({ color: 0x408c9c, opacity: 0.2, transparent: true });
        let grYZ = new THREE.LineSegments(gYZ, mYZ);
        grYZ.scale.set(size,size, 1);
        grYZ.rotation.y = Math.PI * -0.5;
        grYZ.position.set(size / 2, 0, 0);
        gridMeshes.add(grYZ);

        scene.add(gridMeshes);

        return gridMeshes;
    }

    private toQuads(g: THREE.PlaneGeometry) {
        let p = g.parameters;
        let segmentsX = p.widthSegments;
        let segmentsY = p.heightSegments;
        let indices = [];
        for (let i = 0; i < segmentsY + 1; i++) {
            let index11 = 0;
            let index12 = 0;
            for (let j = 0; j < segmentsX; j++) {
                index11 = (segmentsX + 1) * i + j;
                index12 = index11 + 1;
                let index21 = index11;
                let index22 = index11 + (segmentsX + 1);
                indices.push(index11, index12);
                if (index22 < ((segmentsX + 1) * (segmentsY + 1) - 1)) {
                    indices.push(index21, index22);
                }
            }
            if ((index12 + segmentsX + 1) <= ((segmentsX + 1) * (segmentsY + 1) - 1)) {
                indices.push(index12, index12 + segmentsX + 1);
            }
    }
    g.setIndex(indices);
}

    private initAxes(scene: THREE.Scene) {
        let axes = new THREE.Group();

        // z axis
        const p1 = new THREE.Vector3(0, 0, -this.size / 2);
        const p2 = new THREE.Vector3(0, 0, this.size / 2);
        const axis1Geometry = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const axis1Material = new THREE.LineBasicMaterial({ color: 0x676767 });
        const axis1 = new THREE.Line(axis1Geometry, axis1Material);
        axes.add(axis1);

        // y axis
        const p3 = new THREE.Vector3(0, -(this.size / 2) , 0);
        const p4 = new THREE.Vector3(0, (this.size / 2) , 0);
        const axis2Geometry = new THREE.BufferGeometry().setFromPoints([p3, p4]);
        const axis2Material = new THREE.LineBasicMaterial({ color: 0x676767, opacity: 0.1 });
        const axis2 = new THREE.Line(axis2Geometry, axis2Material);
        axes.add(axis2);

        // x axis
        const p5 = new THREE.Vector3(-(this.size / 2), 0, 0);
        const p6 = new THREE.Vector3((this.size / 2), 0, 0);
        const axis3Geometry = new THREE.BufferGeometry().setFromPoints([p5, p6]);
        const axis3Material = new THREE.LineBasicMaterial({ color: 0x676767 });
        const axis3 = new THREE.Line(axis3Geometry, axis3Material);
        axes.add(axis3);

        scene.add(axes);

        return axes;
    }
}