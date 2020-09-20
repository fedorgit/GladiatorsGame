const WebSocket = require('ws');

const Enum = require('./enum.js');

const configService = require('./service/configService.js');

const Controller = require('./controller.js')

const User = require('./model/user.js');
const userService = require('./service/userService.js');

const Client = require('./model/client.js')
const clientService = require('./service/clientService.js');

//import Room from "./room/room.js";
//import RoomService from "./room/roomService.js";

//import GamePlayService from "./gamePlayService.js";



configService.init('./config.json');

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
	
	currentClient = clientService.add(client);

	console.log(`Connect new client with id: ${currentClient.id}`);
	
	wsi.on('message', (message) => {
		
		try {

			console.log(`Client id: ${currentClient.id} sent message: ${message}`);

			let data = JSON.parse(message);

			if(!Controller.route(currentClient, data)) {

				console.log(`Error data client id: ${currentClient.id}`);

				wsi.close();

				clientService.remove(currentClient.id);
			}


		} catch(error) {

			console.error(`User id: ${currentClient.id} error : data processing`);

			console.log(`Exeption ${error.name}: ${error.message} ${error.stack}`);

			wsi.close();

			userService.remove(currentClient.id);

			return;
		}
	});

	wsi.on('close', () => {

		console.log(`User with id ${currentClient.id} close`)
	});

	wsi.on('disconnect', () => {

		console.log(`User with id ${currentClient.id} disconnected`)
	});
});