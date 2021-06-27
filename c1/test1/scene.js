// once everything is loaded, we run our Three.js stuff.

const setCameraPosition = (c, s) => {
	c.position.x = -30;
	c.position.y = 40;
	c.position.z = 30;
	c.lookAt(s.position);
};

const setPlanePosition = (plane) => {
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;
};

const setObjectPosition = (t, x, y, z) => {
	t.position.x = x;
	t.position.y = y;
	t.position.z = z;
};

window.onload = () => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();

	const stageWidth = window.innerWidth;
	const stageHeight = window.innerHeight;

	renderer.setClearColor(0xffffff, 1.0);
	renderer.setSize(stageWidth, stageHeight);

	const axes = new THREE.AxesHelper(20);
	scene.add(axes);

	const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);

	setPlanePosition(plane);
	scene.add(plane);

	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	setObjectPosition(cube, -4, 3, 0);

	scene.add(cube);

	const sphereGeometry = new THREE.SphereGeometry(10, 15, 16);
	const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	setObjectPosition(sphere, 20, 4, 2);
	scene.add(sphere);

	setCameraPosition(camera, scene);

	document.getElementById('WebGL-output').appendChild(renderer.domElement);

	renderer.render(scene, camera);
};
/*
function init() {
	// create a scene, that will hold all our elements such as objects, cameras and lights.
	let scene = new THREE.Scene();

	// create a camera, which defines where we're looking at.
	let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	// create a render and set the size
	let renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0xffffff), 1);
	renderer.setSize(window.innerWidth, window.innerHeight);

	// show axes in the screen
	var axes = new THREE.AxesHelper(20);
	scene.add(axes);

	// create the ground plane
	var planeGeometry = new THREE.PlaneGeometry(60, 20);
	var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

	// rotate and position the plane
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;

	// add the plane to the scene
	scene.add(plane);

	// create a cube
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	// position the cube
	cube.position.x = -4;
	cube.position.y = 3;
	cube.position.z = 0;

	// add the cube to the scene
	scene.add(cube);

	// create a sphere
	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	// position the sphere
	sphere.position.x = 20;
	sphere.position.y = 4;
	sphere.position.z = 2;

	// add the sphere to the scene
	scene.add(sphere);

	// position and point the camera to the center of the scene
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);

	// add the output of the renderer to the html element
	document.getElementById('WebGL-output').appendChild(renderer.domElement);

	// render the scene
	renderer.render(scene, camera);
}
window.onload = init;

console.log(1);
*/
