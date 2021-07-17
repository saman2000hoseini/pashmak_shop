$(document).ready(function () {
    $("#slider-range").slider({
        range: true,
        min: -50000000,
        max: 0,
        values: [-50000000, 0],
        slide: function (event, ui) {
            $("#min-range").val(toPrice(ui.values[1] * -1));
            $("#max-range").val(toPrice(ui.values[0] * -1));

            $('.value:input')
                // event handler
                .keyup(resizeInput)
                // resize on page load
                .each(resizeInput);
        }
    });

    $("#min-range").val(toPrice(getLowerPriceBound()));
    $("#max-range").val(toPrice(getHigherPriceBound()));

    $('.value:input')
        // event handler
        .keyup(resizeInput)
        // resize on page load
        .each(resizeInput);
});

function getLowerPriceBound() {
    return $("#slider-range").slider("values", 1) * -1;
}

function getHigherPriceBound() {
    return $("#slider-range").slider("values", 0) * -1;
}

function resizeInput() {
    $(this).attr('size', $(this).val().length + 1);
}
