import NodeIPFS from './nodeIPFS';
import Deck from './Deck';
import Note from './Note';

export default class App_ {
  constructor() {
    this._ipfs = new NodeIPFS();
    this._decks = [];
    this._decksCid = '';
    this._isIpfsOnline = false;

    /* setup ipfs node handlers */
    this._ipfs.handleReady(this._ipfsHandleReady);
    this._ipfs.handleError(this._ipfsHandleError);

    this._ipfsHandleReady = this._ipfsHandleReady.bind(this);
    this._ipfsHandleError = this._ipfsHandleError.bind(this);
    this.ipfsPut = this.ipfsPut.bind(this);
  }

  _ipfsHandleReady() {
    this._isIpfsOnline = true;
    console.log('[ OK ] IPFS is online.')
  }

  _ipfsHandleError(error) {
    console.log('[ERRO]', error);
  }

  ipfsPut(noteJSON, done, error, key) {
    this._ipfs.put(noteJSON, done, error, key);
  }

  ipfsGet(cid, done, error, key) {
    this._ipfs.get(cid, done, error, key);
  }

  ipfsBackupDecks = () => {
    console.log(this);
    this._ipfs.putObject(this._decks, (res) => {
      console.log('[ OK ] All decks are sucessfully backuped: ', res);
      this._decksCid = res.hash;
    }, error => {
      console.log('[ERRO] Error backuping decks');
    });
  }

  ipfsBackupDeck(deckIndex) {
    const deckJSON = this._decks[deckIndex].getJSON();
    this._ipfs.putObject(deckJSON, res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  /**
   * return true if the ipfs node is online
   */
  ipfsIsOnline() {
    return this._isIpfsOnline;
  }

  deckCreate(name) { 
    const deck = new Deck(name);
    this._decks.push(deck);
    return this._decks.length;
  }

  deckBackup(index, done, error, key) {
    const deck = this._decks[index];
    this._ipfs.put(deck.getJSON(), done, error, key);
  }

  /**
   * Put a note into a deck 
   * @param {integer} deckIndex 
   * @param {object} note 
   */
  deckPutNote(deckIndex, note) {
    console.log('deckPutNote');
    this._decks[deckIndex].putNote(note);
  }

  /**
   * get note from deck
   * @param {integer} deckIndex 
   * @param {integer} index 
   */
  deckGetNote(deckIndex, index) {
    return this._decks[deckIndex].getNote(index);
  }

  /**
   * Returns a json of deck
   * @param {integer} deckIndex intex of deck
   */
  getDeck(deckIndex) {
    return this._decks[deckIndex].getJSON();
  }

  /**
   * Backup decks into local storage key
   */
  localStorageBackup() {
    const decksJson = [];
    this._decks.forEach(deck => {
      decksJson.push(deck.getJSON());
    });

    localStorage.setItem("121hu1h2bs1nsdjicnsc", JSON.stringify(decksJson));
  }

  /**
   * Restore decks from local storage
   */
  localStorageRestore() {
    const stringDecks = localStorage.getItem("121hu1h2bs1nsdjicnsc");
    const decksJson = JSON.parse(stringDecks);

    decksJson.forEach(deckJson => {
      const name = deckJson.name;
      const deck = new Deck(name);
      deckJson.notes.forEach(note => {
        deck.putNote(new Note(note.title, note.content, note.timestamp, note.id));
      });

      this._decks.push(deck);
    });
  }
}