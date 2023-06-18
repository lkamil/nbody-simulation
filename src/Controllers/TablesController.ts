

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


    constructor() {

    }

    update(objectData: ObjectData[], orbitalData: OrbitalData[]) {
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
                    <td>${value.previousOrbitalPeriods.map(ob => ob.toFixed(2)).toString()}</td>
                    <td>${value.deviation?.toFixed(2) ?? ""}</td>
                    <td>${value.stabilityScore.toFixed(2)}</td>
                </tr>`
            );
        }).join('');

        const tableBody = document.querySelector("#orbits-table-body")!;
        tableBody.innerHTML = tableData;

        let stabilityContainer = document.getElementById("stability")!;
        let stabilityPercentages = data.map(value => { return value.stabilityScore });
        stabilityContainer.innerHTML = (stabilityPercentages.average() / 10).toFixed(2);
    }
}