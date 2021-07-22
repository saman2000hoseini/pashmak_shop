window.onload = function () {
    setActive();
}
const urlParams = new URLSearchParams(window.location.search);
const sortBy = urlParams.get('f_sort');
console.log(sortBy)


function toPrice(price) {
    return price.toString().replace(/(.)(?=(.{3})+$)/g, "$1,");
}

function sortProducts(page) {
    let f_sort = null;
    let f_elements = document.getElementsByClassName('sort-item-input');
    for (let i = 0; i < f_elements.length; i++) {
        if (f_elements[i].checked === true) {
            f_sort = f_elements[i].value
            console.log(i)
        }
    }

    let s_sort = []
    let s_elements = document.getElementsByClassName('filter-products-checkbox');

    for (let i = 0; i < s_elements.length; i++) {
        if (s_elements[i].checked === true) {
            s_sort.push(s_elements[i].value)
        }
    }

    let lower_price = getLowerPriceBound()
    let higher_price = getHigherPriceBound()

    window.location.replace(`http://localhost:8000?f_sort=${f_sort}&s_sort=${s_sort.join(',')}&lower_price=${lower_price}&higher_price=${higher_price}&page=${page}`);
}

function setActive() {
    let sortItems = document.getElementsByClassName("sort-item-input");

    if (sortBy == null || sortBy === "") {
        sortItems[0].checked = true;
        return;
    }

    for (let i = 0; i < sortItems.length; i++) {
        sortItems[i].checked = false;
    }

    console.log(sortBy)

    for (let i = 0; i < sortItems.length; i++) {
        if (sortItems[i].value === sortBy)
            sortItems[i].checked = true;
    }
}
