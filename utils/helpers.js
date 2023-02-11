const quillToHtml = require("quill-delta-to-html");

module.exports = {
  log: console.log,
  /**
   *
   * @param {import("./models/Note")} note
   */
  html: (note) => {
    const delta = JSON.parse(note.content);
    let renderer = new quillToHtml.QuillDeltaToHtmlConverter(delta);
    return renderer.convert();
  },
};
