var counter = 0;

document.getElementById("count").addEventListener('input', printValue);
function printValue(divId, value) {
	$("#"+divId).html(value);	
}
printValue("count",0);
	$("#inc").on('click ', increment);

function increment (){
	counter++;
	printValue("count",counter);
}