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
	const spotLight = new THREE.SpotLight(0xffffff);

	const stageWidth = window.innerWidth;
	const stageHeight = window.innerHeight;

	renderer.setClearColor(0xffffff, 1.0);
	renderer.setSize(stageWidth, stageHeight);
	renderer.shadowMapEnabled = true;

	// 그림자 사용을 허용한다 1)
	// 그림자를 생성시킬 객체 , => castShadow = true
	// 그림자를 생성당할 객체, => receiveShadow = true
	// 모든 광원이 그림자를 생성시키는건 아니므로, 어떤 빛이 그림자를 생성시킬지, LIGHT.castShadow = true

	setObjectPosition(spotLight, -40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);

	const axes = new THREE.AxesHelper(20);
	scene.add(axes);

	const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	setPlanePosition(plane);
	scene.add(plane);

	const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;

	setObjectPosition(cube, -4, 3, 0);

	scene.add(cube);

	const sphereGeometry = new THREE.SphereGeometry(4, 15, 16);
	const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.castShadow = true;

	setObjectPosition(sphere, 20, 4, 2);
	scene.add(sphere);

	setCameraPosition(camera, scene);

	document.getElementById('WebGL-output').appendChild(renderer.domElement);

	renderer.render(scene, camera);
};
