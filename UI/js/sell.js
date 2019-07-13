const discover = document.querySelector('#discover');
discover.addEventListener('click', navigateTodiscover);

const profile = document.querySelector('#profile');
profile.addEventListener('click', navigateToprofile);


function navigateTodiscover() {
    window.location.href = "../html/discover.html";
}

function navigateToprofile() {
    window.location.href = "../html/profile.html";
}

const logoutBtn = document.querySelector(".log-out");
logoutBtn.addEventListener("click", logOut);

function logOut() {
    window.location.href = "../index.html";
}