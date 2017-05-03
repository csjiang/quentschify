import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import textTransform from '../../scripts/quentschify';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      transformed: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.speakWords = this.speakWords.bind(this);
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

  speakWords(voice) {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }
    var msg = new SpeechSynthesisUtterance(this.state.transformed);
    msg.voice = voice;
    speechSynthesis.speak(msg);
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
              />
          </FormGroup>
          <Col xs={3} md={3}>
            <Button onClick={this.handleSubmit}>Submitzque</Button>
          </Col>
          <Col xs={3} md={3}>
            <Button onClick={this.setRandomText}>Need inspiration?</Button>
          </Col>
        </Col>

        <Col xs={6} md={6}>
        {
          this.state.transformed
          ? <div>
              <div>{this.state.transformed}</div>
              {
                speechSynthesis.getVoices().map((v, i) => (
                  <Button key={i} onClick={() => this.speakWords(v)}>Hear {v.name} say it</Button>
                  ))
              }
            </div>
          : null
        }
        </Col>
      </Row>
    )
  }
}
