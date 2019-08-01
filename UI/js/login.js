const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup-navbar");
const forgotPassword = document.querySelector("#forgot-password");
const backBtn = document.querySelector("#back");
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loadingSpinner = document.querySelector('#loading-spinner');
loadingSpinner.style.display = "none";
loadingSpinner.style.marginLeft = 'auto';
loadingSpinner.style.marginRight = 'auto';


loginBtn.addEventListener("click", goToHomepage);
signupBtn.addEventListener("click", goToSignUpPage);
forgotPassword.addEventListener("click", resetPassword);
backBtn.addEventListener("click", goToLandingPage);


async function goToHomepage() {
    let res;
    loadingSpinner.style.display = "block";

    res = await postRequest('https://property-pro-lite-amily.herokuapp.com/api/v1/auth/signin', { email: email.value, password: password.value });

    if (res.status === 400) {
        loadingSpinner.style.display = 'none';
        return alert(`${res.error}`);
    }
    window.location.href = "discover.html";
}

async function postRequest(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' })
    });

    return res.json();
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