
var gene_name = "TP53";
var sample_name = "CPT0000640005"; //CPT0000660006

/*****************************************************************/

$(document).ready(function () {

    $("#current-gene").html(gene_name);
    $("#current-sample").html(sample_name);

    generate_by_gene_table(gene_name);
    generate_by_sample_table(sample_name);
    
});

/*****************************************************************/

$("#gene-text-search").keydown(function (e) {

    if (e.which == 13) {
        e.preventDefault();
    }

}).keyup(function (e) {

    if (e.which == 13) {

        gene_name = $("#gene-text-search").val();

        if (gene_name) {
            $("#current-gene").html(gene_name);
        } else {
            gene_name = "TP53";
            $("#current-gene").html(gene_name);
        }

        generate_by_gene_table(gene_name);
    }

});


$("#gene-button-search").on("click", function (e) {

    gene_name = $("#gene-text-search").val();

    if (gene_name) {
        $("#current-gene").html(gene_name);
    } else {
        gene_name = "TP53";
        $("#current-gene").html(gene_name);
    }

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

        if (sample_name) {
            $("#current-sample").html(sample_name);
        } else {
            sample_name = "CPT0000640005";
            $("#current-sample").html(sample_name);
        }

        generate_by_sample_table(sample_name);        
    }

});


$("#sample-button-search").on("click", function (e) {

    sample_name = $("#sample-text-search").val();

    if (sample_name) {
        $("#current-sample").html(sample_name);
    } else {
        sample_name = "CPT0000640005";
        $("#current-sample").html(sample_name);
    }

    generate_by_sample_table(sample_name);

});

/*****************************************************************/

function generate_by_gene_table(gene_name) {

    $.ajax({
        url: "http://127.0.0.1:5000/search/gene/" + gene_name,
        type: "GET",
        dataType: "json",
        success: function (response) {

            if ($.fn.dataTable.isDataTable("#by-gene-table")) {
                table = $("#by-gene-table").DataTable();
                table.destroy();
            };

            $("#by-gene-table").DataTable({
                pageLength: 15,
                pagingType: "simple",
                data: response,
                columns: [
                    { data: "sample" },
                    { data: "ensembl_id" },
                    { data: "entrez_id" },
                    { data: "hgnc_symbol" },
                    { data: "full_name" },
                    { data: "fpkm" }
                ],
                buttons: [
                    "csv", "excel"
                ]
            });

            $(".dataTables_length").addClass("bs-select");
        },
        error: function () {
            console.log(gene_name + " not found.");
        }

    });

}

/*****************************************************************/

function generate_by_sample_table(sample_name) {

    $.ajax({
        url: "http://127.0.0.1:5000/search/sample/" + sample_name,
        type: "GET",
        dataType: "json",
        success: function (response) {

            if ($.fn.dataTable.isDataTable("#by-sample-table")) {
                table = $("#by-sample-table").DataTable();
                table.destroy();
            };

            $("#by-sample-table").DataTable({
                pageLength: 15,
                pagingType: "simple",
                data: response,
                columns: [
                    { data: "sample" },
                    { data: "ensembl_id" },
                    { data: "entrez_id" },
                    { data: "hgnc_symbol" },
                    { data: "full_name" },
                    { data: "fpkm" }
                ],
                buttons: [
                    "csv", "excel"
                ]
            });

            $(".dataTables_length").addClass("bs-select");
        },
        error: function () {
            console.log(sample_name + " not found.");
        }

    });

}

/*****************************************************************/
