const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup");

loginBtn.addEventListener("click", goToHomepage);
signupBtn.addEventListener("click", goToSignUpPage);

function goToHomepage() {
    window.location.href = "html/home.html";
}

function goToSignUpPage() {
    window.location.href = "html/signup.html";
}