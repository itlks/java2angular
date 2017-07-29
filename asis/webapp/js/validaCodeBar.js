$(function() {
	BarCode.init({
		onChange : function(barcode) {
			console.debug(barcode);
		}
	});
});
