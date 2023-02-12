function logIn(e) {
  e.preventDefault();
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;
  const data = {
    email: email,
    password: password,
  };
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  });
}

document.querySelector(".login-form").addEventListener("submit", logIn);
