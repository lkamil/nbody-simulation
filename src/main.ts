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
