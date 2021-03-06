import {createStore, applyMiddleware} from 'redux';
import {createLogger }from 'redux-logger';
import socket from './socket';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'
export const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_STORE'

export const WRITE_MESSAGE = 'WRITE_MESSAGE'

export const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'

export const GOT_NAME = 'GOT_NAME'

export const initialState = {
	messages: [], newMessageEntry: '', name: ''
}
export const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export function fetchMessages () {

	// our "thunk"
	return function thunk (dispatch) {

		return axios.get('/api/messages')
		.then(res => res.data)
		.then(messages => {
			const action = gotMessagesFromServer(messages);
			// note that we can just "dispatch", rather than "store.dispatch"
			dispatch(action);
		});
	}

}

export function getName (name) {
	const action = { type: GOT_NAME, name };
	return action;
}

export const getNameFromServer = function ( name) {
	return {
		type: 'GOT_NAME', name:name
	}
}

export function postMessage (message) {
	return function thunk (dispatch) {
		return axios.post('/api/messages', message)
		.then(res => res.data)
		.then(newMessage => {
			const action = gotMessagesFromServer(newMessage)
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
		case GOT_NAME:
					return {
						...state, name: action.name
					}

		default:
			return state;
	}
}

