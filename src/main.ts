import './style.scss';
import SceneManager from './SceneManager';
import Config from './Enums/Config';

let sceneManager: SceneManager;

const interval = 1000 / Config.framerate;
let now, delta, then = Date.now();

window.addEventListener('DOMContentLoaded', () => {
	
	sceneManager = new SceneManager();

	render();
});

function render() {

	now = Date.now();
	delta = now - then;

	if (delta > interval) {
		sceneManager.update();
		then = now - (delta % interval);
	}

	requestAnimationFrame(render);
}

// Event listener

document.addEventListener('keydown', toggleCPUMonitor);
window.addEventListener('resize', resizeScene);

function toggleCPUMonitor(e: KeyboardEvent) {

	if (e.key == "c") {
		let cpuMonitor = document.getElementById("cpu");

		console.log(cpuMonitor?.style.display);

		if (cpuMonitor == undefined) {
			return
		}

		let cpuDisplay = cpuMonitor.style.display;

		if (cpuDisplay == "none" || cpuDisplay == "") {
			cpuMonitor.style.display = "block";
		} else {
			cpuMonitor.style.display = "none";
		}
	}

	if (e.key == "r") {
		sceneManager.reset();
	}
}

function resizeScene() {
	console.log("resize");
	sceneManager.resizeScene();
}
