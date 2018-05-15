import React, { Component } from 'react';

import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Icon from 'material-ui/Icon';

import { db } from '../firebase'
import { getUid } from '../services/auth'
import { setAsDone, deleteTask } from '../services/task'

import './TaskList.css'

class TaskList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: []
		}
	}

	componentDidMount() {
		const uid = getUid()
		db.ref(`/users/${uid}/tasks/wip`).on('value', (snap) => {
			const tasks = Object.keys(snap.val() || {}).map(k => {
				return {key: k, item: snap.val()[k]}
			});
			this.setState({tasks})
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

	render() {
		return (
			<div>
				{
					this.state.tasks.length > 0 ?
					<List component="nav">
					{
						this.state.tasks.map((el, idx) => {
							return (
								<ListItem button key={el.key}>
      		  		  <ListItemText primary={el.item.title} classes={{root: 'text-overflow'}}/>
      		  		  <ListItemSecondaryAction>
										<Icon className="action delete-action" onClick={() => {this.handleDelete(el)}}>delete</Icon>
										<Icon className="action done-action" onClick={() => {this.handleDone(el)}}>done</Icon>
              		</ListItemSecondaryAction>
      		  		</ListItem>
								)
						})
					}
      		</List> :
					<img src='./loading.gif' className='loadingImage'/>
				}
    	</div>
			);
	}
}

export default TaskList;
