const errorDialog = document.querySelector("#error");

function setContent(id, content) {
  const element = document.querySelector(`#${id}`);
  element.textContent = content;
}

function showErrorMessage(title,message) {
  setContent("error-title", title);
  setContent("error-message", message);
  document.querySelector("#error").open=true;
}

function hideErrorMessage() {
  document.querySelector("#error").open=false;
}

errorDialog.addEventListener("click", (e) => {
  // if they click outside the dialog contents, close the dialog
  if (e.target === errorDialog) {
    hideErrorMessage();
  }
});
document.querySelector("a.close").addEventListener("click", hideErrorMessage);

function logIn(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(function (response) {
    if (response.ok) {
      document.location.replace("/home");
    } else {
      showErrorMessage("Login Failed", "Invalid username or password.");
    }
  });
}

document.querySelector("#login").addEventListener("submit", logIn);



function signUp(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(function (response) {
    if (response.ok) {
      document.location.replace("/home");
    } else {
      showErrorMessage("Sign Up Failed", "Failed to create user.");
    }
  });
}

document.querySelector("#signup").addEventListener("submit", signUp);