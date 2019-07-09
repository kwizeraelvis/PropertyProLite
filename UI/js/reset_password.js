const loginBtn = document.querySelector("#login-navbar");
const signupBtn = document.querySelector("#signup-navbar");


loginBtn.addEventListener("click", goToHomepage);
signupBtn.addEventListener("click", goToSignUpPage);

function goToHomepage() {
    window.location.href = "signin.html";
}

function goToSignUpPage() {
    window.location.href = "signup.html";
}