
$(document).ready(function() {
  // console.log('ready');
  var $i = $('#inspector');
  var options = {
    content: function() {
      var width = $(this).width(),
          height = $(this).height();
      return `${width} x ${height}`;
    },
    title: function() {
      return $(this).data('tagName');
    },
    placement: 'top',
    selector: $i.selector,
    template: '<div class="popover" role="tooltip">' +
                '<div class="arrow"></div>' +
                '<h3 class="popover-title"></h3>' +
                '<div class="popover-content"></div>' +
                '<div class="popover-actions">' +
                  '<button class="btn btn-default pull-right" type="submit">' +
                    '<i class="fa fa-camera"></i>' +
                  '</button>' +
                '</div>' +
              '</div>',
    trigger: 'manual'
  };
  $i.popover(options);

  function mouseover(target) {
    var $target = $(target);
    $i.data('tagName', $target.context.tagName);
    $i.height($target.height()).width($target.width()).offset($target.offset());
    $i.popover('show');
  }

  $i.on('click', function(e) {
    $i.toggleClass('locked');
  });

  $(document).on('mouseover', function(e) {
    if ($i.hasClass('locked')) {
      return;
    }
    var elements = $(':hover');
    for (let i = (elements.length - 1); i >= 0; i -= 1) {
      // ignore the inspector and higher elements
      if (elements[i].id === $i.attr('id') ||
          elements[i].tagName === "BODY" ||
          elements[i].tagName === "HTML") {
              continue;
      } else {
        return mouseover(elements[i]);
      }
    }
  });
});
