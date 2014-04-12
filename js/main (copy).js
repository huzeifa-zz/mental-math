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

MentalMath.Model = {

	a: 0, b: 0, op: 0, ans: 0, score: 0,
	
	checkAns: function(ans) {
		if(this.op === 0 ) {
			return (ans === this.add());
		} else {
			return (ans === this.subtract());
		}
	},
	
	generateEqn: function() {
		this.a = this.random(0, 100);
		this.b = this.random(0, 100);
		this.op = this.random(0,1);
		
		if (this.op === 1) {
			var tmp = this.a;
			if(this.a < this.b) {
				this.a = this.b;
				this.b = tmp;
			}	
		}
		
		var opChar = ['+', '-'];
		return {
			'a': this.a,
			'b': this.b,
			'opChar': opChar[this.op]
		}
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

MentalMath.UI = {
	
	initialize: function() {
		$('#ans').focus();
		this.hide();
		$('#highscore').text(localStorage.getItem("highscore"));
		$('#btn-start').click(function(e){
			var d0 = new Date();
			var root = MentalMath;
			var isCountDown = false;
			root.UI.show();
			$(this).hide();
			var eqn = root.Model.generateEqn();
			$('#eq').text(eqn.a + ' ' + eqn.opChar + ' ' + eqn.b);
			var interval = setInterval(function(){
				var d = new Date();
				var t0 = d.getTime();
				var countDown = 60 - Math.floor((t0 - d0.getTime()) / 1000);
				$('#timer').text(countDown);
				if(countDown === 0) {
					$('#message').text('Game Over! Your score: ' + root.Model.score);
					root.UI.hide();
					root.UI.setHighscore(gameModel.score);
					isCountdown = true;
				}
			}, 1000);
			
			if(root.UI.isCountdown) {
				clearInterval(interval);
			}
			e.preventDefault();
		});
	},
	
	show: function() {
		$('#eq').show();
		$('#ans').show();
		$('#result').show();
		$('#timer').show();
	},
	
	hide: function() {
		$('#eq').hide();
		$('#ans').hide();
		$('#result').hide();
		$('#timer').hide();
	},
	
	setHighscore: function(score) {
		if(this.isLocalstorage) {
			var highscore = localStorage.getItem("highscore");
			if(score > highscore) {
				localStorage.setItem("highscore", score);
				$('#highscore').text('Congratulations! News highscore' + score);
			}
		}		
	},
	
	isLocalstorage: function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
		return false;
		}
	}
};

var gameModel = MentalMath.Model;
var gameUI = MentalMath.UI;
gameUI.initialize();

$(document).on('keypress', function(e){
		if(e.which === 13){
			var user_ans = parseInt($('#ans').val());
			if(gameModel.checkAns(user_ans)) {
				gameModel.score++;
				$('#result').text('correct!');
				$('#ans').val('');
				var eqn = gameModel.generateEqn();
				$('#eq').text(eqn.a + ' ' + eqn.opChar + ' ' + eqn.b);
			} else {
				$('#result').text('incorrect!');
				$('#ans').val('');
			}
		}
});
