
const urlParams = new URLSearchParams(window.location.search);
const nameCountry = urlParams.get('name');
const countryCode = urlParams.get('countryCode');
const slug = urlParams.get('slug');
const caseCovid = urlParams.get('caseCovid');


$(document).ready(function () {
	
    $("#titulo").html('Resumen del país ' + nameCountry);

	$("#bandera-div").html("<img src='https://www.countryflags.io/"+
						countryCode+"/flat/64.png'/>")


    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://restcountries.eu/rest/v2/alpha/" + countryCode
    }).done(function (data) {
        $("#capital").html(data.capital);
        $("#population").html(data.population);
		$("#subregion").html(data.subregion);
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });

    obtenerDataPais();
	
	
	//BOTON:
	var nuevaDireccion = "../grafico/graficoEvolutivo.html?name="+nameCountry
							+"&slug="+slug+"&countryCode="+countryCode+"&caseCovid=confirmed";
	$("#redirect-grafico").attr('href',nuevaDireccion);
	
});

function seleccionarCasos() {
    var opSelect = $("#caseCovid").val();
	
	$("#body-paises").html("");
	
	$.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + opSelect
    }).done(function (data) {
        
		$.each(data,function(i, infoDia){
			var fecha = infoDia.Date.substring(0,10).split('-').join('/');
			var codHtml = "<tr> <td>"+fecha+"</td>"
							+"<td>"+infoDia.Cases+"</td> </tr>";
			$("#body-paises").append(codHtml);
		});
	
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
	
	//BOTON:
	var nuevaDireccion = "../grafico/graficoEvolutivo.html?name="+nameCountry
							+"&slug="+slug+"&countryCode="+countryCode+"&caseCovid="+opSelect;
	$("#redirect-grafico").attr('href',nuevaDireccion);
}

function obtenerDataPais() {
	
	$("#body-paises").html("");
	
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        
		$.each(data,function(i, infoDia){
			var fecha = infoDia.Date.substring(0,10).split('-').join('/');
			var codHtml = "<tr> <td>"+fecha+"</td>"
							+"<td>"+infoDia.Cases+"</td> </tr>";
			$("#body-paises").append(codHtml);
		});
	
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
    //TODO
}