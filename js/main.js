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

        initialize: function () {
            $('#ans').focus();
            this.hide();
            $('#message').hide();
            var root = MentalMath;
            $if(localStorage.getItem("highscore") != "null")
                $('#highscore').text(localStorage.getItem("highscore"));
            else {
                $('#highscore').text(0);
            }
            $('#btn-start').click(function (e) {
                var d0 = new Date(),
                    equation = root.Model.eqnGen();
                root.UI.show();
                $(this).hide();
                $('#eq').text(equation);
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
                        $('#message').show();
                        $('#message').text('Game Over! Your score: ' + root.Model.score);
                        $('.input-wrapper').hide();
                        root.UI.hide();
                        root.Model.setHighscore();
                        return false;
                    }
                }, 1000);
                e.preventDefault();
            });

            $(document).on('keypress', function (e) {
                if (e.which === 13) {
                    var user_ans = parseInt($('#ans').val(), 10);
                    if (MentalMath.Model.checkAns(user_ans)) {
                        MentalMath.Model.score = MentalMath.Model.score + 1;
                        $('#result').text('Correct! :)');
                        $('#eq').text(MentalMath.Model.eqnGen());
                    } else {
                        $('#result').text('Incorrect! :(');
                    }
                    $('#ans').val('');
                }
            });
        },

        show: function () {
            $('#eq').show();
            $('#ans').show();
            $('#result').show();
            $('#timer').show();
        },

        hide: function () {
            $('#eq').hide();
            $('#ans').hide();
            $('#result').hide();
        }
    };

    MentalMath.UI.initialize();

}());
