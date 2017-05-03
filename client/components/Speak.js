import React from 'react';
import { Button } from 'react-bootstrap';

export default class Speak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voice: null,
      voices: [],
      speaking: false
    };
    this.toggleSpeech = this.toggleSpeech.bind(this);
  }

  componentDidMount() {
    speechSynthesis.onvoiceschanged = () => {
      let voices = speechSynthesis.getVoices();
      this.setState({ voices });
    };
  }

  toggleSpeech(voice) {
    let match = this.state.voice === voice.name;

    if (match) {
      if (this.state.speaking) {
        speechSynthesis.pause();
        this.setState({ speaking: false });
      } else {
        speechSynthesis.resume();
        this.setState({ speaking: true });
      }
    } else {
      speechSynthesis.cancel();
      let msg = new SpeechSynthesisUtterance(this.props.text);
      msg.voice = voice;
      speechSynthesis.speak(msg);
      this.setState({ voice: voice.name, speaking: true });
    }
  }

  render() {
    return (
      <div>
      {
        this.state.voices
        .map((v, i) => (
          <Button key={i} onClick={() => this.toggleSpeech(v)}>Hear {v.name} say it</Button>
          ))
      }
      </div>
    )
  }
}
