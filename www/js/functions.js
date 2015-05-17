//functions

var comanda = Array();
var index = 0;

    function checkConnection() {
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        //console.log('Connection : ' + Connection);
        //console.log('Connection type: ' + states[networkState]);
        return networkState;
    }


function getComenzi(meniuid){


	var x = Array();
	$(meniuid+" .nume-prod").each(function(k, v) {
	    x[k]=$(v).text();
	});

	var y = Array();
	$(meniuid+" .pret-prod").each(function(k, v) {
	    y[k]=$(v).text();
	});

	var z = Array();
	$(meniuid+" .spin-val").each(function(k, v) {
	    z[k]=$(v).val();
	});


	$.each(z,function(i,v){
		if (parseInt(v)>0){
			comanda[index] = {
				numeprod : x[i],
				pretprod : y[i],
				nrprd	 : z[i]
			};
			index++;
		}
	});

}

function refreshTable(){
	var prettotal = 0;
	$('.add-comenzi').html('');
	$.each(comanda, function(i,v){
		$('.add-comenzi').append('<tr><td class="td-col">'+comanda[i].numeprod+'</td><td>'+comanda[i].nrprd+'</td><td>'+comanda[i].pretprod+'</td><td>'+parseInt(comanda[i].pretprod)*parseInt(comanda[i].nrprd)+'</td></tr>');
		prettotal +=parseInt(comanda[i].pretprod)*parseInt(comanda[i].nrprd);
	});
	$('.add-comenzi').append('<tr style="line-height:4em; font-size:1.5em;"><th colspan="2">Total</th><th colspan="2"><span class="pret-total">'+ prettotal +'</spam> LEI</th></tr>');
}

function buildOutput(){
	var outputVal = "";
	$.each(comanda, function(i,v){
		outputVal += comanda[i].nrprd + ' x ' + comanda[i].numeprod + ", ";
	});
	return outputVal;
}

function buildTotal(){
	var totalPlata = 0;
	$.each(comanda, function(i,v){
		totalPlata += parseInt(comanda[i].pretprod) * parseInt(comanda[i].nrprd);
	});
	return totalPlata;
}


$(document).ready(function() {
	$( "#addDrinks" ).click(function() {
		getComenzi('#four');
		refreshTable();
		$(".spin-val").val(0);
	});

	$( "#addFood" ).click(function() {
		getComenzi('#six');
		refreshTable();	
		$(".spin-val").val(0);
	});

    $("#csend").click(function(event){
            $.post( 
            	"http://www.creativezone.ro/apk/insert.php",
        		{ comanda: "comanda: "+buildOutput() },
        		function(data) {
        			console.log("comanda a fost trimisa");

            	}
        	);			
    });	
    $("#nsend").click(function(event){
            $.post( 
            	"http://www.creativezone.ro/apk/insert.php",
        		{ comanda : "nota de plata: "+buildTotal()+" LEI" },
        		function(data) {
        			console.log("nota a fost trimisa");

            	}
        	);			
    });
    $("#wsend").click(function(event){
            $.post( 
            	"http://www.creativezone.ro/apk/insert.php",
        		{ comanda: "chelner: la masa 9" },
        		function(data) {
        			console.log("chelner a fost trimisa");

            	}
        	);			
    });  
    $("#resetBill").click(function(event){
		comanda.length=0;
		index=0;
		refreshTable();
		$(".spin-val").val(0);
    });            
});







