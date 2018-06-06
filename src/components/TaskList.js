import React, { Component } from 'react';

import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';

import Icon from 'material-ui/Icon';

import { db } from '../firebase'
import { getUid } from '../services/auth'
import { setAsDone, deleteTask } from '../services/task'

import EditTask from './EditTask'

import './TaskList.css'

class TaskList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: [],
			editModalOpen: false,
			taskToEdit: null,
			isLoading: true
		}
	}

	componentDidMount() {
		const uid = getUid()
		db.ref(`/users/${uid}/tasks/wip`).on('value', (snap) => {
			const tasks = Object.keys(snap.val() || {}).map(k => {
				return {key: k, item: snap.val()[k]}
			});
			this.setState({tasks: tasks, isLoading: false})
		})
	}

	handleDone(task) {
		setAsDone(task)
	}

	handleDelete(task) {
		if (window.confirm('Are you sure you want to delete?')) {
			deleteTask(task)
		}
	}

	handleEdit(task) {
		this.setState({editModalOpen: true, taskToEdit: task})
	}

	handleCloseModal() {
		this.setState({editModalOpen: false})
	}

	render() {
		return (
			<div>
			{
				!this.state.isLoading && this.state.tasks.length > 0 ?
				<List component="nav">
				{
					this.state.tasks.map((el, idx) => {
						return (
							<ListItem button key={el.key}>
								<ListItemText primary={el.item.title} classes={{root: 'text-overflow'}} onClick={() => {this.handleEdit(el)}}/>
								<ListItemSecondaryAction>
									<Icon className="action delete-action" onClick={() => {this.handleDelete(el)}}>delete</Icon>
									<Icon className="action done-action" onClick={() => {this.handleDone(el)}}>done</Icon>
								</ListItemSecondaryAction>
								<hr />
							</ListItem>
							)
					})
				}
				</List> :
					this.state.isLoading ?
					<img src='./loading.gif' className='loadingImage'/> :
					<div  className="no-tasks">
						<img src='./2.png'/>
						<p>No pending tasks</p>
					</div>
			}
			<div>
				<Slide direction="left" in={this.state.editModalOpen} mountOnEnter unmountOnExit>
					<EditTask task={this.state.taskToEdit} closeModal={() => {this.handleCloseModal()}}/> 
				</Slide> 
			</div>
			</div>
			);
	}
}

export default TaskList;
