/**
 * ModelService - сервис по работе с 3D моделями GLTF формата.
 */
const ModelService = {
	
	srcModel: [
		{ id: 0, 	src: 'error.glb', 					name: 'ERROR' }
	],
	iterator: 0,
	models: {}
	
};

/**
 * Загрузка указанных моделей в сервис.
 * 
 * @param {function} callback - функция обратного вызова для уведомления загрузки всех моделей.
 */
ModelService.loaderModels = function(callback){
	
	for(let element of this.srcModel) {

		var loader = new THREE.GLTFLoader();

        loader.load(
			'model/gltf/' + element.src,
			( gltf ) => {
				
				this.models[element.id] = gltf;

				this.iterator++;
				
				if(this.iterator == this.srcModel.length) 
					callback(true);
			},
			
			// onProgress callback
			( xhr ) => {
				console.log(`${(xhr.loaded / xhr.total * 100)}% loaded` );
			},
			
			// onError callback
			( err ) => {
				console.log(`Error load: model/gltf/' + ${element.src}`);
				callback(false);
			}
		);
    }
}

/**
 * Получить копию модели, материал не копируется.
 * 
 * @param {number} id - идентификатов запрашиваемой модели.
 */
ModelService.getModel = function(id){
	
	var gltf = this.models.hasOwnProperty(id) ? this.models[id] : this.models[0];
	
	const clone = {
		animations: gltf.animations,
		scene: gltf.scene.clone(true)
	};

	const skinnedMeshes = {};

	gltf.scene.traverse(node => {
		if (node.isSkinnedMesh) {
			skinnedMeshes[node.name] = node;
		}
	});

	const cloneBones = {};
	const cloneSkinnedMeshes = {};

	clone.scene.traverse(node => {
	if (node.isBone) {
		cloneBones[node.name] = node;
	}

	if (node.isSkinnedMesh) {
		cloneSkinnedMeshes[node.name] = node;
	}
	});

	for (let name in skinnedMeshes) {
		const skinnedMesh = skinnedMeshes[name];
		const skeleton = skinnedMesh.skeleton;
		const cloneSkinnedMesh = cloneSkinnedMeshes[name];

		const orderedCloneBones = [];

		for (let i = 0; i < skeleton.bones.length; ++i) {
		  const cloneBone = cloneBones[skeleton.bones[i].name];
		  orderedCloneBones.push(cloneBone);
		}

		// Skeleton - what is this?
		cloneSkinnedMesh.bind( new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses), cloneSkinnedMesh.matrixWorld);
	}

	return clone;
}

