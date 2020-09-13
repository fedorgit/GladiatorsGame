
const url = 'ws://127.0.0.1:8080';
let socket = null;
let isLoad = false;


window.addEventListener('load', () => {
	init();
});

function init() {

	ModelService.loaderModels((status) => {
		isLoadImage = status; 
		onLoadСomplet();
	});
}

function onLoadСomplet() {

	if(isLoadImage)
		isLoad = true;
}

function connect() {

	if(socket != null) {

		console.log(`[socket] Connection is already established`);

		return;
	}

	if(!isLoad) {

		console.log(`[load] Not loading game data`);

		return;
	}
	
	socket = new WebSocket(url);

	socket.onopen = (event) => {
		
		let name = ViewService.getViewConnectName();

		let data = {
			name: name
		}

		socket.send(JSON.stringify(data));
		
		//CurrentUser.statusUserEnum = StatusUserEnum.CONNECT;
	};

	socket.onmessage = (event) => {
		
		try {

			let data = JSON.parse(event.data);

			console.log(data);

			Terminal.route(data);

		} catch (error) {
			
			console.log(`Exeption ${error.name}: ${error.message} ${error.stack}`);
		}
	};

	socket.onclose = (event) => {

		if (event.wasClean)
			console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
		else
			console.log('[close] Соединение прервано');
	};

	socket.onerror = (error) => {

		console.log(`[error] ${error.message}`);
	};
	
}

document.oncontextmenu = function(e){return false};
document.ondrag = function(e){return false};
document.ondragdrop = function(e){return false};
document.ondragstart = function(e){return false};
