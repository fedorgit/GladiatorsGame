

const EngineManager = {

    canvas: null,
    scene: null,
    camera: null,
    renderer: null,
    light: null,
    clock: null,

    arenas: [],
    paths: [],
    heroes: [],

    init() {
        this.canvas = document.getElementById('js-canvas-game');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set(0, 0, 45);

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
        this.renderer.setClearColor(0xFFFFFF);
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.light = new THREE.AmbientLight(0xFFFFFF, 1);
        this.scene.add(this.light);
        
        addEventListener('resize', this.onresize);
        
        this.clock = new THREE.Clock();

        this.engine();
    },

    showArea(area) {

        // Генерация вершин(арен)

        const arenaDict = {};

        for(let arena of area.map.arenas)
            arenaDict[arena.id] = arena;

        for(let arena of area.map.arenas) {

            let geometry = new THREE.TorusBufferGeometry(1, 0.3, 10, 16);
            let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            let model = new THREE.Mesh( geometry, material );
            model.position.x = arena.x;
            model.position.y = arena.y;
            this.arenas.push(model);

            for(let id of arena.links) {

                const arenaLink = arenaDict[id];

                let material = new THREE.LineBasicMaterial({color: 0x0000ff});
                let points = [];
                points.push( new THREE.Vector3( arena.x, arena.y, 0 ) );
                points.push( new THREE.Vector3( arenaLink.x, arenaLink.y, 0 ) );
                let geometry = new THREE.BufferGeometry().setFromPoints( points );
                let line = new THREE.Line( geometry, material );

                this.paths.push(line);
            }
        }

        for(let arena of this.arenas) {

            this.scene.add(arena);
        }

        // Генерация связей(путей)
        for(let path of this.paths) {

            this.scene.add(path);
        }

        // Расположить модели героев игроков

        for(let player of area.players) {

            const hero = player.hero;

            const arena = arenaDict[hero.arenaId];

            const gltf = ModelService.getModel(hero.modelId);

            gltf.scene.position.x = arena.x;
            gltf.scene.position.y = arena.y;

            this.heroes.push(gltf.scene);
        }

        for(let hero of this.heroes) {

            this.scene.add(hero);
        }


        // Выделить (подсветить) пути возможного перемещения

        

    },

    showBattle(battle) {


    },

    engine() {
	
        requestAnimationFrame( () => this.engine() );
    
        var time = this.clock.getDelta();
    
        //UnitService.updateAnimationUnits(time);
        
        this.renderer.render( this.scene, this.camera );
    }
}