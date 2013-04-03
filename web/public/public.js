$(function(){
  $('.url').focus();
  $(document).on('submit', function(e){
    e.preventDefault();
    urlObj = { url: $('.url').val() };
    $('.url').val("");

    $.ajax({
      type: 'POST',
      url: "http://127.0.0.1:8080/",
      data: urlObj,
      success: function(data){ console.log('success'); },
      error: function(data){ console.log(urlObj.url); }
    });
  });
});