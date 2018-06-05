import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Switch from 'material-ui/Switch';
import { InputLabel } from 'material-ui/Input';
import Divider from 'material-ui/Divider';

import { editTaskName } from '../services/task'

import './AddTask.css'

class AddTask extends Component {

	constructor(props) {
		super(props)
		this.state = {
			task: '',
			open: true
		}
	}

	componentDidMount() {
		this.setState({task: this.props.task.item.title})
	}

	closeModal() {
		this.props.closeModal(true)
	}

	handleSave() {
		editTaskName(this.props.task.key, this.state.task)
		this.closeModal()
	}

	render() {
		return (
			<div className="main-window">
				<Card>
					<CardContent>
						<h3>Edit</h3>
						<Input id="task" value={this.state.task} onChange={(event) => this.setState({task: event.target.value})} autoFocus/>
					</CardContent>
					<CardActions>
        		<Divider />
						<Button className='button-width' size="small" color='primary' variant='raised' onClick={() => {this.handleSave()}}>Save</Button>
						<Button className='button-width' size="small" color='secondary' variant='raised' onClick={() => {this.closeModal()}}>Cancel</Button>
					</CardActions>
				</Card>
			</div>
			);
	}
}

export default AddTask;
