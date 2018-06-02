const IPFS = require('ipfs');

export default class NodeIPFS {
  constructor() {
    this._node = new IPFS();
  }

  /**
   * handle ready event
   * @param {function} callback function that is called when node is ready
   */
  handleReady(callback) {
    this._node.on('ready', callback);
  }

  handleError(callback) {
    this._node.on('error', error => callback(error));
  }

  /**
   * put one object into IPFS
   * @param {object} object json object that represent data
   * @param {function} done function that is called when sucess
   * @param {function} error function that is called when error
   * @param {string} key a key to encrypt content
   */
  putObject(object, done, error, key) {
    let serial = JSON.stringify(object);
    if (key) {
      // encrypt the object with a key
    }

    const serialBuffer = Buffer.from(serial);

    this._node.files.add(serialBuffer)
      .then(res => done(res))
      .catch(err => error(err));
  }

  /**
   * 
   * @param {string} cid string that represents the cid of file
   * @param {function} done function that is called when sucess
   * @param {function} error function that is called when error
   * @param {string} key a key to decrypt content
   */
  getObject(cid, done, error, key) {
    this._node.files.get(cid)
      .then(res => {
        console.log(res);
      })
      .catch(err => error(err));
  }
}