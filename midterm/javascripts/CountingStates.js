// JavaScript Document

var bankName = new Array();
var city = new Array();
var state = new Array();
var buyer = new Array();
var closeDate = new Array();
var openDate = new Array();
var bankNameT;
var cityT;
var closeT;
var openT;
var acqT;
var buildHTML;

//var stateList = new Array("AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");

//$(document).ready(function(){
 	console.log("Document Ready");
function loadBankData(){	
	$.ajax({
        type: "GET",
		url: "BankData.xml",
		dataType: "xml",
		success: function(xml) {
		parseXML2(xml);
	}
}); //close ajax
//}); // document ready

}


function parseXML2(xml){
	console.log("parseXML() called");
	buildHTML += '<table width="100%" class="responsive" border="1" id="table1" cellspacing="5" cellpadding="5"><thead><tr><td>Bank Name</td><td>City</td><td>State</td><td>Closing Date</td><td>Reopening Date</td><td>Acquiring Institution</td></tr></thead><tbody>';	
	$(xml).find('Banks').each(function(){
		$(xml).find('Row').each(function(){
		bankNameT= $(this).find('Field_0').text();
		cityT= $(this).find('Field_1').text();
		stateT = $(this).find('Field_2').text();
		closeT = $(this).find('Field_5').text();
		openT = $(this).find('Field_6').text();
		acqT = $(this).find('Field_4').text();
					buildHTML += '<tr><td>' + bankNameT + '</td><td>' + cityT + '</td><td>' + stateT + '</td><td>' + closeT + '</td><td>' + openT + '</td><td>' + acqT + '</td></tr>';
					
					
					
				
					
		}); //closing division loop
		
	}); //closing league loop
	buildHTML += '</tbody></table>';
 	
	$(buildHTML).appendTo('.table');
	$('#table1').dataTable( {
					"bJQueryUI": true,
					"sPaginationType": "full_numbers"
				} ); 
	getStates(xml);		
		
}
//});