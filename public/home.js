const noteButtons = document.querySelectorAll("[data-id]");

const createNewNoteButtons = document.querySelectorAll(".create-new");

function load(url) {
	document.getElementById("note").setAttribute("src", url);
}

noteButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		e.preventDefault();
		const theme = document.getElementById("[data-theme]")?.value || "dark";
		const noteId = e.target.getAttribute("data-id");
		load("/internal/doc/?id=" + noteId + "&theme=" + theme);
	});
});

createNewNoteButtons.forEach((button) => {
	console.log(button);
	button.addEventListener("click", (e) => {
		e.preventDefault();
		const theme = document.getElementById("[data-theme]")?.value || "dark";
		load("/internal/doc/edit?id=new&theme=" + theme);
	});
});

console.log("Loaded home.js");

function resizeIframe(obj) {
	if (!obj.contentWindow.document.body) return; // not on a page, loading
	const height = Math.max(
		obj.contentWindow.document.body.scrollHeight,
		obj.contentWindow.document.documentElement.scrollHeight,
		obj.contentWindow.document.body.offsetHeight,
		obj.contentWindow.document.documentElement.offsetHeight,
	) 
	obj.style.height = height + "px";
}


function ticking() {
	const iframe = document.getElementById("note");
	if (iframe) {
		resizeIframe(iframe);
	}
}

setInterval(ticking, 10);