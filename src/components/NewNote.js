import React from 'react';

export default class NewNote extends React.Component {

  constructor(props) {
    super(props);
    this.title = props.title;
    this.content = props.content;
  }
  
  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <p>{this.content}</p>
      </div>
    );
  }
}