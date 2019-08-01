const loginBtn = document.querySelector("#login-navbar");
const createBtn = document.querySelector("#create");
const backBtn = document.querySelector("#back");
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const address = document.querySelector('#address');
const phoneNumber = document.querySelector('#phone-number');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const loadingSpinner = document.querySelector('#loading-spinner');
loadingSpinner.style.display = "none";
loadingSpinner.style.marginLeft = 'auto';
loadingSpinner.style.marginRight = 'auto';

createBtn.addEventListener("click", goToHomepage);
backBtn.addEventListener("click", goToLandingPage);

loginBtn.addEventListener("click", goToLoginPage);

async function goToHomepage() {
    loadingSpinner.style.display = "block";

    if (password.value !== confirmPassword.value) {
        loadingSpinner.style.display = 'none';
        return alert('Password does not match, Confirm password correctly');
    }

    const res = await postRequest('https://property-pro-lite-amily.herokuapp.com/api/v1/auth/signup',
        {
            first_name: firstName.value,
            last_name: lastName.value,
            phone_number: phoneNumber.value,
            address: address.value,
            email: email.value,
            password: password.value
        });

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

function goToLandingPage() {
    window.location.href = "../index.html";
}

function goToLoginPage() {
    window.location.href = "signin.html";
}