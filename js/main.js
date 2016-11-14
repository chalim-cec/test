//number of objects as a global var here
var menuItemCount = 42;

$(document).ready(function() {
  gameSize();

});

$(window).on("load", function() {

  var menu_rotation = 0;

  //loading images

  $("#delete_btn").click(function(event) {
    console.log("hello?");
    for (i=0; i < menuItemCount; i++){
      console.log(i);
      var img = $('<img class = "menu_object">');
      var src='img/test/img'+i+'_0.svg';
      img.attr('src', src);
      //var menugroup = floor(i/14);
      img.appendTo('#everything'); //put menugroup here
    }
  });

  /*
  var src = event.target.getAttribute('src');
  var img =  $('<img class="draggable game_object">');
  img.attr('src', src);
  img.appendTo('#game_objects');
*/

  //end

  $("#menu_next").click(function(event) {
      event.preventDefault();
      menu_next();
  });

  $("#menu_back").click(function(event) {
      event.preventDefault();
      menu_back();
  });


  $("#menu_prev").click(function(event) {
      event.preventDefault();
  });

  //save screenshot
  $("#save_btn").click(function() { 
    var node = document.getElementById("playarea_container");
    domtoimage.toBlob(node).then(function (blob) {
        window.saveAs(blob, 'office-screenshot.png');
    });
  });

  //deletes all items
  $("#restart_btn").click(function() { 
    $(".game_object").remove();
  });

  //rotates items in menu
  $("#rotate_btn").click(function() { 
    menu_rotation = (menu_rotation+1)%4;
    var menuList =  document.getElementsByClassName("menu_object"); 
    $.each(menuList, function(i, menu_obj) {
      src = menu_obj.getAttribute('src');
      var regexp = /([a-zA-Z0-9\-]*\_)(\d)\.svg$/;
      var match = regexp.exec(src);
      var imageName = (match[1]);   //before underscore  
      menu_obj.setAttribute('src', 'img/'+imageName+menu_rotation+'.svg');              
    });
  });

  //click menu object
  $(".menu_object").click(function(event) {
      var src = event.target.getAttribute('src');
      var img =  $('<img class="draggable game_object">');
      img.attr('src', src);
      img.appendTo('#game_objects');
  });  

});   //onload

$( window ).resize(function() {
  gameSize();
});

//next button on menu
function menu_next() {
  var current_menu = $(".menu-active")
  if (current_menu.next(".menu").length){
    current_menu.next("div").addClass("menu-active");
    console.log("ye");
    console.log(current_menu.next(".menu"));
  } else { 
    current_menu.parent().children(".menu").first().addClass("menu-active");
    console.log("na");
  }
  current_menu.removeClass("menu-active");
}

//back button on menu
function menu_back() {
  var current_menu = $(".menu-active")
  if (current_menu.prev(".menu").length){
    current_menu.prev("div").addClass("menu-active");
    console.log("ye");
    console.log(current_menu.prev(".menu"));
  } else { 
    current_menu.parent().children(".menu").last().addClass("menu-active");
    console.log("na");
  }
  current_menu.removeClass("menu-active");
}


function gameSize() {
  if (matchMedia('all and (orientation:portrait)').matches){
    /*menu sits horizontally, to be below office*/
    $("#playarea_container").removeClass("col-xs-10");
    $("#playarea_container").addClass("col-xs-12");
    $("#menu_container").removeClass("col-xs-2");
    $("#menu_container").addClass("col-xs-12");
    
    /*move rotate button to left, menu nav to right*/
    $("#rotate_container").addClass("col-xs-1 vert-center_container");
    $("#rotate_btn").addClass("vert-center");
    $("#menu_nav_container").addClass("col-xs-1 vert-center_container");
    $("#menu_nav").addClass("vert-center");
    $(".menu").addClass("col-xs-10");
    $(".menu").addClass("vert-center");

  } else { 
    /*menu sits vertically, to left of office*/
    $("#playarea_container").addClass("col-xs-10");
    $("#playarea_container").removeClass("col-xs-12");
    $("#menu_container").addClass("col-xs-2");
    $("#menu_container").removeClass("col-xs-12");

    /*rotate button at top, menu nav at bottom*/
    $("#rotate_container").removeClass("col-xs-1 vert-center_container");
    $("#rotate_btn").removeClass("vert-center");
    $("#menu_nav_container").removeClass("col-xs-1 vert-center_container");
    $("#menu_nav").removeClass("vert-center");
    $(".menu").removeClass("col-xs-10");
    $(".menu").removeClass("vert-center");
  }
}

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');
    }
});

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);

  //deleting item 
  $(target).on('touchend mouseup', function(e){
    if($(target).overlaps('#delete_btn').length){
      $(target).remove();
    }
  });

}
