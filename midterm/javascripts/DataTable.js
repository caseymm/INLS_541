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

$(document).ready(function(){
 	console.log("Document Ready");

	$.ajax({
        type: "GET",
		url: "javascripts/banks541.xml",
		dataType: "xml",
		success: function(xml) {
		parseXML(xml);
	}
}); //close ajax

}); // document ready



	
function parseXML(xml){
	console.log("parseXML() called");
	buildHTML += '<table width="100%" border="1" id="table1" cellspacing="5" cellpadding="5"><thead><tr><td>Bank Name</td><td>City</td><td>State</td><td>Closing Date</td><td>Acquiring Institution</td></tr></thead><tbody>';	
	$(xml).find('ROWSET').each(function(){
		$(xml).find('ROW').each(function(){
		bankNameT= $(this).find('Bank_Name').text();
		cityT= $(this).find('City').text();
		stateT = $(this).find('ST').text();
		closeT = $(this).find('Closing_Date').text();
		//openT = $(this).find('Updated_Date').text();
		acqT = $(this).find('Acquiring_Institution').text();
					buildHTML += '<tr><td>' + bankNameT + '</td><td>' + cityT + '</td><td>' + stateT + '</td><td>' + closeT + '</td><td>' + acqT + '</td></tr>';
					
					
					
				
					
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
