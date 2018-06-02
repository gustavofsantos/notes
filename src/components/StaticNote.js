import React from 'react';

const StaticNote = props => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.content}</p>
  </div>
);

export default StaticNote;