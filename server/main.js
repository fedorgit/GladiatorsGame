const WebSocket = require('ws');

const Enum = require('./enum.js');

const configService = require('./service/configService.js');

const Controller = require('./controller.js')

const User = require('./model/user.js');
const userService = require('./service/userService.js');


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

ws.on('connection', (wsi, request, currentUser) => {

    let user = new User(wsi, StatusUserEnum.CONNECT);
	
	currentUser = userService.add(user);

	console.log(`Connect new user with id: ${user.id}`);
	
	wsi.on('message', (message) => {
		
		try {

			console.log(`User id: ${currentUser.id} sent message: ${message}`);

			let data = JSON.parse(message);

			Controller.route(currentUser, data);

		} catch(error) {

			console.error(`User id: ${currentUser.id} error : data processing`);

			console.log(`Exeption ${error.name}: ${error.message} ${error.stack}`);

			wsi.close();

			userService.remove(currentUser.id);

			return;
		}
	});

	wsi.on('close', () => {

		console.log(`User with id ${currentUser.id} close`)
	});

	wsi.on('disconnect', () => {

		console.log(`User with id ${currentUser.id} disconnected`)
	});
});