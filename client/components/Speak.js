import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';

import classnames from 'classnames/bind';
import s from './App.styl';
const cx = classnames.bind(s);

export default class Speak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voice: null,
      voices: [],
      speaking: false,
      sameVoice: false
    };
    this.toggleSpeech = this.toggleSpeech.bind(this);
    this.setVoice = this.setVoice.bind(this);
  }

  componentDidMount() {
    window.speechSynthesis.onvoiceschanged = () => {
      let voices = window.speechSynthesis.getVoices();
      this.setState({ voices });
    };
  }

  toggleSpeech() {
    let { sameVoice, speaking, voice } = this.state;

    if (speaking) {
      window.speechSynthesis.pause();
      speaking = false;
      sameVoice = true;
    } else {
      if (sameVoice) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        let msg = new window.SpeechSynthesisUtterance(this.props.text);
        msg.voice = voice;
        window.speechSynthesis.speak(msg);
      }
      speaking = true;
    }

    this.setState({ speaking, sameVoice });
  }

  setVoice(e) {
    let { speaking, voice, voices } = this.state;
    const voiceName = e.target.value;
    const match = voice && voice.name === voiceName;

    if (!match) {
      if (speaking) window.speechSynthesis.cancel();

      let voice = voices.find(v => v.name === voiceName);
      this.setState({ voice, speaking: false, sameVoice: false });
    }
  }

  render() {
    return (
      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel className={cx('white')}>Pick your voiscze</ControlLabel>
          <FormControl componentClass="select" placeholder="vox populi" onChange={this.setVoice}>
            {
              this.state.voices
              .map((v, i) => (
                <option key={i} value={v.name}>{v.name}</option>
                ))
            }
          </FormControl>
        </FormGroup>
        <Button bsStyle="info" onClick={this.toggleSpeech}>
        Szay it <Glyphicon glyph={ this.state.speaking ? "pause" : "play" } /></Button>
      </div>
    )
  }
}
