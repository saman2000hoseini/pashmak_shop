const list_array = [];
for (let i=0; i<40; i++) {
    list_array.push(`<li class="list-group-item">${i}</li>`);
}

const numberOfItems = list_array.length;
const numberPerPage = 15;
let currentPage = 1;
const numberOfPages = Math.ceil(numberOfItems/numberPerPage);

window.addEventListener("load",function(){
    
    document.getElementById(currentPage).style.backgroundColor = "cornflowerblue";

    const start = (currentPage-1)*numberPerPage;
    const end = start + numberPerPage;

    pageList = list_array.slice(start, end);

    document.getElementsByClassName("paginator-items")[0].innerHTML = "";
    for (r = 0; r < pageList.length; r++) {
        document.getElementsByClassName("paginator-items")[0].innerHTML += pageList[r] + "<br/>";
    }
})

if(numberOfPages>1){
    let prv_btn = document.createElement("button"); 
    prv_btn.id = 0;
    prv_btn.innerHTML = "قبل";
    document.getElementsByClassName("paginator-buttons")[0].appendChild(prv_btn);

    for (let i=1; i<=numberOfPages; i++) {
        let btn = document.createElement("button");
        btn.id = i;
        btn.innerHTML = i;
        document.getElementsByClassName("paginator-buttons")[0].appendChild(btn);
    }

    let nxt_btn = document.createElement("button"); 
    nxt_btn.id = numberOfPages + 1;
    nxt_btn.innerHTML = "بعد";
    document.getElementsByClassName("paginator-buttons")[0].appendChild(nxt_btn);


    for (let i=0; i<=numberOfPages+1; i++) {
        document.getElementById(i).style.border = "none";
        document.getElementById(i).style.padding = "15px 32px";
        document.getElementById(i).style.backgroundColor = "rgb(238, 240, 241)";
        document.getElementById(i).addEventListener("click",loadPage)
    }
}

 
function loadPage(event){

    target = event.target ;

    for (let i=0; i<=numberOfPages+1; i++) {
        document.getElementById(i).style.backgroundColor = "white";
    }
    
    if(target.id == 0){
        if(currentPage != 1){
            currentPage = parseInt(currentPage) - parseInt(1);
        }
        document.getElementById(currentPage).style.backgroundColor = "cornflowerblue";
    }
    else if (target.id == numberOfPages + 1){
        if(currentPage != numberOfPages){
            currentPage = parseInt(currentPage) + parseInt(1);
        }
        document.getElementById(currentPage).style.backgroundColor = "cornflowerblue";
    }
    else {
        currentPage = target.id
        document.getElementById(currentPage).style.backgroundColor = "cornflowerblue";
    }

    const start = (currentPage-1)*numberPerPage;
    const end = start + numberPerPage;

    pageList = list_array.slice(start, end);

    document.getElementsByClassName("paginator-items")[0].innerHTML = "";
    for (r = 0; r < pageList.length; r++) {
        document.getElementsByClassName("paginator-items")[0].innerHTML += pageList[r] + "<br/>";
    }
}