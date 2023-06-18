import DotAnimation from "../Utility/DotAnimation";


export interface ObjectData {
    name: string,
    mass: number,
    distance: number
}

export interface OrbitalData {
    name: string,
    orbitalPeriod: number,
    previousOrbitalPeriods: number[],
    deviation: number | undefined,
    stabilityScore: number
}

export default class TablesController {

    private dotAnimation: DotAnimation;

    constructor() {
        this.dotAnimation = new DotAnimation();
    }

    update(objectData: ObjectData[], orbitalData: OrbitalData[]) {
        this.dotAnimation.update()
        this.setDataTable(objectData);
        this.setOrbitsTable(orbitalData);
    }

    private setDataTable(data: ObjectData[]) {

        // sort by distance
        // data.sort((a, b) => (a.Distance > b.Distance) ? 1 : ((b.Distance > a.Distance) ? -1 : 0));

        // sort by mass
        // data.sort((a, b) => (a.Mass < b.Mass) ? 1 : ((b.Mass < a.Mass) ? -1 : 0));

        const tableData = data.map(value => {
            return (
                `<tr>
                    <td>${value.name}</td>
                    <td>${value.mass.toFixed(0)}</td>
                    <td>${value.distance.toFixed(0)}</td>
                </tr>`
            );
        }).join('');

        const tableBody = document.querySelector("#data-table-body")!;
        tableBody.innerHTML = tableData;
    }

    private setOrbitsTable(data: OrbitalData[]) {

        const tableData = data.map(value => {
            return (
                `<tr>
                    <td>${value.name}</td>
                    <td>${value.orbitalPeriod.toFixed(2)}</td>
                    <td>${this.previousOrbitalPeriods(value.previousOrbitalPeriods)}</td>
                    <td>${value.deviation?.toFixed(2) ?? this.dotAnimation.dots}</td>
                    <td>${this.determineStabilityScore(value.deviation)}</td>
                </tr>`
            );
        }).join('');

        const tableBody = document.querySelector("#orbits-table-body")!;
        tableBody.innerHTML = tableData;

        let stabilityContainer = document.getElementById("stability")!;
        let stabilityPercentages = data.map(value => { return value.stabilityScore });
        stabilityContainer.innerHTML = (stabilityPercentages.average() / 10).toFixed(2);
    }

    private previousOrbitalPeriods(orbitalPeriods: number[]): string {
        let str = orbitalPeriods.map(ob => ob.toFixed(2)).toString();
        if (str.length == 0) {
            str = this.dotAnimation.dots;
        }

        return str;
    }


    private determineStabilityScore(deviation: number | undefined): string {
        let stabilityScore = "";

        switch (deviation) {
            case undefined:
                stabilityScore = this.dotAnimation.dots;
                break;

            default:
                if (deviation != undefined && deviation < 0) {
                    stabilityScore = "0";
                } else if (deviation != undefined) {
                    stabilityScore = ((100 - deviation) / 10).toFixed(2);
                }
        }

        return stabilityScore;
    }
}