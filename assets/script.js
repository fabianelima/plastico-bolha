
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
        background: '#e7e7e7'
      });
    }
  };

  $(window).on('load', function() {
    return preload(imgs);
  });

  $(function() {
    var data, func, paused, starttimer;
    paused = true;
    starttimer = void 0;
    data = [];
    func = {
      dismiss: function() {
        paused = false;
        $('.content').fadeIn();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        func.timer();
        return func.dismiss();
      },
      pause: function() {
        paused = true;
        $('.dimmer').fadeIn();
        $('.content').fadeOut();
        return $('.modal').html('<h1>Jogo pausado</h1><p>Clique no botão abaixo para retomar.</p><button class="dismiss">Continuar</button>');
      },
      timer: function() {
        var s;
        s = 45;
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
              $('.modal').html('<h1>Acabou o tempo!</h1><p>Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Restart</button>');
            }
            return $('.bar .innerbar').css({
              width: (100 / 45) * s + '%'
            });
          }
        }, 1000);
      }
    };
    $(document).on('click', '.start', function() {
      return func.start();
    });
    $(document).on('click', '.dismiss', function() {
      return func.dismiss();
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
