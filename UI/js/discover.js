const sell = document.querySelector('#sell');
sell.addEventListener('click', navigateToSell);

const profile = document.querySelector('#profile');
profile.addEventListener('click', navigateToprofile);

const singleImage = document.querySelector('.card-container');
singleImage.addEventListener('click', navigateToViewProperty);


function navigateToViewProperty() {
    window.location.href = "../html/view_property.html";
}


function navigateToSell() {
    window.location.href = "../html/sell.html";
}

function navigateToprofile() {
    window.location.href = "../html/profile.html";
}

const logoutBtn = document.querySelector(".log-out");
logoutBtn.addEventListener("click", logOut);

function logOut() {
    window.location.href = "../index.html";
}
