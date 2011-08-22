$('.thumb').parent().hover(
    function () {
      var img = $(this).find('img').attr('src');
      $(this).find('img').attr('src', img.replace( '_off', '' ));
    },
    function () {
      var img = $(this).find('img').attr('src');
      $(this).find('img').attr('src', img.replace( 'thumb', 'thumb_off' ));
});

