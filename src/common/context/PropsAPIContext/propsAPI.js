/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
class PropsAPI {
  editor = null;

  constructor(editor) {
    this.editor = editor;

    ['executeCommand'].forEach((key) => {
      this[key] = (...params) => this.editor[key](...params);
    });

    ['read', 'save', 'add', 'find', 'update', 'remove', 'getSelected'].forEach((key) => {
      this[key] = (...params) => this.currentPage[key](...params);
    });

    ['modal'].forEach((key) => {
      this[key] = (...params) => {
        this.editor.getCurrentPage()._cfg.setAsd(true)
      }
    });
  }

  get currentPage() {
    return this.editor.getCurrentPage();
  }
}

export default PropsAPI;
