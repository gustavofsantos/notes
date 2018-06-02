export default class Note {
  constructor(title, content, timestamp='', id='') {
    this._title = title;
    this._content = content;

    this._timestamp = timestamp.length > 0 ? timestamp : (new Date()).toUTCString();
    this._id = id.length > 0 ? id : '1';
  }

  getJSON() {
    return ({
      title: this._title,
      content: this._content,
      timestamp: this._timestamp,
      id: this._id
    });
  }
}