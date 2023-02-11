function loadEditor(mountId, dataId, onChange) {
  const mount = document.querySelector(mountId);
  const data = document.querySelector(dataId);
  const parsedData = JSON.parse(data.innerHTML);

  let editor = new Quill(mount, {
    theme: "snow",
  });

  editor.setContents(parsedData);
}

globalThis.editors = globalThis.editors || [];

editors.forEach((loadedCallback) => loadedCallback());
globalThis.editorInitialized = true;
