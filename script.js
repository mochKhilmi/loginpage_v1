let users = [];
document.addEventListener("DOMContentLoaded", () => {
  let saveUsers = localStorage.getItem("data_user");

  if (saveUsers) {
    users = JSON.parse(saveUsers);
  }
});

const signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", () => showRegistrationForm());
const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", () => showLoginPage());

function showRegistrationForm() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registrationPage").style.display = "block";
  console.log("clicked");
}

function showLoginPage() {
  document.getElementById("registrationPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// User registration
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

const registration = document.getElementById("userRegistration");
registration.addEventListener("submit", (e) => {
  e.preventDefault();
  registuser();
});

function registuser() {
  const usernameInput = document.getElementById("username");
  const usernameData = usernameInput.value.trim();
  const emailInput = document.getElementById("emailUser");
  const userEmailData = emailInput.value.trim();
  const passwordInput = document.getElementById("passwordUser");
  const userPasswordData = passwordInput.value.trim();

  const userData = new User(usernameData, userEmailData, userPasswordData);
  users.push(userData);
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  console.log(users);

  localStorage.setItem("data_user", JSON.stringify(users));
}

// autentikasi user

const savedUsers = JSON.parse(localStorage.getItem("data_user"));
function authenticateUser(username, password) {
  const user = savedUsers.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return false;
  } else {
    return true;
  }
}

function handleLogin(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("userName");
  const passwordInput = document.getElementById("password");

  const username = usernameInput.value;
  const password = passwordInput.value;

  const isAuthenticated = authenticateUser(username, password);

  if (isAuthenticated) {
    const authenticatedUser = savedUsers.find(
      (user) => user.username === username
    );
    alert(`Halo ${authenticatedUser.username} selamat datang`);

    // Mengosongkan kolom input setelah berhasil login
  } else {
    alert("Username atau Password salah");
  }
  usernameInput.value = "";
  passwordInput.value = "";
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLogin);
