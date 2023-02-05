import './style.scss';
import SceneManager from './SceneManager';

let sceneManager: SceneManager;

window.addEventListener('DOMContentLoaded', () => {
	
	sceneManager = new SceneManager();

	render();
});

function render() {
	requestAnimationFrame(render);
	sceneManager.update();
}

// Event listener

document.addEventListener('keydown', toggleCPUMonitor);

function toggleCPUMonitor(e: KeyboardEvent) {

	if (e.key == "c") {
		let cpuMonitor = document.getElementById("cpu");

		if (cpuMonitor == undefined) {
			return
		}

		if (cpuMonitor.style.display == "none") {
			cpuMonitor.style.display = "block";
		} else {
			cpuMonitor.style.display = "none";
		}
	}
}
