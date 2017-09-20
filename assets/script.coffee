###
	       OA TEMPLATE 4.1
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
###

# ----- Pré-carregamento das imagens ----- #
imgs =	['assets/img/help.png']

preload = (imgs) ->
	counter = 0

	$(imgs).each ->
		$('<img />').attr('src', this).appendTo('body').css { display: 'none' }
		counter++

	if counter is imgs.length
		$('main').css { opacity: '1' }
		$('body').css { background: 'white' }

$(window).on 'load', -> preload(imgs)


# ----- Funções e dados ----- #
$ ->
	paused = true
	starttimer = undefined
	size = 48
	ctrl = 0
	wrap = new Audio('assets/wrap.mp3')
	func =
		dismiss: ->
			paused = false
			$('.dimmer').fadeOut()

		start: ->
			func.timer()
			func.dismiss()

			i = 0
			while i <= size
				$('.bubbles').append('<div><img src="assets/img/bubble.png"></div>')
				i++

		pause: ->
			paused = true
			$('.dimmer').fadeIn()
			$('.modal').html('<h1>Jogo pausado</h1><p>Clique no botão abaixo para retomar.</p><button class="dismiss">Continuar</button>')

		timer: ->
			s = 20
			starttimer = setInterval ->
				if paused isnt true
					if s > 0
						s--
						$('.timer .time').html(s)
					if s <= 0
						s = 0
						clearInterval(starttimer)

						$('.dimmer').fadeIn()
						$('.modal').html('<h1>Acabou o tempo!</h1><p>Você estourou ' + ctrl + ' bolhas, o que corresponde a ' + ((ctrl * 100) / size).toFixed(0) + '% do total. Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Restart</button>')

					$('.bar .innerbar').css { width: (100 / 20) * s + '%' }
			, 1000

		popBubble: ($el) ->
			ctrl++
			wrap.play()
			$el.css { pointerEvents: 'none' }
			$el.html('<img src="assets/img/burst.png">')

			if ctrl is size + 1
				clearInterval(starttimer)
				$('.dimmer').fadeIn()
				$('.modal').html('<h1>Fim de jogo!</h1><p>Você conseguiu estourar todas as bolhas! Clique no botão abaixo para jogar mais uma vez.</p><button class="again">Restart</button>')

# ----- Eventos ----- #
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.pause', -> func.pause()
	$(document).on 'click', '.bubbles div', -> func.popBubble $(this)
	$(document).on 'click', '.again', -> location.reload()
