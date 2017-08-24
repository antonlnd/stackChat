import io from 'socket.io-client';
import { gotNewMessageFromServer, store, writeMessage } from './store'


const socket = io(window.location.origin);


socket.on('connect', function () {
	console.log('I am now connected to the server!');

	socket.on('new-message', function (message) {
		store.dispatch(gotNewMessageFromServer(message));
	});
});
export default socket;
