import './style.scss';
import SceneManager from './SceneManager';

let sceneManager: SceneManager;
let animationRequest: any;

window.addEventListener('DOMContentLoaded', () => {
	
	sceneManager = new SceneManager();

	render();
});

function render() {
	animationRequest = requestAnimationFrame(render);
	sceneManager.update();
}
