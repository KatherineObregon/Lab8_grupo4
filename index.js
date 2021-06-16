$(document).ready(function () {
	
	var fecha = "";
	
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/summary"
    }).done(function (msg) {
        var infoGlobal = msg.Global;
        $("#newConfirmed").html(infoGlobal.NewConfirmed);
        $("#newDeaths").html(infoGlobal.NewDeaths);
        $("#newRecovered").html(infoGlobal.NewRecovered);
        $("#totalConfirmed").html(infoGlobal.TotalConfirmed);
        $("#totalDeaths").html(infoGlobal.TotalDeaths);
        $("#totalRecovered").html(infoGlobal.TotalRecovered);

        var paises = msg.Countries;
        paises = paises.sort(compare)
		fecha = paises[0].Date;
		formatDate(fecha);
        $.each(paises, function (i, pais) {
            var htmlAdd = "<tr>"+
                "          <td>" + (i + 1) + "</td>\n" +
                "          <td>" + pais.Country + "</td>\n" +
                "          <td>" + pais.TotalConfirmed + "</td>\n" +
                "          <td>" + pais.TotalDeaths + "</td>\n" +
                "          <td>" + pais.TotalRecovered + "</td>\n" +
                "          <td>" + pais.NewConfirmed + "</td>\n" +
                "          <td>" + pais.NewDeaths + "</td>\n" +
                "          <td>" + pais.NewRecovered + "</td>\n" +
                "          <td><a class='btn btn-primary' role='button' href='./detallePais/detallePais.html?name="+ pais.Country +"&slug="+pais.Slug+"&countryCode="+pais.CountryCode+"&caseCovid=confirmed'>Ver detalle</a></td>"+
                "          </tr>";
            $("#body-paises").append(htmlAdd);
			
			
        });
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
	
	
	
});

function compare(a, b) {
    const TotalConfirmed1 = a.TotalConfirmed;
    const TotalConfirmed2 = b.TotalConfirmed;
    let comparison = 0;
    if (TotalConfirmed1 > TotalConfirmed2) {
        comparison = -1;
    } else if (TotalConfirmed1 < TotalConfirmed2) {
        comparison = 1;
    }
    return comparison;
}

function formatDate(date) {
	date = date.substring(0,10).split('-').join('/');
    $("#titulo-resumen-global").html("Resumen Global - "+ date);
}