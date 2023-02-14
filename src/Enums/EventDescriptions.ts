import Body from "../Models/Body";
import { SimulationEvent } from "./SimulationEvent";

export default class EventDescription {

    static readonly prefix = "[>] ";

    static collisionDescription(a: Body, b: Body) {
        return this.prefix + a.label.element.innerText + " and " + b.label.element.innerText + " collided";
    }

    static awayDescription(a: Body) {
        return this.prefix + a.label.element.innerText + " drifted away";
    }

    static returnDescription(a: Body) {
        return this.prefix + a.label.element.innerText + " reentered system";
    }

    static simulationInitDescription() {
        return this.prefix + "new system generated";
    }

    static planetsInitDescription(count: number) {
        return this.prefix + count + " planets initialized";
    }

    static getDescriptionOf(event: SimulationEvent): string {
        switch (event.kind) {
            case "driftedAway":
                return EventDescription.awayDescription(event.object);
            case "collision":
                return EventDescription.collisionDescription(event.object, event.objectN);
            case "default":
                return "";
            case "reentered":
                return EventDescription.returnDescription(event.object);
            case "initSimulation":
                return EventDescription.simulationInitDescription();
            case "initPlanets":
                return EventDescription.planetsInitDescription(event.count);
        }
    }
}
