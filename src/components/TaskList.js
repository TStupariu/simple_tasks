import React, { Component } from 'react';

import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAction } from 'material-ui/List';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

import { db } from '../firebase'
import { getUid } from '../services/auth'
import { setAsDone } from '../services/task'

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
			const snapshot = snap.val()
			const tasks = Object.keys(snap.val() || {}).map(k => {
				return {key: k, item: snap.val()[k]}
			});
			this.setState({tasks})
		})
	}

	handleDone(task) {
		setAsDone(task)
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
      		  		  <ListItemSecondaryAction onClick={() => {this.handleDone(el)}}>
										<Icon className="done-action">done</Icon>
              		</ListItemSecondaryAction>
      		  		</ListItem>
								)
						})
					}
      		</List> :
      		null
				}
    	</div>
			);
	}
}

export default TaskList;
