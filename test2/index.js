const gui = new dat.GUI();

const controls = {
	cameraX: 1,
	cameraY: 1,
	cameraZ: 1
};

gui.add(controls, 'cameraX', -50, 50);
gui.add(controls, 'cameraY', -50, 50);
gui.add(controls, 'cameraZ', -50, 50);

window.onload = () => {
	const sl_pos = {
		x: -40,
		y: 60,
		z: -10
	};

	const plane_info = {
		width: 60,
		height: 40,
		color: 0x00ff00
	};

	const stats = initStats();

	let stageWidth = window.innerWidth;
	let stageHeight = window.innerHeight;
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(45, stageWidth / stageHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();
	const spotLight = new THREE.SpotLight(0x2f0f3f);

	spotLight.position.set(sl_pos.x, sl_pos.y, sl_pos.z);
	renderer.setClearColor(0xffffff, 1.0);
	renderer.setSize(stageWidth, stageHeight);
	renderer.shadowMap.enabled = true;

	const planeGeometry = new THREE.PlaneGeometry(plane_info.width, plane_info.height, 1, 1);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: plane_info.color });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;
	setObjPosition(plane, 0, 0, 0);

	setObjPosition(camera, controls.cameraX, controls.cameraY, controls.cameraZ);
	camera.lookAt(scene.position);
	scene.add(plane);
	scene.add(camera);

	//scene.add(spotLight);

	document.getElementById('stage').appendChild(renderer.domElement);

	const animate =() => {
		stats.update();
		setObjPosition(camera, controls.cameraX, controls.cameraY, controls.cameraZ);
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}
	animate();
};

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
