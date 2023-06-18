import Config from './../Enums/Config';

export default class DotAnimation {

    private dotAmount = 0;
    private maxDots = 3;
    private frameCount = 0;
    private dots = "";

    generateDots(): string {

        if (this.frameCount > Config.framerate) {
            this.frameCount = 0;
            if (this.dotAmount > this.maxDots) {
                this.dotAmount = 0;
            }

            this.dots = "";
            for (let i = 0; i < this.dotAmount; i++) {
                this.dots = this.dots.concat(".");
            }

            this.dotAmount += 1;

        }

        this.frameCount += 1;

        return this.dots;
    }
}