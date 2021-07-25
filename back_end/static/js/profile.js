var i, tabContent, tabItems, tabLinks;


tabItems = document.getElementsByClassName("profile-tab");
for (i = 0; i < tabItems.length; i++) {
    tabItems[i].style.display = "block";
}

function modal_view() {

    document.getElementById("modal-new-product").style.display = "block";

}

function modal_edit(){
    document.getElementById("modal-edit-category").style.display = "block";
}

let close_btn = document.getElementsByClassName("close");

for (i=0;i<close_btn.length;i++){
    close_btn[i].addEventListener("click",exec);
}

function exec(){
    let modal = document.getElementsByClassName("modal");
    for (i=0;i<modal.length;i++){
        modal[i].style.display = "none";
    }
}


function switchTab(element, tabName) {
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace("active", "");
    }

    tabItems = document.getElementsByClassName(tabName);
    for (i = 0; i < tabItems.length; i++) {
        tabItems[i].style.display = "block";
    }

    element.className += " active";
}

