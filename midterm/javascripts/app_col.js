// JavaScript Document



var state = new Array();
var num = new Array();
var totalBanks = new Array();
var buildHTML;

	
		
		

    $(document).ready(function() {
		
		$.ajax({
        type: "GET",
		url: "ClosedBanks.xml",
		dataType: "xml",
		success: function(xml) {
		parseXML(xml);
	}
}); //close ajax
	});


function parseXML(xml){
	console.log("parseXML() called");
	$(xml).find('BankCount').each(function(){
		
			$(this).find('ClosedBank').each(function(){
			state.push($(this).find('State').text());
			num.push(parseFloat($(this).find('number').text()));
			
			
			console.log(state);
			console.log(num);
			
			}); //closedBank
		$(this).find('total').each(function(){
		totalBanks.push(parseFloat($(this).find('number_total').text()));
		});
		
	});//close find 
	
	
	buildChart();
	
    };
	
   
   function buildChart() { 
        var colors = Highcharts.getOptions().colors,
            categories = ['Northeast', 'Midwest', 'South', 'West'],
            name = 'Bank Closings by Location',
            data = [{
                    y: totalBanks[0],
                    color: '#94a8d1',
                    drilldown: {
                        name: 'Northeastern States',
                        categories: [state[0], state[1], state[2], state[3], state[4], state[5], state[6], state[7], state[8]],
                        data: [num[0], num[1], num[2], num[3], num[4], num[5], num[6], num[7], num[8]],
                        color: '#94a8d1'
                    }
                }, {
                    y: totalBanks[1],
                    color: '#aab0be',
                    drilldown: {
                        name: 'Midwestern States',
                        categories: [state[9], state[10] ,state[11], state[12], state[13], state[14], state[15], state[16] ,state[17], state[18], state[19], state[20]],
                        data: [num[9], num[10], num[11], num[12], num[13], num[14], num[15], num[16], num[17], num[18], num[19], num[20]],
                        color: '#aab0be'
                    }
                }, {
                    y: totalBanks[2],
                    color: '#d4dced',
                    drilldown: {
                        name: 'Southern States',
                        categories: [state[21], state[22], state[23], state[24], state[25], state[26], state[27], state[28], state[29], state[30], state[31], state[32], state[33], state[34], state[35], state[36], state[37]],
                        data: [num[21], num[22], num[23], num[24], num[25], num[26], num[27], num[28], num[29], num[30], num[31], num[32], num[33], num[34], num[35], num[36], num[37]],
                        color: '#d4dced'
                    }
                }, {
                    y: totalBanks[3],
                    color: '#eef1f8',
                    drilldown: {
                        name: 'Western States',
                        categories: [state[38], state[39], state[40], state[41], state[42], state[43], state[44], state[45], state[46], state[47], state[48], state[49], state[50]],
                        data: [num[38], num[39], num[40], num[41], num[42], num[43], num[44], num[45], num[46], num[47], num[48], num[49], num[50]],
                        color: '#eef1f8'
                    }
                }];
    
        function setChart(name, categories, data, color) {
			chart.xAxis[0].setCategories(categories, false);
			chart.series[0].remove(false);
			chart.addSeries({
				name: name,
				data: data,
				color: color || 'white'
			}, false);
			chart.redraw();
			
		}
    var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column',
				backgroundColor:'#f4f4f4'
            },
            title: {
                text: 'Bank Failures in the United States since 2000'
            },
            subtitle: {
                text: 'Click the columns to view bank closings by state. Click again to view bank closings by region.'
            },
            xAxis: {
                categories: categories,
		labels: {
                    rotation: -45,
                    align: 'right',
		    x: 10
                }
            },
            yAxis: {
                title: {
                    text: 'Number of Bank Closings'
                }
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                var drilldown = this.drilldown;
                                if (drilldown) { // drill down
                                    setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
									
                                } else { // restore
                                    setChart(name, categories, data);
									
                                }
								
								
                				
            					
 
                            }
                        }
                    },
				
                    dataLabels: {
                        enabled: true,
                        color: colors[0],
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function() {
                            return this.y;
                        }
                    }
                }
            },
		
            tooltip: {
                formatter: function() {
                    var point = this.point,
                        s = this.x +':<b>'+ this.y +' bank closings</b><br/>';
                    if (point.drilldown) {
                        s += 'Click to view breakdown of bank closings by state in the '+ point.category +'. ';
                    } else {
                        s += 'Click to return to view bank closings by region';
                    }
                    return s;
                }
            },
            series: [{
                name: name,
                data: data,
                color: 'white'
            }],
            exporting: {
                enabled: false
            }
		
        });
		loadYearData();
   }
   
   
   
    