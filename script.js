function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

//function getURLParameter(name) {
      //return decodeURIComponent(
         // (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1] || ''
     // );
 // }

//var email = getURLParameter('email');
//var name = getURLParameter('name');

function getRandomInt2(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


$( document ).ready(function() {
	//$("a").each(function(){
	//    if($(this).attr('href').indexOf("monetizze") >= 0 && email != "")
	    // $(this).attr('href', $(this).attr('href')+"?nome="+b64DecodeUnicode(name)+"&email="+b64DecodeUnicode(email));
	//});

  if(!localStorage.getItem('_bannershow_')){
      localStorage.setItem('_bannershow_', true);
      setTimeout(function(){ $('#lp-addtocart').fadeIn(); }, 914400); //tempo para mostrar o botao de comprar é de 2,5 minutos convertidos de: seg x min

    }else {
       $('#lp-addtocart').fadeIn();
    }

  $("#top-people").html(getRandomInt2(2,8));
  var ipapi = $.ajax({
        url: "https://ipapi.co/json",
        success: function(result) {
            $("#top-city").html(result.city);
        },
        error: function(result) {
            $("#top-blackband").hide();
            console.error(result);
        }
    });

  document.querySelector("#num-persons").innerHTML = "" + getRandomInt2(27000,27120); //  Gera a contagem

  setInterval(function(){
    var curr = parseInt(document.querySelector("#num-persons").innerHTML);
    curr +=1 ;
    document.querySelector("#num-persons").innerHTML = ""+curr;
  }, 1111);


	//setTimeout(function(){ $("#float-btn").show(); }, 914400);
});

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}
function addClickEvent(element, name, callback) {
  if (typeof element[name].onclick != "function") {
    element[name].onclick = callback;
  }
}
var PreventExitSplash = false;
function DisplayExitSplash() {
  if (PreventExitSplash == false) {
    PreventExitSplash=true;
    setTimeout(function () {
        window.location.assign(exitPage);
    }, 300);
    return exitMessage;
  }
}
var a = document.getElementsByTagName("A");
var i = 0;
for (; i < a.length; i++) {
  if (a[i].target !== "_blank") {
    addClickEvent(a, i, function() {
      PreventExitSplash = true;
    });
  } else {
    addClickEvent(a, i, function() {
      PreventExitSplash = false;
    });
  }
}
disablelinksfunc = function() {
  var a = document.getElementsByTagName("A");
  var i = 0;
  for (; i < a.length; i++) {
    if (a[i].target !== "_blank") {
      addClickEvent(a, i, function() {
        PreventExitSplash = true;
      });
    } else {
      addClickEvent(a, i, function() {
        PreventExitSplash = false;
      });
    }
  }
};

addLoadEvent(disablelinksfunc);
disableformsfunc = function() {
  var elements = document.getElementsByTagName("FORM");
  var i = 0;
  for (; i < elements.length; i++) {
    if (!elements[i].onclick) {
      elements[i].onclick = function() {
        PreventExitSplash = true;
      };
    } else {
      if (!elements[i].onsubmit) {
        elements[i].onsubmit = function() {
          PreventExitSplash = true;
        };
      }
    }
  }
};
addLoadEvent(disableformsfunc);
setTimeout(function(){
	window.onbeforeunload = DisplayExitSplash;
},5000);

if(videoID != false)
{
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    var youtube = true;
    var wistia_loaded = false;
    var done = false;
}
// Para maiores informações leia e pesquise no google sobre API YouTube
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	height: '360', // Altura do video em pixel
	width: '640', // Largura do video em pixel
	videoId: videoID, // Pega ID do Video e menciona
	playerVars: {
		'autoplay': 0, // O play não roda automaticamente
		'controls':0, // Funções desabilidatas, redirect para o you tube
		'playsinline':1, //
		'modestbranding': 1,
		'fs':0,
		'rel': 0,
		'showinfo':0, // informações
		},
	events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
		$(".video-overlay").hide();
		event.target.playVideo();
}
function onPlayerStateChange(event) {
		if (event.data == 1) {
										}
		if (event.data==YT.PlayerState.PAUSED){
			$(".video-overlay").show();
		}
		if(event.data==-1 || event.data==2){
			$(".video-overlay").show();
		} else {
			$(".video-overlay").hide();
		}
}
var pauseOnce = function(){
	 pauseOnce = function(){};
	 player.pauseVideo();
	 player.seekTo(0);
	 player.unMute();
};
$(".video-overlay").click(function(){
	player.playVideo();
	$(".video-overlay").hide();
});
$(".video-cover").click(function(){
	player.pauseVideo();
	$(".video-overlay").show();
});
