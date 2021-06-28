const gui = new dat.GUI();

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

	let stageWidth = window.innerWidth;
	let stageHeight = window.innerHeight;
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(45, stageWidth / stageHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();
	const spotLight = new THREE.SpotLight(0xffff00);

	spotLight.position.set(sl_pos.x, sl_pos.y, sl_pos.z);
	renderer.setClearColor(0xffffff, 1.0);
	renderer.setSize(stageWidth, stageHeight);
	renderer.shadowMap.enabled = true;

	const planeGeometry = new THREE.PlaneGeometry(plane_info.width, plane_info.height);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: plane_info.color });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);

	scene.add(plane);
	scene.add(camera);
	scene.add(spotLight);

	document.getElementById('stage').appendChild(renderer.domElement);

	renderer.render(scene, camera);
};
