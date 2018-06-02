import React from 'react';
import StaticNote from './StaticNote';

export default class ListStaticNotes extends React.Component {
  constructor(props) {
    super(props);
    this.deck = props.deck;
    console.log('ListStaticNotes.constructor');
  }

  render() {
    return (
      <div>{
        this.deck.notes.map( (note, index) => (
          <StaticNote title={note.title} content={note.content} key={index} />
        ))
      }</div>
    );
  }
}