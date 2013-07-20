$(document).ready(function(){
	// Pegando os dados dos pontos turísticos do arquivo .xml disponibilizado pelo governo.
	$.ajax({
		url: "./feed/EMPETUR_PontosTuristicosPE_dado.xml",
		contentType: "application/x-www-form-urlencoded; charset=ISO-8859-1",
		dataType: "xml"
		}).done(function(data, textStatus, jqXHR){
			//navigator.geolocation.getCurrentPosition(success);

			//function success(position){
			//	lat = position.coords.latitude;
			//    lng = position.coords.longitude;
		    //	map = L.map('map').setView([lat, lng], 17);
			//}

			var pontosTuristicoDados = $(data).find('registro');

			// Pegando os dados de mídia dos pontos turísticos do arquivo .xml disponibilizado pelo governo.
			$.ajax({
				url: "./feed/EMPETUR_MidiasPontosTuristicosPE_dado.xml",
				contentType: "application/x-www-form-urlencoded; charset=ISO-8859-1",
				dataType: "xml"
				}).done(function(data2){

					var lat = -8.0291095;
					var lng = -34.8693141;

					var map = L.map('map').setView([lat, lng], 17);
					L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
					    maxZoom: 18
					}).addTo(map);
					
					var index = 0;
					var markers = new L.MarkerClusterGroup();
					pontosTuristicoDados.each(function(){
						index += 1;
						pontoLat = $(this).attr('campo4');
						pontoLng = $(this).attr('campo5');
						if(pontoLat != '' && pontoLng != ''){
							var marker = new L.Marker([pontoLat, pontoLng]);
							//var marker = L.marker([pontoLat, pontoLng]).addTo(map);
							marker.bindPopup("Categoria: "+$(this).attr('campo7') +"<br/>"+"Nome: "+$(this).attr('campo2') +"<br/>"
								//+"Descrição: "+$(this).attr('campo8')+"<br/>"
								+"<img style='width:200px' src='http://www.expressovirtual.pe.gov.br"+$(data2).find('registro[campo2='+$(this).attr('campo1')+']').attr('campo4')+"'/>");
							markers.addLayer(marker);
						}
						map.addLayer(markers);
						$('#resultado').text(index + " - "+$(this).attr('campo2'));
					});
				});
	});
	
});


