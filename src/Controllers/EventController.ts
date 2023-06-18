import DotAnimation from "../Utility/DotAnimation";

export default class EventController {

    private dotAnimation: DotAnimation;

    constructor() {
        this.dotAnimation = new DotAnimation();
    }

    update(logs: string[]) {
        this.dotAnimation.update();
        this.logEvents(logs);
    }

    private logEvents(logs: string[]) {

        logs = logs.filter(log => log != "[>] ...");
        logs.push("[*] " + this.dotAnimation.dots);

        while (logs.length > 5) {
            logs.shift();
        }
        // logs.splice(5, 10);

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