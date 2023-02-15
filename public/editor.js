function loadEditor(mountId, dataId, onChange = console.log) {
  const mount = document.querySelector(mountId);
  const data = document.querySelector(dataId);
  const parsedData = JSON.parse(data.innerHTML);

  let editor = new Quill(mount, {
    theme: "snow",
  });

  editor.setContents(parsedData);

  editor.on("text-change", () => {
    onChange(editor.getContents());
  });
}

globalThis.editors = globalThis.editors || [];

editors.forEach((loadedCallback) => loadedCallback());
globalThis.editorInitialized = true;
