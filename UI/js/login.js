const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup-navbar");
const forgotPassword = document.querySelector("#forgot-password");
const backBtn = document.querySelector("#back");

loginBtn.addEventListener("click", goToHomepage);
signupBtn.addEventListener("click", goToSignUpPage);
forgotPassword.addEventListener("click", resetPassword);
backBtn.addEventListener("click", goToLandingPage);


function goToHomepage() {
    window.location.href = "home.html";
}

function goToSignUpPage() {
    window.location.href = "signup.html";
}

function resetPassword() {
    window.location.href = "reset_password.html";
}

function goToLandingPage() {
    window.location.href = "../index.html";
}