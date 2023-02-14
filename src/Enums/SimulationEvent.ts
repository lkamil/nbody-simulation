import Body from "../Models/Body"

interface DistanceEvent {
    kind: "driftedAway" | "reentered",
    object: Body
}

interface Collision {
    kind: "collision"
    object: Body,
    objectN: Body
}

interface Default {
    kind: "default",
    object: Body
}

interface Init {
    kind: "initSimulation" | "initPlanets"
    count: number
}

type SimulationEvent = Collision | Default | DistanceEvent | Init

export {
    DistanceEvent,
    Collision,
    Default,
    Init,
    SimulationEvent
}
