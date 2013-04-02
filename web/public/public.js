$(function(){
	$('.url').focus();
	$(document).on('submit', function(e){
		e.preventDefault();
		var value = '';
		value = $('.url').val();
		$('.url').text('');
		$.ajax({
			type: 'POST',
			url: // dunno yet...,
			data: value,
			success: function(){ console.log('yeehaw, motherfuckers!'); },
			error: function(){ console.log('epic fail.'); }
		})

	});
});