
/*
	       OA TEMPLATE 4.1
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
 */

(function() {
  var imgs, preload;

  imgs = ['assets/img/bubble.png', 'assets/img/burst.png'];

  preload = function(imgs) {
    var counter;
    counter = 0;
    $(imgs).each(function() {
      $('<img />').attr('src', this).appendTo('body').css({
        display: 'none'
      });
      return counter++;
    });
    if (counter === imgs.length) {
      $('main').css({
        opacity: '1'
      });
      return $('body').css({
        background: 'white'
      });
    }
  };

  $(window).on('load', function() {
    return preload(imgs);
  });

  $(function() {
    var ctrl, func, paused, size, starttimer, time, wrap;
    paused = true;
    starttimer = void 0;
    size = 48;
    time = 20;
    ctrl = 0;
    wrap = new Audio('assets/wrap.mp3');
    func = {
      dismiss: function() {
        paused = false;
        return $('.dimmer').fadeOut();
      },
      mode: function($el) {
        if ($el.val() === 'easy') {
          size = 48;
          return time = 20;
        } else if ($el.val() === 'medium') {
          size = 63;
          return time = 25;
        } else {
          size = 80;
          return time = 30;
        }
      },
      start: function() {
        var i;
        func.timer();
        func.dismiss();
        $('.content').fadeIn();
        i = 0;
        while (i <= size) {
          $('.bubbles').append('<div><img src="assets/img/bubble.png"></div>');
          i++;
        }
        if (size === 48) {
          return $('.bubbles div').css({
            width: '3.8em'
          });
        } else if (size === 63) {
          return $('.bubbles div').css({
            width: '3.25em'
          });
        } else {
          return $('.bubbles div').css({
            width: '2.77em'
          });
        }
      },
      pause: function() {
        paused = true;
        $('.dimmer').fadeIn();
        return $('.modal').html('<h1>Jogo pausado</h1><p>Clique no botão abaixo para retomar.</p><button class="dismiss">Continuar</button>');
      },
      timer: function() {
        var s;
        s = time;
        return starttimer = setInterval(function() {
          if (paused !== true) {
            if (s > 0) {
              s--;
              $('.timer .time').html(s);
            }
            if (s <= 0) {
              s = 0;
              clearInterval(starttimer);
              $('.dimmer').fadeIn();
              $('.modal').html('<h1>Acabou o tempo!</h1><p>Você estourou ' + ctrl + ' bolhas, o que corresponde a ' + ((ctrl * 100) / size).toFixed(0) + '% do total. Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Restart</button>');
            }
            return $('.bar .innerbar').css({
              width: (100 / time) * s + '%'
            });
          }
        }, 1000);
      },
      popBubble: function($el) {
        ctrl++;
        wrap.play();
        $el.css({
          pointerEvents: 'none'
        });
        $el.html('<img src="assets/img/burst.png">');
        if (ctrl === size + 1) {
          clearInterval(starttimer);
          $('.dimmer').fadeIn();
          return $('.modal').html('<h1>Fim de jogo!</h1><p>Você conseguiu estourar todas as bolhas! Clique no botão abaixo para jogar mais uma vez.</p><button class="again">Restart</button>');
        }
      }
    };
    $(document).ready(function() {
      return $('.mode').change(function() {
        return func.mode($(this));
      });
    });
    $(document).on('click', '.start', function() {
      return func.start();
    });
    $(document).on('click', '.dismiss', function() {
      return func.dismiss();
    });
    $(document).on('click', '.pause', function() {
      return func.pause();
    });
    $(document).on('click', '.bubbles div', function() {
      return func.popBubble($(this));
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
