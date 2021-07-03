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

const addGeoMetries = (scene) => {
	const geoms = [];

	geoms.push(new THREE.CylinderGeometry(1, 4, 4));
	geoms.push(new THREE.BoxGeometry(2, 2, 2));
	geoms.push(new THREE.SphereGeometry(2));
	geoms.push(new THREE.IcosahedronGeometry(4));

	const points = [
		new THREE.Vector3(2, 2, 2),
		new THREE.Vector3(2, 2, -2),
		new THREE.Vector3(-2, 2, -2),
		new THREE.Vector3(-2, 2, 2),
		new THREE.Vector3(2, -2, 2),
		new THREE.Vector3(2, -2, -2),
		new THREE.Vector3(-2, -2, -2),
		new THREE.Vector3(-2, -2, 2)
	];
	geoms.push(new ConvexGeometry(points));

	const vertex = [];
	const detail = 0.1;
	const radius = 3;
	for (let angle = 0.0; angle < Math.PI; angle += detail) {
		vertex.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
	}
	geoms.push(new THREE.LatheGeometry(vertex, 12));
	geoms.push(new THREE.OctahedronGeometry(THREE.ParametricGeometry.mobius3d, 20, 10));
	geoms.push(new THREE.TetrahedronGeometry(3, 1, 10, 10));
	geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));
	geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

	let j = 0;
	let cnt = 0;
	for (let i = 0; i < geoms.length; i++) {
		const cubeMaterial = new THREE.MeshLambertMaterial({ wireframe: true, color: Math.random() * 0xffffff });

		const materials = [
			new THREE.MeshLambertMaterial({
				color: Math.random() * 0xffffff,
				//color: cnt * 0xffffff,
				shading: THREE.FlatShading
			}),
			new THREE.MeshBasicMaterial({
				color: 0x000000,
				wireframe: true
			})
		];

		cnt = cnt + 0.07;
		const mesh = SceneUtils.createMultiMaterialObject(geoms[i], materials);
		mesh.traverse((e) => {
			e.castShadow = true;
		});

		mesh.position.x = -24 + (i % 4) * 12;
		mesh.position.y = 4;
		mesh.position.z = -12 + j * 6;

		if ((i + i) % 4 == 0) {
			j++;
		}

		scene.add(mesh);
	}

	console.log(geoms);
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

	addGeoMetries(scene);
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
