var selected = [[]];

function expandAreas(values){
	
	for(i=0; i< values.length; i++){
		expand(values[i]);
	}	
}

function contractAreas(values){
	
	for(i=0; i< values.length; i++){
		contract(values[i]);
	}	
}

function contract(value){
	
	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");
	
	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");


	for(var i=0; i < divsToBeHidden.length; i++){
		divsToBeHidden[i].style.visibility = 'hidden';
		img.src="../images/u34.png";
	}
	
	var uls = document.getElementById(value + "_parent").getElementsByTagName("ul")[0];
	
	if (uls.classList.contains("opened")){
		uls.classList.remove("opened");
		uls.classList.add("closed");
		
		linkExpand.style.display = '';
		linkContract.style.display = 'none';

	}
}

function expand(value){
	
	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");

	for(var i=0; i < divsToBeHidden.length; i++){
		divsToBeHidden[i].style.visibility = '';
		img.src="../images/u36.png";
	}
	
	var uls = document.getElementById(value + "_parent").getElementsByTagName("ul")[0];
	
	if (uls.classList.contains("closed")){
		uls.classList.remove("closed");
		uls.classList.add("opened");
		
		linkExpand.style.display = 'none';
		linkContract.style.display = '';
		
	}
}

function dthideDiv(value){
	
		var divsToBeHidden = document.getElementsByName(value + "_div");
		var link = document.getElementById(value + "_link");
		var img = document.getElementById(value + "_img");
		
		var linkExpand = document.getElementById("expandirLink");
		var linkContract = document.getElementById("contractLink");

	
		for(var i=0; i < divsToBeHidden.length; i++){
			
			if (divsToBeHidden[i].style.visibility == ''){
				divsToBeHidden[i].style.visibility = 'hidden';
				img.src="../images/u34.png";
			} else {
				divsToBeHidden[i].style.visibility = '';
				img.src="../images/u36.png";
			}
		}
		
		var uls = document.getElementById(value + "_parent").getElementsByTagName("ul")[0];
		
		if (uls.classList.contains("closed")){
			uls.classList.remove("closed");
			uls.classList.add("opened");
			
			linkExpand.style.display = 'none';
			linkContract.style.display = '';

		} else {
			uls.classList.remove("opened");
			uls.classList.add("closed");
			
			linkExpand.style.display = '';
			linkContract.style.display = 'none';
		}
		
}

function dthideDivWithParent(value, parent){
	
	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	for(var i=0; i < divsToBeHidden.length; i++){
		
		if (divsToBeHidden[i].style.visibility == ''){
			divsToBeHidden[i].style.visibility = 'hidden';
			img.src="../images/u34.png";
		} else {
			divsToBeHidden[i].style.visibility = '';
			img.src="../images/u36.png";
		}
	}
	
	var uls = document.getElementById(value + "_parent").getElementsByTagName("ul")[0];
	
	if (uls.classList.contains("closed")){
		uls.classList.remove("closed");
		uls.classList.add("opened");
	} else {
		uls.classList.remove("opened");
		uls.classList.add("closed");
	}
	
	
}


function dtselect(value){
	
	var checkbox = document.getElementById(value);
	var checkboxes = document.getElementsByName(value);
	var qty = document.getElementById(checkbox.id + "_inputQty");
	var comp = document.getElementById(checkbox.id + "_inputComp");
	var daily = document.getElementById(checkbox.id + "_inputDaily");
	
	if (!checkbox.checked){
		for(var i=0;i<selected.length;i++) {
		
			if (selected[i][0] == checkbox.id){
				selected.splice(i, 1);
			}
		}
		
	} else {
		selected.push([checkbox.id, qty.value, comp.value, daily.value, true]);
	}
	
	if (checkbox.type == "checkbox"){
		qty.disabled = !checkbox.checked;
		comp.disabled = !checkbox.checked;
		daily.disabled = !checkbox.checked;
	}
	
	for(var i=0, n=checkboxes.length;i<n;i++) {
	    checkboxes[i].checked = checkbox.checked;
	    
	    if (checkboxes[i].type == "checkbox" && checkboxes[i].checked){
	    	selected.push([checkboxes[i].id, 0, 0, 0, true]);
	    }
	    
	    dtchildrens(checkboxes[i].id);
	}
	
	document.getElementById("formId:nodesSelected").value = selected;
}

function dtUpdateValue(nodeId, id, name, value){
	
	for(var i=0;i<selected.length;i++) {

		if ((selected[i].length > 0) && (selected[i][0] == nodeId)){
			var obj = document.getElementById(id);
			
			if (id.indexOf("_inputQty") != -1){
				selected[i][1] = value;
				break;
			} else if (id.indexOf("_inputComp") != -1){
				selected[i][2] = value;
				break;
			} else if (id.indexOf("_inputDaily") != -1){
				selected[i][3] = value;
				break;
			}
		}
	}
	
	for(var i=0;i<selected.length;i++) {

		if (((selected[i].length > 0) && (selected[i][0].startsWith(nodeId)))){
			var obj = document.getElementById(id);
			
			if (id.indexOf("_inputQty") != -1){
				selected[i][1] = obj.value;
				document.getElementById(selected[i][0] + "_inputQty").value = obj.value; 
			} else if (id.indexOf("_inputComp") != -1){
				selected[i][2] = obj.value;
				document.getElementById(selected[i][0] + "_inputComp").value = obj.value;
			} else if (id.indexOf("_inputDaily") != -1){
				selected[i][3] = obj.value;
				document.getElementById(selected[i][0] + "_inputDaily").value = obj.value;
			}
		} else if (nodeId == 0 && i > 0){

			var obj = document.getElementById(id);
			
			if (id.indexOf("_inputQty") != -1){
				selected[i][1] = obj.value;
				document.getElementById(selected[i][0] + "_inputQty").value = obj.value; 
			} else if (id.indexOf("_inputComp") != -1){
				selected[i][2] = obj.value;
				document.getElementById(selected[i][0] + "_inputComp").value = obj.value;
			} else if (id.indexOf("_inputDaily") != -1){
				selected[i][3] = obj.value;
				document.getElementById(selected[i][0] + "_inputDaily").value = obj.value;
			}
			
		}
	}
	
	document.getElementById("formId:nodesSelected").value = selected;
}

var dtchildrens = function dtcheckChildrens(value){
	
	var checkboxChld = document.getElementById(value);
	var checkboxesChld = document.getElementsByName(value);
	
	if (checkboxChld.type == "checkbox"){
		
		checkboxChld.disabled = checkboxChld.checked;

		var qty = document.getElementById(checkboxChld.id + "_inputQty");
		qty.disabled = checkboxChld.checked;
	
		var comp = document.getElementById(checkboxChld.id + "_inputComp");
		if (comp.nodeName == "INPUT"){
			comp.disabled = checkboxChld.checked;	
		}
	
		var daily = document.getElementById(checkboxChld.id + "_inputDaily");
		if (daily.nodeName == "INPUT"){
			daily.disabled = checkboxChld.checked;
		}
	}
	
	for(var j=0, x=checkboxesChld.length;j<x;j++) {
		
		checkboxesChld[j].checked = checkboxChld.checked;
		
		if (checkboxesChld[j].type == "checkbox" && checkboxesChld[j].checked){
	    	selected.push([checkboxesChld[j].id, 0, 0, 0, true]);
	    }
		
		dtcheckChildrens(checkboxesChld[j].id);
	}
}
 
typeof dtcheckChildrens === 'undefined'