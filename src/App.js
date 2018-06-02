import React, { Component } from "react";

/* libs */
import App_ from './libs/app';
import Note from './libs/Note';

/* components */
import Header from './components/Header';
import NewNote from './components/NewNote';
import ListStaticNotes from './components/ListStaticNotes';

/* css */
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.app = new App_();

    this.state = {
      showDeck: false
    };
  }

  handleReady = () => {
    console.log("[+] Ready");
  };

  put = () => {
    const note = new Note("note title", "note content");

    console.log(this.app.deckCreate('deck one'));
    this.app.deckPutNote(0, note);
  };

  get = () => {
    this.app.ipfsGet("QmYxsRKREkbdepwoPu1sm8xiMfJ81KuMPMd5CQ6CJVoP9J", res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  };

  showDeck = () => {
    console.log('showDeck', this.state.showDeck);
    this.setState(prevState => ({
      showDeck: !prevState.showDeck
    }));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NewNote />
        { 
          this.state.showDeck ? <ListStaticNotes deck={this.app.getDeck(0)} /> : null 
        }
        <button onClick={this.put}>put</button>
        <button onClick={this.get}>get</button>
        <button onClick={this.showDeck}>show deck</button>
        <button onClick={this.app.ipfsBackupDecks}>backup decks</button>
      </div>
    );
  }
}

export default App;
