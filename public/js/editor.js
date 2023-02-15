let debounceId = null;
function queueUpdate(id, data) {
  clearTimeout(debounceId);
  debounceId = setTimeout(() => {
    fetch(`/api/note/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, 3000);
}

function loadEditor(mountId, dataId, id, onChange = console.log) {
  id = + id;
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
      content: JSON.stringify(editor.getContents().ops),
    });
    // onChange(editor.getContents());
  });
  function removeTag(id) {
    parsedData.tags = parsedData.tags.filter((tag) => tag.id !== id);
    document.querySelector(`[data-id="${id}"]`).remove();
    queueUpdate(id, {
      ...parsedData,
      content: JSON.stringify(editor.getContents().ops),
    })
  }
  document.querySelector("#add-tag").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#tag-input");
    const tag = input.value;
    input.value = "";
    if (tag.trim() === "") return;
    fetch(`/api/tag/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: "#fff",
        darkColor: "#fff",
        message: tag,
        filledIn: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        debugger;
        parsedData.tags.push(res);
        console.log(parsedData);
        let span = document.createElement("span");
        span.classList="tag editable";
        for (const [key, value] of Object.entries({
          id: res.id,
          content: res.message,
          color: res.color,
          color2: res.darkColor,
          theme:"dark"
        })) {
          span.setAttribute(`data-${key}`, value)
        }
        span.addEventListener("click", () => removeTag(res.id));
        document.querySelector("#tags").appendChild(span);
        queueUpdate(id, {
          ...parsedData,
          content: JSON.stringify(editor.getContents().ops),
        })
      });
  });
  document.querySelectorAll(".tag.editable").forEach((tag) => {
    tag.addEventListener("click", () => removeTag(+tag.getAttribute("data-id")));
  });
}

globalThis.editors = globalThis.editors || [];

editors.forEach((loadedCallback) => loadedCallback());
globalThis.editorInitialized = true;
