import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Slide from 'material-ui/transitions/Slide';

import AddTask from './AddTask'
import TaskList from './TaskList'

import { signout } from '../services/auth'

import './Home.css'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalOpen: false
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.keyCode === 65) {
      	this.handleOpenModal()
      }
    });
	}

	handleOpenModal() {
		this.setState({modalOpen: true})
	}

	handleCloseModal() {
		this.setState({modalOpen: false})
	}

	handleSignOut() {
		signout()
		this.props.history.push('/login')
	}

	closeModalCallback = (closeEvent) => {
		if (closeEvent) {
			this.handleCloseModal()
		}
	}

	render() {
		return (
		<div>
			<Grid fluid className="offset-bottom">
				<Row className="list-row">
					<Col md={8} mdOffset={2} xs={12}>
						<Paper elecation={4}>
							<TaskList/>
						</Paper>
					</Col>
				</Row>
				<div>
					<Slide direction="left" in={this.state.modalOpen} mountOnEnter unmountOnExit>
						<AddTask closeModal={this.closeModalCallback}/> 
					</Slide> 
				</div>
			</Grid>
			<div className="floating-bottom">
				<Button variant="raised" color="secondary" className="fixed-button" onClick={() => {this.handleSignOut()}}>Sign out</Button>						
				<Button variant="fab" color="primary" aria-label="add" className="fixed-button" onClick={() => {this.handleOpenModal()}}>
					<Icon>add</Icon>
				</Button>
			</div>
		</div>
		);
	}
}

export default Home;
