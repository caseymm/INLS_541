// JavaScript Document
var yearNum = new Array();
var buildHTML;


function loadYearData(){
	

$.ajax({
        type: "GET",
		url: "yearly.xml",
		dataType: "xml",
		success: function(xml) {
		parseXML3(xml);
	}
}); //close ajax


}

function parseXML3 (xml){
	console.log("parseXML()3 called");
	$(xml).find('document').each(function(){
		
			$(this).find('year').each(function(){
			yearNum.push(parseFloat($(this).find('bank_close').text()));
			
			
			}); //closedBank
		
		
	});//close find 
	
	buildArea()
	
    };

function buildArea() {
	console.log("buildArea()3 called");
    var chart1;
   // $(document).ready(function() {
        chart1 = new Highcharts.Chart({
            chart: {
                renderTo: 'areaGraph',
                type: 'area',
				backgroundColor:'#f4f4f4'
            },
            title: {
                text: 'US Bank Failures by Year'
            },
            subtitle: {
                text: 'Mouse over to view how many banks closed each year'
            },
            xAxis: {
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    },
		    rotation: -45,
                    align: 'right',
		    x: 5   
                },
		tickInterval: 1
            },
            yAxis: {
                title: {
                    text: 'Number of Banks Closed'
                },
                labels: {
                    formatter: function() {
                        return this.value / 1.00;
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return this.series.name +': <b>'+Highcharts.numberFormat(this.y, 0) +'</b><br/>banks closed in '+ this.x;
                }
            },
            plotOptions: {
                area: {
					color: '#aab0be',
                    pointStart: 2000,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 1,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Banks Closed',
                data: [yearNum[0], yearNum[1], yearNum[2], yearNum[3], yearNum[4], yearNum[5], yearNum[6], yearNum[7], yearNum[8], yearNum[9], yearNum[10], yearNum[11], yearNum[12], yearNum[13], yearNum[14]]
            }]
        });
   
   loadBankData();
    };
    
//});