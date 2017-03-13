$(".catalogue-primary").click(function(event) {
  $(".catalogue-content" ).addClass('js-hidden');
  var target = $( event.target )
  $('#' + target.attr('data-target')).toggleClass('js-hidden');
});

$(".filter-control").click(function(event) {
  var target = $( event.target )
  $('#' + target.attr('data-target')).toggleClass('js-hidden');
});

