document.getElementById("n").addEventListener('input',inputSum );
function inputSum(){
    var input = document.getElementById("n").value;
    console.log(sum(input));
}
function sum(n){
    var number = Number(n);
    if (Number.isNaN(number))
        return "not a number";
    var sum = 0;
    for(var i = 1; i <= number; i++){
        sum += i;
    }
    return sum;
}

/* problema 4 */
document.getElementById("n").addEventListener('input',fibonacciSum );
function fibonacciSum(){
    var input = document.getElementById("n").value;
    console.log(fibonacci(input));
}
function fibonacci(n){
    var number = Number(n);

    if (number < 1 || number > 10)
        return "not allowed ";
    if (Number.isNaN(number) || n==="")
        return "not a number";

    var fibonacciSequence = [1,1];

    if (number===0)
        return [0,0];
    if (number===1)
        return [0,1];
    if (number===2)
        return fibonacciSequence;

    for(var i = 1; i <= number-2; i++){
        var next=fibonacciSequence[fibonacciSequence.length-2]+fibonacciSequence[fibonacciSequence.length-1];
        fibonacciSequence= fibonacciSequence.concat(next) ;
    }
    return fibonacciSequence;
}

/* problema 5 */
