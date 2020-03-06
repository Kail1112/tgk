document.addEventListener('click', function(event){
	var _self = event.target;
	//-----------
	///Аккордионы
	//-----------
	if(_self.classList.contains('accordion--top') == true || _self.wp__plugin.hasClassParents('accordion--top') == true){
		var _accordion = _self.wp__plugin.retrieveBlockByClass('accordion')[0];
		document.querySelectorAll('.accordion').forEach(function(el){
			if(Object.is(el, _accordion) == false){
				el.classList.remove('active');
			}
		});
		_accordion.classList.toggle('active');
	}
});