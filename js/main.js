(function () {
    'use strict';
    var MentalMath = window.MentalMath || {};

    MentalMath.Model = {

        a: 0,
        b: 0,
        op: 0,
        ans: 0,
        score: 0,

        checkAns: function (ans) {
            if (this.op === 0) {
                return (ans === this.add());
            }
            return (ans === this.subtract());
        },

        initialize: function () {
            this.a = this.random(0, 100);
            this.b = this.random(0, 100);
            this.op = this.random(0, 1);
            var tmp = this.a;

            if (this.op === 1) {
                if (this.a < this.b) {
                    this.a = this.b;
                    this.b = tmp;
                }
            }
        },

        eqnGen: function () {
            MentalMath.Model.initialize();
            var opSign = ['+', '-'];
            return (this.a + " " + opSign[this.op] + " " + this.b);
        },

        add: function () {
            return this.a + this.b;
        },

        subtract: function () {
            return this.a - this.b;
        },

        random: function (min, max) { //random function is obtained from underscore.js. All credit goes to underscore.js.
            if (max === null) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        },

        setHighscore: function () {
            if (this.isLocalstorage) {
                var highscore = localStorage.getItem("highscore");
                if (this.score > highscore) {
                    localStorage.setItem("highscore", this.score);
                }
            }
        },

        isLocalstorage: function () {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }
    };

    MentalMath.UI = {
        $: function (id) {
            return document.getElementById(id);
        },
        
        initialize: function () {
            var model = MentalMath.Model;
            var highscore = localStorage.getItem("highscore");
            if (!highscore) {
                this.$('highscore').innerHTML = "Let's see how sharp your brain is?";
            }
            else {
                this.$('highscore').innerHTML = localStorage.getItem("highscore");
            }
            var _ = this;
            this.$('btn-start').addEventListener('click', function (e) {
                var d0 = new Date(),
                    equation = model.eqnGen();
				_.$('input-wrapper').style.display = 'block';
                _.$('btn-start').style.display = 'none';
                _.$('eq').innerHTML = equation;
                var options = {
                        bg: '#acf',
                        target: document.getElementById('progress-bar'),
                        id: 'timer'
                    };

                var nanobar = new Nanobar( options );
                setInterval(function () {
                    var d = new Date(),
                        t0 = d.getTime(),
                        countDown = 60 - Math.floor((t0 - d0.getTime()) / 1000);
                    if (countDown >= 0) {
                        nanobar.go( ((60-countDown) / 60) * 100);
                    }

                    if (countDown === 0) {
                        model.setHighscore();
                        var highscore = localStorage.getItem("highscore");
                        if (highscore) {
                            _.$('highscore').innerHTML = localStorage.getItem("highscore");
                        }
                        _.$('message').style.display = 'block';
                        _.$('message').innerHTML = 'Game Over! Your score: ' + model.score;
                        _.$('input-wrapper').style.display = 'none';
                        return false;
                    }
                }, 1000);
                e.preventDefault();
            });

            this.$('ans').addEventListener('keypress', function (e) {
                if (e.which === 13) {
                    var user_ans = parseInt(_.$('ans').value, 10);
                    if (model.checkAns(user_ans)) {
                        model.score = model.score + 1;
                        _.$('result').innerHTML = 'Correct! :)';
                        _.$('eq').innerHTML = model.eqnGen();
                    } else {
                        _.$('result').innerHTML = 'Incorrect! :(';
                    }
                    _.$('ans').value = '';
                }
            });
        },

    };

    MentalMath.UI.initialize();

}());
