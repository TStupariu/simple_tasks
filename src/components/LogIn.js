import React, { Component } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import './LogIn.css'

import { Grid, Row, Col } from 'react-flexbox-grid';

import { register, login, setToken } from '../services/auth'

class LogIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
      passconf: '',
      showConfirmation: false
    }
  }

  async handleRegister() {
    if (!this.state.showConfirmation) {
      this.setState({showConfirmation: !this.state.showConfirmation})
    } else {
      if (this.state.pass === this.state.passconf) {
        const response = await register(this.state.email, this.state.pass)
        if (response) {
          const token = {
            'email': response.email,
            'uid': response.uid
          }
          setToken(token)
          this.props.history.push('/')
        }
      } else {
        alert("Passwords do not match!")
      }
    }
  }

  async handleLogin() {
    const response = await login(this.state.email, this.state.pass)
    if (response) {
      const token = {
        'email': response.email,
        'uid': response.uid
      }
      setToken(token)
      this.props.history.push('/')
    } else {
      alert("INCORRECT DATA")
    }
  }

  render() {
    return (
    <div>
      <Grid fluid className='loginContainer'>
        <Row>
          <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={4} lgOffset={4}>
            <Paper elevation={4} className='paper'>
              <Row center='xs' className='form-row'>
                <FormControl className='form-element'>
                  <InputLabel htmlFor="name-simple">Email</InputLabel>
                  <Input id="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} />
                </FormControl>
              </Row>
              <Row center='xs' className='form-row'>
                <FormControl className='form-element'>
                  <InputLabel htmlFor="name-helper">Password</InputLabel>
                  <Input id="password" type='password' value={this.state.pass} onChange={(event) => this.setState({pass: event.target.value})} />
                </FormControl>
              </Row>
              {
                this.state.showConfirmation ? (
                  <Row center='xs' className='form-row'>
                    <FormControl className='form-element'>
                      <InputLabel htmlFor="name-disabled">Password Confirmation</InputLabel>
                      <Input id="password-confirmation" type='password' value={this.state.passconf} onChange={(event) => this.setState({passconf: event.target.value})} />
                    </FormControl>
                  </Row>)
                : null
              }
              <Row center='xs' className='form-row'>
                <FormControl className='form-element'>
                  <Row>
                    <Col xs={6}>
                      <Button variant='raised' color='primary' onClick={() => this.handleLogin()}>Log In</Button>
                    </Col>
                    <Col xs={6}>
                      <Button variant='raised' color='secondary' onClick={() => this.handleRegister()}>Register</Button>
                    </Col>
                  </Row>
                </FormControl>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Grid>
    </div>
      );
  }
}

export default LogIn;
