
// Open the discover tab by default when the page loads
document.querySelector("#openByDefault").click();

function openTab(headerName, headerClicked, backgroundColor, textColor) {

    setTabHeaders(headerName, headerClicked, backgroundColor, textColor);
    populateDiscoverFeed();
    populateProfileFeed();

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