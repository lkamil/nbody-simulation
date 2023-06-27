import DotAnimation from "../Utility/DotAnimation";


export interface ObjectData {
    name: string,
    mass: number,
    distance: number
}

export interface OrbitalData {
    name: string,
    orbitalPeriod: number | undefined,
    previousOrbitalPeriods: number[],
    deviation: number | undefined
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
        let deviations = orbitalData.map(value => {return value.deviation});
        this.setStabilityLabel(deviations);
    }

    private setStabilityLabel(deviations: (number | undefined)[]) {
        let stabilityContainer = document.getElementById("stability")!;
        let stabilityScores = deviations.map(value => {
            let stabilityScore = this.determineStabilityScore(value);
            if (stabilityScore == undefined) {
                return 0;
            }
            return stabilityScore;
        });
        let stabilityAverage = stabilityScores.average();
        stabilityContainer.innerHTML = stabilityAverage?.toFixed(2) ?? this.dotAnimation.dots;
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
                    <td>${value.orbitalPeriod?.toFixed(2) ?? this.dotAnimation.dots}</td>
                    <td>${this.previousOrbitalPeriods(value.previousOrbitalPeriods)}</td>
                    <td>${value.deviation?.toFixed(2) ?? this.dotAnimation.dots}</td>
                    <td>${this.determineStabilityScore(value.deviation)?.toFixed(2) ?? this.dotAnimation.dots}</td>
                </tr>`
            );
        }).join('');

        const tableBody = document.querySelector("#orbits-table-body")!;
        tableBody.innerHTML = tableData;
    }

    private previousOrbitalPeriods(orbitalPeriods: number[]): string {
        let str = orbitalPeriods.map(ob => ob.toFixed(2)).toString();
        if (str.length == 0) {
            str = this.dotAnimation.dots;
        }

        return str;
    }

    private determineStabilityScore(deviation: number | undefined): number | undefined {
        let stabilityScore = 0;

        switch (deviation) {
            case undefined:
                return undefined;

            default:
                if (deviation < 0 || deviation > 100) {
                    stabilityScore = 0;
                } else {
                    stabilityScore = ((100 - deviation) / 10);
                }
        }

        return stabilityScore;
    }
}