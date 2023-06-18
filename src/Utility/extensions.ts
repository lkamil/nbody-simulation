export { };
declare global {
    export interface Array<T> {
        sum(): T;
        average(): T;
    }
}


if (!Array.prototype.sum) {
    Array.prototype.sum = function (): number {
        return this.reduce((acc: number, x: number) => acc + x, 0);
    }
}

if (!Array.prototype.average) {
    Array.prototype.average = function (): number {
        return this.sum() / (this.length || 1);
    }
}

