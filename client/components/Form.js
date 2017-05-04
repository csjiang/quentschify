import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button, Well } from 'react-bootstrap';

import textTransform from '../../scripts/quentschify';

import Speak from './Speak';

import classnames from 'classnames/bind';
import s from './App.styl';
const cx = classnames.bind(s);

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
    return text.replace(/(?:<([^>]+)>|&amp;)/ig, '');
  }

  setRandomText() {
    fetch('http://hipsterjesus.com/api/')
    .then(response => response.json())
    .then(({ text }) => this.setState({ text: this.cleanText(text) }))
  }

  render() {
    return (
      <Row style={{ paddingTop: '20px' }}>
        <Col xs={6} md={6}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel className={cx('white')}>Ready for your useless birthdzay giftqhuet?</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter some text here to see it made festive."
              value={this.state.text}
              onChange={this.handleChange}
              style={{ height: '50vh' }}
              />
          </FormGroup>
          <Col xs={3} md={3}>
            <Button bsStyle="info" onClick={this.handleSubmit}>Submitzque</Button>
          </Col>
          <Col xs={3} md={3}>
            <Button onClick={this.setRandomText}>Need inszpiration?</Button>
          </Col>
        </Col>

        <Col xs={6} md={6}>
        {
          this.state.transformed
          ? <div>
              <Speak text={this.state.transformed}/>
              <div className={cx('white')} style={{ paddingTop: '20px'}}><small>You may have to wait a few seconds before the text-to-speech functionality loads.</small></div>
              <Well style={{ marginTop: '20px' }}>{this.state.transformed}</Well>
            </div>
          : <div style={{ paddingTop: '20%' }} className="text-center">Your tecquest will appear here when it's readzy</div>
        }
        </Col>
      </Row>
    )
  }
}
