var i, tabContent, tabItems, tabLinks;

tabItems = document.getElementsByClassName("profile-tab");
for (i = 0; i < tabItems.length; i++) {
    tabItems[i].style.display = "block";
}

function switchTab(element, tabName) {
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    tabItems = document.getElementsByClassName(tabName);
    for (i = 0; i < tabItems.length; i++) {
        tabItems[i].style.display = "block";
    }

    element.className += " active";
}
