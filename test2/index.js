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
	
	scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	
	renderer.setClearColor(0xffffff, 1.0);
	renderer.setSize(stageWidth, stageHeight);
	renderer.shadowMap.enabled = true;

	const planeGeometry = new THREE.PlaneGeometry(plane_info.width, plane_info.height, 1, 1);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: plane_info.color });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.receiveShadow = true;
	plane.rotation.x = -0.5 * Math.PI;
	setObjPosition(plane, 0, 0, 0);

	setObjPosition(camera, 30, 30, 30);
	camera.lookAt(scene.position);
	

	const ambientLight = new THREE.AmbientLight(0x0c0c0c);



	const spotLight = new THREE.SpotLight(0xaaaaaa);
	spotLight.position.set(sl_pos.x,sl_pos.y,sl_pos.z);
	spotLight.castShadow = true;

	scene.fog = new THREE.Fog(0xfcfcfc , 0.15 , 80);
	scene.add(plane);
	scene.add(camera);
	scene.add(ambientLight);
	scene.add(spotLight);


	document.getElementById('stage').appendChild(renderer.domElement);
	
	class Control{
		constructor(){
			this.cameraX = 1;
			this.cameraY = 1;
			this.cameraZ = 1;
			this.rotationSpeed = 0.02;
			this.numberOfObjects = scene.children.length;
		}

		removeCube(){
			let allChildren = scene.children;
			let lastObject = allChildren[allChildren.length - 1];

			if(lastObject instanceof THREE.Mesh) {
				scene.remove(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		}

		addCube(){
			let cubeSize = Math.ceil((Math.random() * 3));
			let cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
			let cubeMaterial = new THREE.MeshLambertMaterial({color : Math.random() * 0xffffff});
			const cube = new THREE.Mesh(cubeGeometry , cubeMaterial);

			cube.castShadow = true
			cube.name = "cube-" + scene.children.length;

			// cube constrution end point

			cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
			cube.position.y = Math.round((Math.random() * 5));
			cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

			scene.add(cube);
			this.numberOfObjects = scene.children.length;		
		}

		outputObjects(){

			for(let i = 0 ; i < scene.children.length ; i ++){
				console.log(scene.children[i].type);
			}
			console.dir(scene.children);
		}

	}

	const gui = new dat.GUI();
	const controls = new Control();

	gui.add(controls, 'cameraX', -50, 50);
	gui.add(controls, 'cameraY', -50, 50);
	gui.add(controls, 'cameraZ', -50, 50);
	gui.add(controls, 'rotationSpeed' , 0 , 0.5);
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
	gui.add(controls, 'outputObjects');
	gui.add(controls, 'numberOfObjects').listen();

	const animate =() => {
		stats.update();

		scene.traverse( e => {
			if( e instanceof THREE.Mesh && e != plane){
				e.rotation.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed;
			}
		})

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
