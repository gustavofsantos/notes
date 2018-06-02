import Note from './Note';

/**
 * Deck class
 */
export default class Deck {
  /**
   * Constructor of Deck class
   * @param {string} name name of deck
   */
  constructor(name='') {
    this._name = name;
    this._notes = [];

    this._timestamp = (new Date()).toUTCString();
    this._id = '0';
    this._ipfsCid = '';
  }

  /**
   * deck name setter
   */
  set name(name) {
    this._name = name;
  }

  /**
   * deck name getter
   */
  get name() {
    return this._name;
  }

  /**
   * set cid hash of ipfs backup
   */
  set ipfsCid(cid) {
    this._ipfsCid = cid;
  }

  /**
   * get cid hash of backup
   */
  get ipfsCid() {
    return this._ipfsCid;
  }

  /**
   * put note into deck
   * @param {object} note put an note object into deck
   */
  putNote(note) {
    console.log('Deck.putNote');
    this._notes.push(note.getJSON());
  }

  /**
   * get a note from deck
   * @param {number} index integer to get note
   */
  getNote(index) {
    // get note json stored in deck
    const noteJSON = this._notes[index];

    // creates a new object of json specification
    const note = new Note(noteJSON.title, noteJSON.content, noteJSON.timestamp, noteJSON.id);
    
    return note;
  }

  /**
   * Generates a object JSON of the content of this deck
   */
  getJSON() {
    return ({
      name: this._name,
      notes: this._notes,
      ipfsCid: this._ipfsCid,
      timestamp: this._timestamp
    });
  }
}
