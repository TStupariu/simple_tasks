import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Switch from 'material-ui/Switch';
import { InputLabel } from 'material-ui/Input';
import Divider from 'material-ui/Divider';

import { addTask } from '../services/task'

import './AddTask.css'

class AddTask extends Component {

	constructor(props) {
		super(props)
		this.state = {
			task: '',
			open: true,
			sendNotification: false
		}
	}

	closeModal() {
		this.props.closeModal(true)
	}

	handleAddTask() {
		const task = this.state.task
		if (task) {
			addTask(task)
			if (this.state.sendNotification)
				this.notifyOnAdd(task)
		}
		this.props.closeModal(true)
	}

	notifyOnAdd(task) {
		navigator.serviceWorker.register('sw.js');
		if (Notification.permission === 'granted') {
			new Notification(task);
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				new Notification(task);
			});
		}
	}

	handleEnterAdd(event) {
		switch(event.keyCode) {
			case 13:
				this.handleAddTask();
				break;	
			case 27:
				this.closeModal();
				break;
		}
	}

	render() {
		return (
			<div className="main-window">
				<Card>
					<CardContent>
						<h3>Add a task...</h3>
						<Input id="task" value={this.state.task} onKeyUp={(event) => {this.handleEnterAdd(event)}} onChange={(event) => this.setState({task: event.target.value})} autoFocus/>
						<br/>
						<div className='margin-top'>
							<InputLabel>Notification</InputLabel>
							<Switch
        			  checked={this.state.sendNotification}
        			  onChange={() => this.setState({sendNotification: !this.state.sendNotification})}
        			  value="sendNotification"
        			/>
        		</div>
					</CardContent>
					<CardActions>
        		<Divider />
						<Button className='button-width' size="small" color='primary' variant='raised' onClick={() => {this.handleAddTask()}}>Add</Button>
						<Button className='button-width' size="small" color='secondary' variant='raised' onClick={() => {this.closeModal()}}>Cancel</Button>
					</CardActions>
				</Card>
			</div>
			);
	}
}

export default AddTask;
