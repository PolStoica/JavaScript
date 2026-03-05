// update numbers so I can change them
function updateNumbers(){
	var firstNumberText = parseInt($('#firstNumber').val());
	var secondNumberText = parseInt($('#secondNumber').val());
	first=parseInt( firstNumberText );
	second = parseInt(secondNumberText);
	return{first, second};
}

// i can update the result wich is a div
document.getElementById("result").addEventListener('div', printValue);
function printValue(divId, value) {
	$("#"+divId).html(value);
}
printValue("result",);

$("#add").on('click', add);
function add(){
	var {first,second} = updateNumbers();
	printValue("result",first+second);
}

$("#sub").on('click', sub);
function sub(){
	var {first,second} = updateNumbers();
	printValue("result",first-second);
}

$("#mul").on('click', mul);
function mul(){
	var {first,second} = updateNumbers();
	printValue("result",first*second);
}

$("#div").on('click',div);
function div(){
	var {first,second} = updateNumbers();
	printValue("result",first/second);
}

$("#mod").on('click',mod);
function mod(){
	var {first,second} = updateNumbers();
	printValue("result",first%second);
}