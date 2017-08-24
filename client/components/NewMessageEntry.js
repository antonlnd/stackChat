import React, { Component } from 'react';
import { fetchMessages, postMessage, store, writeMessage } from '../store'
// import { applware, createStore } from 'redux';
// import {createLogger }from 'redux-logger';
// import {loggerMiddlew

import axios from 'axios'
import socket from '../socket'
export default class NewMessageEntry extends Component {
	constructor() {
		super();
		this.state = store.getState();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this)

	}


	componentDidMount() {
		this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
		const thunk = fetchMessages()
		store.dispatch(thunk)

	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleChange( event ) {
		store.dispatch(writeMessage(event.target.value))
	}

	handleSubmit( evt ) {
		evt.preventDefault(); // don't forget to preventDefault!
		const content = this.state.content
		let channelId = this.props.channelId


	}

	render() {
		const handleChange = this.handleChange;
		const handleSubmit = this.handleSubmit;
		return (
			<form id="new-message-form" onSubmit={handleSubmit} >
				<div className="input-group input-group-lg">
					<input
						className="form-control"
						type="text"
						name="content"
						placeholder="Say something nice..."
						onChange={handleChange}
					/>
					<span className="input-group-btn">
            <button className="btn btn-default" type="submit" >Chat!</button>
          </span>
				</div>
			</form>
		);
	}
}
