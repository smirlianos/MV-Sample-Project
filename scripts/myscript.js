var ourData;  //the JSON file

const headCSS = `
	<style>
		table, th, td {
			border: 1px solid black;
			border-collapse: collapse;
		}
		td {
			text-align: right;
		}
		#SKU {
			text-align: left;
			font-weight: bold;
		}
	</style>
`

function Load() {

	var JSONsource = new XMLHttpRequest();

	//uploaded the JSON file for easy access
	JSONsource.open('GET', 'https://api.jsonbin.io/b/608831e25210f622be3b4b06');
	JSONsource.setRequestHeader("secret-key", "$2b$10$u.AbcadVPfUsXWpLsEoiZu8yLn4mg/uUpygoPDeih.THeBy8cJT3i")
	JSONsource.onload = function() {
		ourData = JSON.parse(JSONsource.responseText);
		var orderCount = ourData.mvPurchaseOrders.length;
		var listString = "";

		//add the list elements to the html
		for(var i = 0; i < orderCount; i++){
			listString = listString + '<li><a href="#" onclick="OpenDetails('+i+');return false;">' + ourData.mvPurchaseOrders[i].PurchaseOrderTypeAbbreviation + " - " + ourData.mvPurchaseOrders[i].PurchaseOrderNo + "</a></li>";
		}
		
		document.getElementById("ordersList").innerHTML = listString;
		
	};
	JSONsource.send();

}

function OpenDetails(orderNum){
	console.log(orderNum);
	var win = window.open("");
	var details = "";

	details = "Address: " + ourData.mvPurchaseOrders[orderNum].PurchaseOrderAddress + " <br>\
	Contact Person: " + ourData.mvPurchaseOrders[orderNum].PurchaseOrderContactPerson + " <br>\
	Order Status: " + ourData.mvPurchaseOrders[orderNum].PurchaseOrderStatus + " <br>\
	Order Details: ";

	var table = `
	<table>
		<tr>
			<th>Product SKU</th>
			<th>Quantity Ordered</th>
			<th>Unit Price</th>
			<th>Total Amount</th>
        </tr>
	`

	for(var i = 0; i < ourData.mvPurchaseOrders[orderNum].PurchaseOrderDetails.length; i++){
		table += `
		<tr>
			<td id="SKU">`+ourData.mvPurchaseOrders[orderNum].PurchaseOrderDetails[i].PurchaseOrderRowProductSKU+`</td>
			<td>`+ourData.mvPurchaseOrders[orderNum].PurchaseOrderDetails[i].PurchaseOrderRowQuantity+`</td>
			<td>`+ourData.mvPurchaseOrders[orderNum].PurchaseOrderDetails[i].PurchaseOrderRowUnitPriceWithoutTaxOrDiscount+`</td>
			<td>`+ourData.mvPurchaseOrders[orderNum].PurchaseOrderDetails[i].PurchaseOrderRowTotalAmount+`</td>
		</tr>`;
	}

	table += "</table>"

	win.document.body.innerHTML = headCSS + details + table;
}
