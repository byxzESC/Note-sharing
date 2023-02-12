function logOut() {
  fetch("/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log out.");
    }
  });
}

document.querySelector("#logout").addEventListener("click", logOut);
