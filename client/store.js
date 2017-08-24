import {createStore, applyMiddleware} from 'redux';
import {createLogger }from 'redux-logger';
import socket from './socket';
import thunkMiddleware from 'redux-thunk';
export const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_STORE'

export const WRITE_MESSAGE = 'WRITE_MESSAGE'

export const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'

export const initialState = {
	messages: [], newMessageEntry: ''
}
export const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export function fetchMessages () {
	return  function thunk (){
		return axios.get('/api/messages')
			.then(res => res.data)
			.then(messages => this.setState({ messages }))
			.then(msg => {
				const action = gotMessagesFromServer(msg)
			dispatch(action)
		})
	}
}

export function postMessage (message) {
	return function thunk (dispatch) {
		return axios.post('/api/messages', message)
		.then(res => res.data)
		.then(newMessage => {
			const action = getMessage(newMessage);
			dispatch(action);
			socket.emit('new-message', newMessage);
		});
	}
}
export const gotMessagesFromServer = function ( messages ) {
	return {
		type: 'GOT_MESSAGES_FROM_SERVER', messages: messages
	}
}


export function writeMessage( content ) {
	const action = {
		type: WRITE_MESSAGE, content
	}
	return action
}

export function gotNewMessageFromServer( message ) {
	console.log(message)
	const action = {
		type: GOT_NEW_MESSAGE_FROM_SERVER, message: message
	};
	return action
}

export function reducer( state = initialState, action ) {
	// console.log(action)
	switch (action.type) {
		case GOT_MESSAGES_FROM_SERVER:
			return {
				...state, messages: action.messages
			}
		case GOT_NEW_MESSAGE_FROM_SERVER:
			return {
				...state, content: action.message
			}
		case WRITE_MESSAGE:
			return {
				...state, content: action.content
			}

		default:
			return state;
	}
}

