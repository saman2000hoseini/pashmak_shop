function toPrice(price) {
    return price.toString().replace(/(.)(?=(.{3})+$)/g, "$1,");
}