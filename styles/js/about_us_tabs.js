$(function(){
	var hideContent = {
		'click': function(_btn){
			var content = _btn.parent().find('.content-hidden');
			if(content.length > 0){
				content.toggleClass('opened');
				if(content.hasClass('opened') == true){
					_btn.text(_btn.attr('data-closed_text'));
				} else {
					_btn.text(_btn.attr('data-opened_text'));
				}
				this.resize();
			}
		},
		'resize': function(){
			var content_hidden = document.querySelectorAll('.content-hidden');
			content_hidden.forEach(function(_block){
				if($(_block).hasClass('opened') == true){
					var _html = '<div class="about_us_tabs--content about_us_tabs--inner" style="width:'+$(_block).outerWidth(true)+'px;">'+_block.innerHTML+'</div>',
						height = wp__checkWidthBlock(_html, 'height');
					_block.style.maxHeight = height+'px';
				} else {
					_block.style.maxHeight = '';
				}
			});
		},
		'update': function(){
			window.addEventListener('resize', function(){
				hideContent.resize();
			});
		}
	}
	$(document).on('click', '.btn-open_hidden_content', function(){
		/*
		var content = $(this).parent().find('.content-hidden');
		if(content.length > 0){
			content.toggleClass('opened');
			if(content.hasClass('opened') == true){
				$(this).text($(this).attr('data-closed_text'));
			} else {
				$(this).text($(this).attr('data-opened_text'));
			}
		}
		*/
		hideContent.click($(this));
	});
	if($('.about_us_tabs--carousel').length > 0 && $('.about_us_tabs').length > 0){
		$('.about_us_tabs').each(function(){
			var el = $(this),	
				collection_btn = '';
			$(this).find('.about_us_tabs--slide').each(function(index){
				console.log(index);
				var title = $(this).attr('data-title_for_btn'),
					_class = index == 0 ? ' active' : '';
				collection_btn += '<button class="btn_line'+_class+'" data-index="'+index+'">'+title+'</button>';
			});
			el.find('.about_us_tabs--top').html('');
			el.find('.about_us_tabs--top').html(collection_btn);
			var carousel = el.find('.about_us_tabs--carousel');
			el.find('.about_us_tabs--top button').click(function(){
				var index = parseInt($(this).attr('data-index'), 10);
				carousel.slick('slickGoTo',index);
				el.find('.about_us_tabs--top button').removeClass('active');
				$(this).addClass('active');
			});
			carousel.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				fade: true
			});
			carousel.on('afterChange', function(event, slick, currentSlide){
				carousel.parents('.about_us_tabs').find('.about_us_tabs--top button').removeClass('active');
				carousel.parents('.about_us_tabs').find('.about_us_tabs--top button[data-index="'+currentSlide+'"]').addClass('active');
			});
		});
	}
});