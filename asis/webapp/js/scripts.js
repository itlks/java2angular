$(document).ready(function(){
	$(".fechar-alerta").click(function(event) {
		$(".alerta").fadeOut('fast');
	});
   $(".menu-lateral-internas").css("width", "42px");
   $(".menu-lateral-internas").hover( function() {
       $(this).animate({
           width:"225px"
       });
       }, function() {
       $(this).animate({
           width:"42px"
       });
   });

$(".table-checkbox th :checkbox").click(function(){
    if (this.checked){ 
        $(this).parents("table").find("td :checkbox").prop('checked', true);
        $(this).parents("table").find("tbody tr").addClass("checked");
    }

    else{
        $(this).parents("table").find("td :checkbox").prop('checked', false);
        $(this).parents("table").find("tbody tr").removeClass("checked");
    }
  });


$(".table-checkbox tbody tr :checkbox").click(function(){
    if (this.checked){ 
        $(this).parents("tr").addClass("checked");
    }

    else{
        $(this).parents("tr").removeClass("checked");
    }
  });


});