
/*
	       OA TEMPLATE 4.1
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
 */

(function() {
  var imgs, preload;

  imgs = ['assets/img/help.png'];

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
    var ctrl, func, paused, size, starttimer;
    paused = true;
    starttimer = void 0;
    size = 48;
    ctrl = 0;
    func = {
      dismiss: function() {
        paused = false;
        return $('.dimmer').fadeOut();
      },
      start: function() {
        var i, results;
        func.timer();
        func.dismiss();
        i = 0;
        results = [];
        while (i <= size) {
          $('.bubbles').append('<div><img src="assets/img/bubble.png"></div>');
          results.push(i++);
        }
        return results;
      },
      pause: function() {
        paused = true;
        $('.dimmer').fadeIn();
        return $('.modal').html('<h1>Jogo pausado</h1><p>Clique no botão abaixo para retomar.</p><button class="dismiss">Continuar</button>');
      },
      timer: function() {
        var s;
        s = 20;
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
              $('.content').fadeOut();
              $('.modal').html('<h1>Acabou o tempo!</h1><p>Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Restart</button>');
            }
            return $('.bar .innerbar').css({
              width: (100 / 20) * s + '%'
            });
          }
        }, 1000);
      },
      popBubble: function($el) {
        ctrl++;
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
