import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';

import { auth } from '../services/auth'
import { addTask } from '../services/task'

import './AddTask.css'

class AddTask extends Component {

	constructor(props) {
		super(props)
		this.state = {
			task: '',
		}
	}

	closeModal() {
		this.props.closeModal(true)
	}

	handleAddTask() {
		const task = this.state.task
		if (task) {
			addTask(task)
		}
		this.props.closeModal(true)
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
					</CardContent>
					<CardActions>
						<Button size="small" color='primary' variant='raised' onClick={() => {this.handleAddTask()}}>Add</Button>
						<Button size="small" color='secondary' variant='raised' onClick={() => {this.closeModal()}}>Cancel</Button>
					</CardActions>
				</Card>
			</div>
			);
	}
}

export default AddTask;
