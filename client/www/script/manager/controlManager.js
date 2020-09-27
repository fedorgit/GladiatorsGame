const ControlManager = {
	
	key: {

        W: false,   // {W} - 87
		S: false,	// {S} - 83
		D: false,	// {D} - 68
		A: false,	// {A} - 65
	},
	
	canvas: null,
	camera: null,
    
    border: 15,
    speedCamera: 10,
    speedWheel: 3,

    init(canvas, camera){
	
        this.canvas = canvas;
        this.camera = camera;
        
        // Событие клавиатуры: нажатие.
        addEventListener('keydown', (event) => this.keydown(event));
        
        // Событие клавиатуры: отпускание.
        addEventListener('keyup', (event) =>  this.keyup(event));
        
        // Событие мыши: движение.
        //this.canvas.addEventListener("mousemove", () => this.setMouseMove(event));
        
        // Событие мыши: нажатие.
        //this.canvas.addEventListener('mousedown', (event) => this.setMouseKey(event));
        
        // Событие мыши: колесо.
        this.canvas.addEventListener('wheel', (event) => this.onWheel(event));
    },

    update(time) {

        const speed = time * this.speedCamera;

        if(this.key.W) this.camera.position.y += speed;

        if(this.key.S) this.camera.position.y -= speed;

        if(this.key.A) this.camera.position.x -= speed;

        if(this.key.D) this.camera.position.x += speed;

        if(this.camera.position.y > this.border) this.camera.position.y = this.border;

        if(this.camera.position.y < -this.border) this.camera.position.y = -this.border;

        if(this.camera.position.x > this.border) this.camera.position.x = this.border;

        if(this.camera.position.x < -this.border) this.camera.position.x = -this.border;

    },

    keydown(e) {

        if (e.keyCode == 87) {this.key.W = true;} 		// {W} -
        if (e.keyCode == 83) {this.key.S = true;} 		// {S} - 
        if (e.keyCode == 65) {this.key.A = true;} 		// {A} - 
        if (e.keyCode == 68) {this.key.D = true;} 		// {D} - 
    },
    
    keyup(e){
        
        if (e.keyCode == 87){this.key.W = false;} 		// {W} - вверх
        if (e.keyCode == 83){this.key.S = false;} 		// {S} - вниз
        if (e.keyCode == 65){this.key.A = false;} 		// {A} - вправо
        if (e.keyCode == 68){this.key.D = false;} 		// {D} - влево
    },
    
    onWheel(event) {
	
        //var camera = ControlService.camera;
        
        // deltaY, detail содержат пиксели
        // wheelDelta не дает возможность узнать количество пикселей
        // onwheel || MozMousePixelScroll || onmousewheel
        var delta = event.deltaY || event.detail || event.wheelDelta;
    
        delta > 0 ? this.camera.position.z += this.speedWheel : this.camera.position.z -= this.speedWheel;
    
        if(this.camera.position.z > 100) this.camera.position.z = 100;
        if(this.camera.position.z < 20) this.camera.position.z = 20;
    }
	
};