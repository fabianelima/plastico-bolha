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
		$('body').css { background: '#e7e7e7' }

$(window).on 'load', -> preload(imgs)


# ----- Funções e dados ----- #
$ ->
	paused = true
	starttimer = undefined
	data =	[]
	func =
		dismiss: ->
			paused = false
			$('.content').fadeIn()
			$('.dimmer').fadeOut()

		start: ->
			func.timer()
			func.dismiss()
			# coloca as coisa no lugar quando inicia o objeto.
			# caso não precise colocar conteúdo dinamicamente,
			# essa função pode ser eliminada e substituída pela
			# função "dismiss()"

		pause: ->
			paused = true
			$('.dimmer').fadeIn()
			$('.content').fadeOut()
			$('.modal').html('<h1>Jogo pausado</h1><p>Clique no botão abaixo para retomar.</p><button class="dismiss">Continuar</button>')

		timer: ->
			s = 45
			starttimer = setInterval ->
				if paused isnt true
					if s > 0
						s--
						$('.timer .time').html(s)
					if s <= 0
						s = 0
						clearInterval(starttimer)

						$('.dimmer').fadeIn()
						$('.modal').html('<h1>Acabou o tempo!</h1><p>Clique no botão abaixo para tentar mais uma vez.</p><button class="again">Restart</button>')

					$('.bar .innerbar').css { width: (100 / 45) * s + '%' }
			, 1000

# ----- Eventos ----- #
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.again', -> location.reload()
