let debounceId = null;
function queueUpdate(id,data) {
  clearTimeout(debounceId);
  debounceId = setTimeout(() => {
    fetch(`/api/note/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }, 3000);
}

function loadEditor(mountId, dataId, id, onChange = console.log) {
  const mount = document.querySelector(mountId);
  const data = document.querySelector(dataId);
  const parsedData = JSON.parse(data.innerHTML);

  let editor = new Quill(mount, {
    theme: "snow",
  });

  editor.setContents(JSON.parse(parsedData.content));

  editor.on("text-change", () => {
    queueUpdate(id, {
      ...parsedData,
      tags: parsedData.tags,
      content: JSON.stringify(editor.getContents()),
    });
    // onChange(editor.getContents());
  });
}

globalThis.editors = globalThis.editors || [];

editors.forEach((loadedCallback) => loadedCallback());
globalThis.editorInitialized = true;
