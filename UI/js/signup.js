const loginBtn = document.querySelector("#login-navbar");
const createBtn = document.querySelector("#create");
const backBtn = document.querySelector("#back");

createBtn.addEventListener("click", goToHomepage);
backBtn.addEventListener("click", goToLandingPage);

loginBtn.addEventListener("click", goToLoginPage);

function goToHomepage() {
    window.location.href = "discover.html";
}

function goToLandingPage() {
    window.location.href = "../index.html";
}

function goToLoginPage() {
    window.location.href = "signin.html";
}