// Include jrails
/**
 * Unobtrusive scripting adapter for jQuery
 *
 * Requires jQuery 1.4.3 or later.
 * https://github.com/rails/jquery-ujs
 */
(function($) {  
  // Triggers an event on an element and returns the event result
  function fire(obj, name, data) {
    var event = new $.Event(name);
    obj.trigger(event, data);
    return event.result !== false;
  }

  // Submits "remote" forms and links with ajax
  function handleRemote(element) {
    var method, url, data,
      dataType = element.attr('data-type') || ($.ajaxSettings && $.ajaxSettings.dataType);

    if (element.is('form')) {
      method = element.attr('method');
      url = element.attr('action');
      data = element.serializeArray();
      // memoized value from clicked submit button
      var button = element.data('ujs:submit-button');
      if (button) data.push(button);
    } else {
      method = element.attr('data-method');
      url = element.attr('href');
      data = null;
    }

    $.ajax({
      url: url, type: method || 'GET', data: data, dataType: dataType,
      // stopping the "ajax:beforeSend" event will cancel the ajax request
      beforeSend: function(xhr, settings) {
        if (settings.dataType === undefined) {
          xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
        }
        return fire(element, 'ajax:beforeSend', [xhr, settings]);
      },
      success: function(data, status, xhr) {
        element.trigger('ajax:success', [data, status, xhr]);
      },
      complete: function(xhr, status) {
        element.trigger('ajax:complete', [xhr, status]);
      },
      error: function(xhr, status, error) {
        element.trigger('ajax:error', [xhr, status, error]);
      }
    });
  }

  // Handles "data-method" on links such as:
  // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
  function handleMethod(link) {
    var href = link.attr('href'),
      method = link.attr('data-method'),
      csrf_token = $('meta[name=csrf-token]').attr('content'),
      csrf_param = $('meta[name=csrf-param]').attr('content'),
      form = $('<form method="post" action="' + href + '"></form>'),
      metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

    if (csrf_param !== undefined && csrf_token !== undefined) {
      metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
    }

    form.hide().append(metadata_input).appendTo('body');
    form.submit();
  }

  function disableFormElements(form) {
    form.find('input[data-disable-with]').each(function() {
      var input = $(this);
      input.data('ujs:enable-with', input.val())
        .val(input.attr('data-disable-with'))
        .attr('disabled', 'disabled');
    });
  }

  function enableFormElements(form) {
    form.find('input[data-disable-with]').each(function() {
      var input = $(this);
      input.val(input.data('ujs:enable-with')).removeAttr('disabled');
    });
  }

  function allowAction(element) {
    var message = element.attr('data-confirm');
    return !message || (fire(element, 'confirm') && confirm(message));
  }

  $('a[data-confirm], a[data-method], a[data-remote]').live('click.rails', function(e) {
    var link = $(this);
    if (!allowAction(link)) return false;

    if (link.attr('data-remote')) {
      handleRemote(link);
      return false;
    } else if (link.attr('data-method')) {
      handleMethod(link);
      return false;
    }
  });

  $('form').live('submit.rails', function(e) {
    var form = $(this);
    if (!allowAction(form)) return false;

    if (form.attr('data-remote')) {
      handleRemote(form);
      return false;
    } else {
      disableFormElements(form);
    }
  });

  $('form input[type=submit], form button[type=submit], form button:not([type])').live('click.rails', function() {
    var button = $(this);
    if (!allowAction(button)) return false;
    // register the pressed submit button
    var name = button.attr('name'), data = name ? {name:name, value:button.val()} : null;
    button.closest('form').data('ujs:submit-button', data);
  });
  
  $('form').live('ajax:beforeSend.rails', function(event) {
    if (this == event.target) disableFormElements($(this));
  });

  $('form').live('ajax:complete.rails', function(event) {
    if (this == event.target) enableFormElements($(this));
  });


})( jQuery );


// **************************************
/// APPLICATION JAVASCRIPT BEGINS
// **************************************


function sizeUp(){
  var dA = navigator.userAgent.toLowerCase();
  var m = dA.match(/(iphone|ipod|ipad|android|mobile)/);
  var winwidth = $(window).width();
  var winheight = $(window).height();
  // Make the page scroll if the viewport is too small
  if(!m){
    if(winwidth > 775){
      $("header#simple").addClass('bigsite');
      $("aside#network_blog").addClass('bigsite');
    }else{
      $("header#simple").removeClass('bigsite');
      $("aside#network_blog").addClass('bigsite');
    }
  }
}

