/*$(function(){

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
}*/


var MentalMath = MentalMath || {};

var MentalMath = {

	op_char: ['+', '-'],
	a: 0, b: 0, op: 0, ans: 0, score: 0,
	
	initialize: function() {
		this.generate();
		if(this.op === 0) {
			this.ans = this.add();
		}
		else {
			var tmp = this.a;
			if(this.a < this.b) {
				this.a = this.b;
				this.b = tmp;
			} 
			this.ans = this.subtract();
		}
	},
	
	generate: function() {
		this.a = this.random(0, 100);
		this.b = this.random(0, 100);
		this.op = this.random(0,1);
	},
	
	add: function(){
		return this.a + this.b;
	},
	
	subtract: function(){		
		return this.a - this.b
	},
	
	random: function(min, max) { //random function is obtained from underscore.js. All credit goes to underscore.js.
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	},
};


var start = function() {
	var d0 = new Date();
	$('#eq').show();
	$('#ans').show();
	$('#btn-start').hide();
	var interval = setInterval(function(){
		var d = new Date();
		var t0 = d.getTime();
		var countDown = 60 - Math.floor((t0 - d0.getTime()) / 1000);
		$('#timer').text(countDown);
		if(countDown === 0) {
			$('#eq').text('Game Over! Your score: ' + game.score);
			$('#ans').hide();
			clearInterval(interval);
		}
	}, 1000);
}

var game = MentalMath;
$('#eq').hide();
$('#ans').hide();
game.initialize();
$('#eq').text(game.a + ' ' + game.op_char[game.op] + ' ' + game.b);
$(document).on('keypress', function(e){
		if(e.which === 13){
			var user_ans = parseInt($('#ans').val());
			
			if(user_ans === game.ans) {
				game.score++;
				$('#result').text('correct!');
				$('#ans').val('');
				game.initialize();
				$('#eq').text(game.a + ' ' + game.op_char[game.op] + ' ' + game.b);
			} else {
				$('#result').text('incorrect!');
				$('#ans').val('');
			}
		}
});
