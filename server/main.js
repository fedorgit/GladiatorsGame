const WebSocket = require('ws');

const Enum = require('./enum.js');

const configService = require('./service/configService.js');

const DataManager =  require('./dataManager.js');

const Controller = require('./controller.js')

const User = require('./model/user.js')

const Client = require('./model/client.js');
const GameManager = require('./gameManager.js');



configService.init('./config.json');

DataManager.mapService.loadMaps('./resource/map', ['example.json', 'general.json']);

const host = configService.config['host'];
const port = configService.config['port'];

const ws = new WebSocket.Server({
	host: host,
	port: port,
	maxPayload: 10 * 1024 * 1024
});

console.log(`Start service: ${host}:${port}`);

ws.on('connection', (wsi, request, currentClient) => {

	let client = new Client(wsi, ClientStatusEnum.CONNECT);
	
	currentClient = DataManager.clientService.add(client);

	console.log(`Connect new client with id: ${currentClient.id}`);
	
	wsi.on('message', (message) => {
		
		try {

			console.log(`Client id: ${currentClient.id} sent message: ${message}`);

			let data = JSON.parse(message);

			if(!Controller.route(currentClient, data)) {

				console.log(`Error data client id: ${currentClient.id}`);

				wsi.close();
			}


		} catch(error) {

			console.error(`User id: ${currentClient.id} error : data processing`);

			console.log(`Exeption ${error.name}: ${error.message} ${error.stack}`);

			wsi.close();

			DataManager.userService.remove(currentClient.id);

			return;
		}
	});

	wsi.on('close', () => {

		GameManager.closeClient(currentClient);

		console.log(`User with id ${currentClient.id} close`)
	});
});