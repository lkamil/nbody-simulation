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
        this.setStabilityLabel(orbitalData);
    }

    private setStabilityLabel(orbitalData: OrbitalData[]): void {
        let stabilityContainer = document.getElementById("stability")!;
        let stabilityScores = orbitalData.map(value => {
            if (value.orbitalPeriod == 0) {
                return undefined;
            }
            let deviation = value.deviation;
            let stabilityScore = this.determineStabilityScore(deviation);
            if (stabilityScore == undefined) {
                return 0;
            }
            return stabilityScore;
        });
        let cleanScores = stabilityScores.filter(score => score != undefined);
        let stabilityAverage = cleanScores.average();
        if (stabilityAverage != undefined && stabilityAverage > 8.5) {
            stabilityContainer.classList.add("high-stability");
        } else {
            stabilityContainer.classList.remove("high-stability");
        }
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
                    <td>${this.orbitalPeriod(value.orbitalPeriod)}</td>
                    <td>${this.previousOrbitalPeriods(value.orbitalPeriod, value.previousOrbitalPeriods)}</td>
                    <td>${this.deviation(value.orbitalPeriod, value.deviation)}</td>
                    <td>${this.stabilityScore(value.orbitalPeriod, value.deviation)}</td>
                </tr>`
            );
        }).join('');

        const tableBody = document.querySelector("#orbits-table-body")!;
        tableBody.innerHTML = tableData;
    }

    private orbitalPeriod(orbitalPeriod: number | undefined): string {
        if (orbitalPeriod == 0) {
            return "x"
        } else {
            return orbitalPeriod?.toFixed(2) ?? this.dotAnimation.dots;
        }
    }

    private previousOrbitalPeriods(currentOrbitalPeriod: number | undefined, orbitalPeriods: number[]): string {

        if (currentOrbitalPeriod == 0) {
            return "x";
        }

        let str = orbitalPeriods.map(ob => ob.toFixed(2)).toString();
        if (str.length == 0) {
            str = this.dotAnimation.dots;
        }

        return str;
    }

    private deviation(currentOrbitalPeriod: number | undefined, deviation: number | undefined): string {
        if (currentOrbitalPeriod == 0) {
            return "x";
        }

        return deviation?.toFixed(2) ?? this.dotAnimation.dots;
    }

    private stabilityScore(currentOrbitalPeriod: number | undefined, deviation: number | undefined): string {
        if (currentOrbitalPeriod == 0) {
            return "x";
        }

        return this.determineStabilityScore(deviation)?.toFixed(2) ?? this.dotAnimation.dots;
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