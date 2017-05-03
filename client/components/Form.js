import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import textTransform from '../../scripts/quentschify';

import Speak from './Speak';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      transformed: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRandomText = this.setRandomText.bind(this);
    this.cleanText = this.cleanText.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      transformed: textTransform(this.state.text)
    });
  }

  cleanText(text) {
    return text.replace(/(<([^>]+)>)/ig, '');
  }

  setRandomText() {
    fetch('http://hipsterjesus.com/api/')
    .then(response => response.json())
    .then(({ text }) => this.setState({ text: this.cleanText(text) }))
  }

  render() {
    return (
      <Row>
        <Col xs={6} md={6}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Isn't this a useless birthday gift?</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter some text here to see it made festive."
              value={this.state.text}
              onChange={this.handleChange}
              style={{ height: '50vh' }}
              />
          </FormGroup>
          <Col xs={3} md={3}>
            <Button onClick={this.handleSubmit}>Submitzque</Button>
          </Col>
          <Col xs={3} md={3}>
            <Button onClick={this.setRandomText}>Need inszpiration?</Button>
          </Col>
        </Col>

        <Col xs={6} md={6}>
        {
          this.state.transformed
          ? <div>
              <div>{this.state.transformed}</div>
              <Speak text={this.state.transformed}/>
            </div>
          : null
        }
        </Col>
      </Row>
    )
  }
}
