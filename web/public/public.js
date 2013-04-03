$(function(){
	$('.url').focus();
	$(document).on('submit', function(e){
		e.preventDefault();
		var value = '';
		value = $('.url').val();
		$('.url').text('');
		$.ajax({
			type: 'POST',
			url: "http://127.0.0.1:8080/",
			data: value,
			success: function(){ console.log('yeehaw, motherfuckers!'); },
			error: function(){ console.log('epic fail.'); }
		});

	});
});