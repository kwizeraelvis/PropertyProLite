
const createBtn = document.querySelector("#create");
const backBtn = document.querySelector("#back");

createBtn.addEventListener("click", goToHomepage);
backBtn.addEventListener("click", goToLoginPage);

function goToHomepage() {
    window.location.href = "home.html";
}

function goToLoginPage() {
    window.location.href = "../index.html";
}