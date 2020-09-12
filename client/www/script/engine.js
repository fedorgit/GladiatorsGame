

let Engine = {

	renderer: 	null,
	scene: 		null,
	camera: 	null,
	clock: 		new THREE.Clock(),

	start() {

		renderer = new THREE.WebGLRenderer({ antialias: true} );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setPixelRatio( window.devicePixelRatio );
		document.body.appendChild( renderer.domElement );
	
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);
		camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
		camera.position.z = 100;
		camera.lookAt(scene.position);
		scene.add(camera);
	
		var light = new THREE.PointLight(0xffffff);
		light.position.set(0, 200, 0);
		scene.add(light);
	
		engine();
	},

	engine() {

		requestAnimationFrame( engine );
	
		var dt = clock.getDelta();
		effect.update( dt );
	
		renderer.render( scene, camera );
	}
}