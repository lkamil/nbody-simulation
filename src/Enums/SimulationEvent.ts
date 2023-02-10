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

type SimulationEvent = Collision | Default | DistanceEvent

export {
    DistanceEvent,
    Collision,
    Default,
    SimulationEvent
}
