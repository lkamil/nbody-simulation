import Config from '../Enums/Config';
import { Timer } from '../js/Timer/Timer';

export default class TimeController {

    private timer;

    constructor() {
        this.timer = new Timer();
        this.timer.enableFixedDelta();
        this.timer.setFixedDelta(1 / Config.framerate);
    }

    // PUBLIC

    public getElapsed(): number {
        return this.timer.getElapsed();
    }

    public hardReset(): void {
        this.timer.hardReset();
    }

    public update(): void {
        this.timer.update();
    }

    public getDelta(): number {
        return this.timer.getDelta();
    }
}