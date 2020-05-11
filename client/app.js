
var sample_data = [];


$(document).ready(function () {

    var gene_name = $("#gene_text_search").attr("placeholder")

    $.ajax({
        url: "http://127.0.0.1:5000/search/sample/CPT0000640005",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, d) {
                sample_data.push(d);
            });
        }
    });

    $("#current_gene").html(gene_name);
});


$("#gene_text_search").keydown(function (e) {

    if (e.which == 13) {
        e.preventDefault();
    }

}).keyup(function (e) {

    if (e.which == 13) {
        var gene_name = $("#gene_text_search").val();

        if (gene_name) {
            $("#current_gene").html(gene_name);
        } else {
            gene_name = $("#gene_text_search").attr("placeholder")
        }
    }
});


$("#gene_button_search").on("click", function (e) {

    var gene_name = $("#gene_text_search").val();

    if (gene_name) {
        $("#current_gene").html(gene_name);
    } else {
        gene_name = $("#gene_text_search").attr("placeholder")
    }
});
