$(function(){
	var about_us = {
		'init_small': function(){
			$('.about_us--small').each(function(){
				var count = $(this).find('.about_us--small-slide').length,
					counter_now = $(this).find('.about_us--small-counter__now'),
					counter_full = $(this).find('.about_us--small-counter__all');
				counter_now.text('1');
				counter_full.text(count);
				$(this).find('.about_us--small-main').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					dots: false
				});
				$(this).find('.about_us--small-main').on('afterChange', function(event, slick, currentSlide){
					counter_now.text((currentSlide+1));
				});
			});
		},
		'init_horiz': function(){
			$('.about_us--horiz-main').each(function(){
				var el = $(this),
					timeoutcount,
					_parent = el.parents('.about_us--horiz'),
					nav = _parent.find('.nav-carousel'),
					nav_test = nav.length > 0 ? true : false;
				if(nav_test == true){
					var count_slide = el.find('.about_us--horiz-slide').length,
						count_slide_while = 1,
						count_slide_btn = '';
					while(count_slide_while <= count_slide){
						count_slide_btn += '<li><button data-slide="'+(count_slide_while-1)+'"></button></li>';
						count_slide_while++;
					}
					nav.find('ul').html(count_slide_btn);
				}
				el.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: false
				});
				if(nav_test == true){
					nav.find('ul').find('button').click(function(){
						var index = parseInt($(this).attr('data-slide'), 10);
						el.slick('slickGoTo', index);
					});
					nav.find('.nav-carousel--arrow').click(function(){
						var action = $(this).attr('data-action');
						switch(action){
							case 'prev' : {
								el.slick('slickPrev');
							} break;
							case 'next' : {
								el.slick('slickNext');
							} break;
						}
					});
				}
				var cuerent_slide = el.find('.about_us--horiz-slide.slick-active').find('h2[data-count_to]');
				if(cuerent_slide.length > 0){
					var count_to = parseFloat(el.find('.about_us--horiz-slide.slick-active').find('h2').attr('data-count_to').replace(/(\n|\t|\s|\r)/gi, ''));
					jQuery({ Counter: 0 }).animate({ Counter: count_to }, {
						duration: 3000,
						easing: 'swing',
						step: function () {
							cuerent_slide.html(wp__returnPrice(Math.ceil(this.Counter), 'span'));
						}
					});
					if(timeoutcount){
						timeoutcount = null;
					}
					timeoutcount = setTimeout(function(){
						cuerent_slide.html(wp__returnPrice(count_to, 'span'));
					}, 3000);
				}
				el.on('afterChange', function(event, slick, currentSlide){
					var cuerent_slide = $(slick.$slider).find('.about_us--horiz-slide.slick-active').find('h2[data-count_to]');
					if(cuerent_slide.length > 0){
						var count_to = parseFloat(cuerent_slide.attr('data-count_to').replace(/(\n|\t|\s|\r)/gi, ''));
						$(slick.$slider).find('h2[data-count_to]').html('');
						jQuery({ Counter: 0 }).animate({ Counter: count_to }, {
							duration: 3000,
							easing: 'swing',
							step: function () {
								cuerent_slide.html(wp__returnPrice(Math.ceil(this.Counter), 'span'));
							}
						});
						if(timeoutcount){
							timeoutcount = null;
						}
						timeoutcount = setTimeout(function(){
							cuerent_slide.html(wp__returnPrice(count_to, 'span'));
						}, 3000);
					}
				});
			});
		}
	}
	about_us.init_small();
	about_us.init_horiz();
})