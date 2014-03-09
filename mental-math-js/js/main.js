$(function(){
	// generate equation and answer
	var eq = generateEq();
	var answer = getAnswer(eq);
	$('#eq').text(eq.a + ' ' + eq.op + ' ' + eq.b);

	// when user press enter
	$(document).on('keypress', function(e){
		if(e.which === 13){
			var ans = parseInt($('#ans').val());

			// display feedback
			if (ans === answer){
				$('#result').text('correct!');
			}
			else {
				$('#result').text('incorrect! ' + eq.a + ' ' + eq.op + ' ' + eq.b + ' = ' + answer);
			}

			// reset and make make new question
			eq = generateEq();
			answer = getAnswer(eq);
			$('#eq').text(eq.a + ' ' + eq.op + ' ' + eq.b);
			$('ans').val('');
		}
	});
})

function generateEq(){
	var num = {
		'a': random(0, 100), 
		'b': random(0, 100),
		'op': random(0,1)
	};
	if(num.op === 0) {
		num.op = '+';
	} else {
		num.op = '-';
	}
	return num;
}

function getAnswer(eq){
	if(eq.op === '+') {
		return eq.a + eq.b;
	} else {
		return eq.a - eq.b;
	}
}


var random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
 };