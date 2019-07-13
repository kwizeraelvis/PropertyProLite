const sell = document.querySelector('#sell');
sell.addEventListener('click', navigateToSell);

const discover = document.querySelector('#discover');
discover.addEventListener('click', navigateTodiscover);

const updateBtn = document.querySelector('#updateBtn');
updateBtn.addEventListener('click', navigateToupdateBtn);

function navigateToSell() {
    window.location.href = "../html/sell.html";
}

function navigateTodiscover() {
    window.location.href = "../html/discover.html";
}

function navigateToupdateBtn() {
    window.location.href = "../html/update_property.html";
}

const logoutBtn = document.querySelector(".log-out");
logoutBtn.addEventListener("click", logOut);

function logOut() {
    window.location.href = "../index.html";
}