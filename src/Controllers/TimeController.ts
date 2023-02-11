import { Timer } from '../js/Timer/Timer';

export default class TimeController {

    timer;
    private baseFixedDelta: number;

    constructor() {
        // this.timer = new THREE.Clock();
        this.timer = new Timer();
        this.timer.enableFixedDelta();
        this.baseFixedDelta = 0.01667;
    }

    setSpeedFactor(newFactor: number) {
        this.timer.setFixedDelta(this.baseFixedDelta * newFactor);
    }

    getDelta() {
        return this.timer.getDelta();
    }

    dt() {
        const elapsed = this.timer.getElapsed();
        return elapsed;
    }
}