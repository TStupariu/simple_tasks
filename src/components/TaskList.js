import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { db } from '../firebase'
import { getUid } from '../services/auth'

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
		db.ref(`/users/${uid}/tasks`).on('value', (snap) => {
			const snapshot = snap.val()
			const tasks = Object.keys(snap.val() || {}).map(k => {
				return {key: k, item: snap.val()[k]}
			});
			this.setState({tasks})
		})
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
      		  		  <ListItemText primary={el.item.title} className='text-overflow'/>
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
