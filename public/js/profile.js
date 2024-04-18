document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("create-account-form");
  const navBar = document.getElementById("nav-bar");

  fetch("/api/session")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn && data.user_type === "customer") {
        addLogoutButton(navBar);
        document.getElementById("login-item").style.display = "none";
        document.getElementById("logout-item").style.display = "inline-block";
      } else {
        document.getElementById("login-item").style.display = "inline-block";
        document.getElementById("logout-item").style.display = "none";
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const password = document.getElementById("password").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const usertype = document.getElementById("usertype").value;

      fetch("/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          usertype: usertype,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Response: " + data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error creating account");
        });
    });
  }
});

function addLogoutButton(navBar) {
  if (!navBar) return;

  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";
  logoutButton.onclick = handleLogout;

  navBar.appendChild(logoutButton);
}

function handleLogout() {
  fetch("/logout")
    .then(() => {
      alert("You have logged out successfully");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    });
}