function startup() {
  $('div.identify').addClass('die');
  $('aside#network_blog').removeClass('start');

  setTimeout("$('#logo_blog').addClass('start');", 500);
}

$(document).ready(function() {  

  setTimeout("startup();", 2000);


  var resizeTimer;
  var hideMenu;

  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token',$('meta[name="csrf-token"]').attr('content'));
    }
  });

  //perform layout tasks
  sizeUp(); // do once on load
  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout("sizeUp();", 100);
  });

  // perform tasks related to the magic bar menu. allow the mouse to leave and then come back to the menu without it disappearing; see mac os menu bar behavior
  $("#service_hook").mouseenter(function () {
    clearTimeout(hideMenu);
    $('#magic_bar').show();
    }).mouseleave(function () {
      hideMenu = setTimeout("$('#magic_bar').hide();", 300);
    }
  );

  $("#magic_bar").mouseenter(function () {
    clearTimeout(hideMenu);
    $('#magic_bar').show();
    }).mouseleave(function () {
      hideMenu = setTimeout("$('#magic_bar').hide();", 300);
    }
  );

  // the magic
  function addKudos(extid){   
    $.post("/kudos", { external_id: extid } );
  }

  $("figure.hover_select").click(function(e){
    e.preventDefault();
    return false;
  });

  // The hover selector is the best thing ever.
  var t;
  var x;
  $("figure.hover_select").mouseenter(
    function () {
      clearTimeout(t); //Cancel and restart.
      desc = $(this).find('p.identifier').html();
      kkcount = $(this).find('p.kcount').html();
      $(this).find('p.identifier').hide();

      if(!$(this).hasClass('done')){
        $(this).find('p.kcount').html('Don\'t move...').addClass('active');
      }
      var endState = $.proxy(function(){
        $(this).find('div.filled').hide();
        $(this).find('p.kcount').html('Sent!');
        var extid = $(this).find('span.extid').html();
        if(!$(this).hasClass('sent')){
          addKudos(extid);
          $(this).addClass('sent');
        }
        $(this).addClass('done');
      },$(this));
    t=setTimeout(endState, 1000); //run the animation for exactly one second, then fire the action
  }).mouseleave(function(){
    clearTimeout(t); //cancel when the mouse falls away
    if(!$(this).hasClass('done')){
      $(this).find('p.kcount').html(kkcount).removeClass('active').show();
      $(this).find('p.identifier').html(desc).show(); // and return the description
    }
  });
});


// KUDOS UPDATE LIVE! ********************************
  function inView(el) {
      var rect = el.getBoundingClientRect()
      return(rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth )
  };

  function partInView(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  function pullKudos(hs, pm, extid) {
    /*$.get("/"+pm+"/kudos", { external_id: extid }, function(cnt){
      var current; 
      if( current = hs.find('p.kcount').html() ){
        current = current.replace(/[^\d\.\-\ ]/g, '');
      }
      var c = String(cnt).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      if (cnt > current){
        hs.find('p.kcount').html(c);
        hs.addClass('updated');

        var endAnim = $.proxy(function(){
          hs.removeClass('updated');
        },hs);
        setTimeout(endAnim, 2000);
      }
    }); */
  }

/*
  $(window).scroll(function(){
    $("ul.posts li.post").each(function (i) {
      var lx = $(this);
      if(partInView(this)){
        lx.find('figure').css('top', 'fixed');
      }else{
        lx.find('figure').css('position', 'absolute');
      }
    });
  })
  */


  setInterval(function(){
    $("ul.posts li figure.hover_select").each(function (i) {
      if(inView(this)){
        $("ul.posts li figure.hover_select").removeClass('animate');
        var hs = $(this);
        hs.addClass('animate');
        pm = hs.find('.permalink').html();
        extid = hs.find('.extid').html();
        pullKudos(hs, pm, extid);
      }
    });
  },30000); // 7 seconds

  setInterval(function(){
    $("ul.posts li figure.hover_select").each(function (i) {
      if(inView(this)){
        $(this).addClass('animate');
      }else{
        $(this).removeClass('animate');
      }
    });
  },2000); // 5000ms == 5 seconds  