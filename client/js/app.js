
var gene_name   = "";
var sample_name = "";

/*****************************************************************/

$(document).ready(function () {

    query_all_genes();
    query_all_samples();
    
});

/*****************************************************************/

$("#gene-text-search").keydown(function (e) {

    if (e.which == 13) {
        e.preventDefault();
    }

}).keyup(function (e) {

    if (e.which == 13) {
        gene_name = $("#gene-text-search").val();
        generate_by_gene_table(gene_name);
    };

});


$("#gene-button-search").on("click", function (e) {

    gene_name = $("#gene-text-search").val();
    generate_by_gene_table(gene_name);

});

/*****************************************************************/

$("#sample-text-search").keydown(function (e) {

    if (e.which == 13) {
        e.preventDefault();
    }

}).keyup(function (e) {

    if (e.which == 13) {
        sample_name = $("#sample-text-search").val();
        generate_by_sample_table(sample_name);
    }

});


$("#sample-button-search").on("click", function (e) {

    sample_name = $("#sample-text-search").val();
    generate_by_sample_table(sample_name);

});

/*****************************************************************/

function query_all_genes() {

    $.ajax({
        url: "http://127.0.0.1:5000/all/genes/",
        type: "GET",
        dataType: "json",
        success: function (response) {

            $("#number-of-genes").html(response.length.toLocaleString());            
            gene_name = response[0]["hgnc_symbol"];
            generate_by_gene_table(gene_name);

        },
        error: function () {
            $("#number-of-genes").html("0");
        }
    });

};

/*****************************************************************/

function query_all_samples() {

    $.ajax({
        url: "http://127.0.0.1:5000/all/samples/",
        type: "GET",
        dataType: "json",
        success: function (response) {

            $("#number-of-samples").html(response.length.toLocaleString());            
            sample_name = response[0]["sample"];
            generate_by_sample_table(sample_name);

        },
        error: function () {
            $("#number-of-samples").html("0");
        }
    });

};

/*****************************************************************/

function generate_by_gene_table(gene_name) {

    $.ajax({
        url: "http://127.0.0.1:5000/search/genes/" + gene_name,
        type: "GET",
        dataType: "json",
        success: function (response) {

            if ($.fn.dataTable.isDataTable("#by-gene-table")) {
                table = $("#by-gene-table").DataTable();
                table.destroy();
            };

            $("#by-gene-table").DataTable({
                pageLength: 10,
                pagingType: "first_last_numbers",
                data: response,
                columns: [
                    { data: "sample" },
                    { data: "ensembl_id" },
                    { data: "entrez_id" },
                    { data: "hgnc_symbol" },
                    { data: "full_name" },
                    { data: "fpkm" }
                ]
            });

            $("#by-gene-table").show();
            $("#current-gene").html(gene_name);
            $(".dataTables_length").addClass("bs-select");

        },
        error: function () {
            $("#current-gene").html(gene_name + " not found");
        }
    });

    $("#gene-text-search").val("");
}

/*****************************************************************/

function generate_by_sample_table(sample_name) {

    $.ajax({
        url: "http://127.0.0.1:5000/search/samples/" + sample_name,
        type: "GET",
        dataType: "json",
        success: function (response) {

            if ($.fn.dataTable.isDataTable("#by-sample-table")) {
                table = $("#by-sample-table").DataTable();
                table.destroy();
            };

            $("#by-sample-table").DataTable({
                pageLength: 10,
                pagingType: "first_last_numbers",
                data: response,
                columns: [
                    { data: "sample" },
                    { data: "ensembl_id" },
                    { data: "entrez_id" },
                    { data: "hgnc_symbol" },
                    { data: "full_name" },
                    { data: "fpkm" }
                ]
            });

            $("#by-sample-table").show();
            $("#current-sample").html(sample_name);
            $(".dataTables_length").addClass("bs-select");

        },
        error: function () {
            $("#current-sample").html(sample_name + " not found");
        }
    });

    $("#sample-text-search").val("");
}

/*****************************************************************/

function generate_histogram() {

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#data-histogram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
}

/*****************************************************************/
