const delBtn = document.querySelectorAll('.delbtn')

function removal(e){
    e.preventDefault();
    fetch("/api/note/delete/id", {
        method: "DELETE"
    })
    e.target.remove();
}

delBtn.forEach(
    button => button.addEventListener("click", removal)
)