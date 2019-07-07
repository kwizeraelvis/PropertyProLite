
// Open the discover tab by default when the page loads
document.querySelector("#openByDefault").click();

function openTab(headerName, headerClicked, backgroundColor, textColor) {

    setTabHeaders(headerName, headerClicked, backgroundColor, textColor);
    populateDiscoverFeed();
}

function setTabHeaders(headerName, headerClicked, backgroundColor, textColor) {
    const tabHeaders = document.querySelectorAll(".tablink");
    const pillName = document.querySelector(".pill");
    pillName.textContent = headerName;

    tabHeaders.forEach(tabHeader => {
        tabHeader.style.cssText = "";
        tabHeader.style.transition = "0.4s";
    });

    headerClicked.style.backgroundColor = backgroundColor;
    headerClicked.style.color = textColor;
    headerClicked.style.marginTop = "67px";
    headerClicked.style.transition = "0.6s";
    headerClicked.style.borderRadius = "10px 10px 0 0";
    headerClicked.style.border = "none";

    const tabContents = document.querySelectorAll(".tabcontent");

    tabContents.forEach(tabContent => {
        tabContent.style.display = "none";
    });
    document.querySelector(`#${headerName}`).style.display = "block";

    const houseCategory = document.querySelector("#category");

    if (headerName.toLowerCase() !== "discover")
        houseCategory.style.display = "none";
    else
        houseCategory.style.display = "block";
}

function populateDiscoverFeed() {
    const properties = getProperties();

    const discover = document.querySelector("#discover");
    discover.addEventListener("click", viewProperty);

    cleanDiscoverContents();

    for (let property of properties) {
        const imageContainer = document.createElement("div");
        const detailsContainer = document.createElement("div");
        const image = document.createElement("img");
        const soldIcon = document.createElement("img");
        const price = document.createElement("span");

        image.src = property.image;
        soldIcon.src = "../assets/sold.png"
        price.textContent = property.price;

        imageContainer.classList.add("card-list");
        detailsContainer.classList.add("info");
        image.classList.add("card-list-image");
        soldIcon.classList.add("card-list-sold-icon");

        // make the sold-icon unclickable 
        soldIcon.style.pointerEvents = "none";

        detailsContainer.appendChild(price);
        detailsContainer.appendChild(soldIcon);

        imageContainer.appendChild(image);
        imageContainer.appendChild(soldIcon);
        imageContainer.appendChild(detailsContainer);

        if (property.status.toLowerCase() === "available") {
            soldIcon.style.display = "none";
        }

        discover.appendChild(imageContainer);
    }
}

function getProperties() {
    return [{
        image: "../assets/image1.jpg",
        price: "50 Million Rwf",
        name: "Amily kadyl",
        location: "Los angeles",
        status: "Available",
        phone: "0782228870",
        details: "Great Mansion with 4 bedrooms"
    },
    {
        image: "../assets/image2.jpg",
        price: "40 Million Rwf",
        name: "Ashley Queen",
        location: "Massachussets",
        status: "Sold",
        phone: "07375938854",
        details: "Classic house with 6 bedrooms"
    },
    {
        image: "../assets/image3.jpg",
        price: "80 Million Rwf",
        name: "Amily kadyl",
        location: "New York",
        status: "Sold",
        phone: "07375938854",
        details: "Classic house with 2 bedrooms"
    },
    {
        image: "../assets/image4.jpg",
        price: "100 Million Rwf",
        name: "Amily kadyl",
        location: "Toronto",
        status: "Available",
        phone: "07375938854",
        details: "Classic house with 6 bedrooms"
    },
    {
        image: "../assets/image5.jpg",
        price: "65 Million Rwf",
        name: "Berlis Hampman",
        location: "Lagos",
        status: "Sold",
        phone: "07375938854",
        details: "Classic house with 8 bedrooms"
    },
    {
        image: "../assets/image6.jpg",
        price: "45 Million Rwf",
        name: "Dj Bex",
        location: "South-africa",
        status: "Sold",
        phone: "07375938854",
        details: "Classic house with 9 bedrooms"
    },
    {
        image: "../assets/image7.jpg",
        price: "70 Million Rwf",
        name: "Chris evans",
        location: "Miami",
        status: "Available",
        phone: "07375938854",
        details: "Classic house with 6 bedrooms"
    },
    {
        image: "../assets/image8.jpg",
        price: "56 Million Rwf",
        name: "Larry ellison",
        location: "Florida",
        status: "Available",
        phone: "07375938854",
        details: "Classic house with 6 bedrooms"
    },
    {
        image: "../assets/image9.jpg",
        price: "89 Million Rwf",
        name: "Jack the pot",
        location: "Kigali",
        status: "Available",
        phone: "07375938854",
        details: "Classic house with 6 bedrooms"
    },
    {
        image: "../assets/image10.jpg",
        price: "73 Million Rwf",
        name: "Rooster official",
        status: "Avalaible",
        location: "California",
        phone: "0782222370",
        details: "Modern house with a swimming pool"
    }];
}

function cleanDiscoverContents() {
    const discover = document.querySelector("#discover");
    while (discover.firstChild) {
        discover.removeChild(discover.firstChild);
    }
}

// view a single property when it's been clicked
function viewProperty(event) {

    const imagePath = event.target.src;
    const properties = getProperties();

    cleanDiscoverContents();

    for (let property of properties)
        (property.image.includes(getImage(imagePath)) ? populateSingleProperty(property) : "Failed")


}

function populateSingleProperty(property) {
    const discoverTab = document.querySelector("#discover");
    const singleImageContainer = document.createElement("div");
    const detailsContainer = document.createElement("div");

    let image = document.createElement("img");
    let name = document.createElement("h4");
    let price = document.createElement("h4");
    let status = document.createElement("h4");
    let location = document.createElement("h4");
    let contact = document.createElement("h4");
    let details = document.createElement("span");

    singleImageContainer.classList.add("card-single-property");
    detailsContainer.classList.add("card-single-property-info");
    image.classList.add("card-single-property-image");

    singleImageContainer.style.marginLeft = "20px";


    image.src = property.image;
    name.textContent = `Publisher name: ${property.name}`;
    price.textContent = `Price: ${property.price}`;
    status.textContent = `Status: ${property.status}`;
    location.textContent = `Location: ${property.location}`;
    contact.textContent = `Phone number: : ${property.phone}`;
    details.textContent = `Details: ${property.details}`;

    detailsContainer.appendChild(name);
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(status);
    detailsContainer.appendChild(location);
    detailsContainer.appendChild(contact);
    detailsContainer.appendChild(details);

    singleImageContainer.appendChild(image);
    singleImageContainer.appendChild(detailsContainer);

    discoverTab.appendChild(singleImageContainer);

    const houseCategory = document.querySelector("#category");
    houseCategory.style.display = "none";
}

function getImage(imagePath) {
    const words = imagePath.split("/");
    return words[words.length - 1];
}