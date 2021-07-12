import * as THREE from './three/build/three.module.js';
import { ConvexGeometry } from './three/examples/jsm/geometries/ConvexGeometry.js';
//import { TetrahedronGeometry } from './three/src/geometries/TetrahedronGeometry.js';
import { SceneUtils } from './three/examples/jsm/utils/SceneUtils.js';

const setObjPosition = (o, x, y, z) => {
	o.position.x = x;
	o.position.y = y;
	o.position.z = z;
};

const initStats = () => {
	const stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementById('stage').appendChild(stats.domElement);
	return stats;
};

const init = () => {
	const cam_pos = {
		x: -80,
		y: 60,
		z: 40,
		lookDir: new THREE.Vector3(0, 0, 0)
	};

	const plane_info = {
		width: 60,
		height: 40,
		color: 0x00ffff
	};

	const vertice = [
		new THREE.Vector3(1, 3, 1),
		new THREE.Vector3(1, 3, -1),
		new THREE.Vector3(1, -1, 1),
		new THREE.Vector3(1, -1, -1),
		new THREE.Vector3(-1, 3, -1),
		new THREE.Vector3(-1, 3, 1),
		new THREE.Vector3(-1, -1, -1),
		new THREE.Vector3(-1, -1, 1)
	];

	const faces = [
		new THREE.Face3(0, 2, 1),
		new THREE.Face3(2, 3, 1),
		new THREE.Face3(4, 6, 5),
		new THREE.Face3(6, 7, 5),
		new THREE.Face3(4, 5, 1),
		new THREE.Face3(5, 0, 1),
		new THREE.Face3(7, 6, 2),
		new THREE.Face3(6, 3, 2),
		new THREE.Face3(5, 7, 0),
		new THREE.Face3(7, 2, 0),
		new THREE.Face3(1, 3, 4),
		new THREE.Face3(3, 6, 4)
	];

	const stats = initStats();

	const stageWidth = window.innerWidth;
	const stageHeight = window.innerHeight;
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(45, stageWidth / stageHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();
	const planeGeometry = new THREE.PlaneGeometry(plane_info.width, plane_info.height, 1, 1);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: plane_info.color });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	const spotLight = new THREE.SpotLight(0xffffff);
	const ambientLight = new THREE.AmbientLight(0x090909);
	const axes = new THREE.AxesHelper(210);

	scene.add(axes);

	spotLight.castShadow = true;
	renderer.setClearColor(0xffffff, 1.0);
	renderer.setSize(stageWidth, stageHeight);
	renderer.shadowMap.enabled = true;

	plane.rotation.x = Math.PI * -0.5;
	plane.receiveShadow = true;

	spotLight.position.set(-40, 40, 50);
	//setObjPosition(spotLight, -40 , 40 , 50);
	setObjPosition(camera, cam_pos.x, cam_pos.y, cam_pos.z);
	setObjPosition(plane, 0, 0, 0);
	camera.lookAt(cam_pos.lookDir);

	scene.add(ambientLight);
	scene.add(spotLight);
	scene.add(camera);
	scene.add(plane);

	const geom = new THREE.Geometry();
	geom.vertices = vertice;
	geom.faces = faces;
	geom.computeFaceNormals();

	const materials = [
		new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x44ff44, transparent: true }),
		new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
	];

	scene.add(mesh);

	document.getElementById('stage').appendChild(renderer.domElement);

	const animate = () => {
		stats.update();

		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	};
	console.log(scene.children);
	animate();
};

window.onload = init;
