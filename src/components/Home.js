import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Slide from 'material-ui/transitions/Slide';

import AddTask from './AddTask'
import TaskList from './TaskList'

import './Home.css'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalOpen: false
		}
	}

	handleOpenModal() {
		this.setState({modalOpen: true})
	}

	handleCloseModal() {
		this.setState({modalOpen: false})
	}

	closeModalCallback = (closeEvent) => {
		if (closeEvent) {
			this.handleCloseModal()
		}
	}

	render() {
		return (
			<Grid fluid>
        <Row className="list-row">
        	<Col md={8} mdOffset={2} xs={12}>
        		<Paper elecation={4}>
        			<TaskList/>
        		</Paper>
        	</Col>
        </Row>
      	<Button variant="fab" color="primary" aria-label="add" className="floating-fixed-button" onClick={() => {this.handleOpenModal()}}>
      	  <Icon>add</Icon>
      	</Button>
        <div>
					<Slide direction="left" in={this.state.modalOpen} mountOnEnter unmountOnExit>
						<AddTask closeModal={this.closeModalCallback}/> 
					</Slide> 
        </div>
      </Grid>
			);
	}
}

export default Home;
