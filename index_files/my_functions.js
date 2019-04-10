// Sammlung eigene JS-Funktionen

var slider;
	
jQuery.noConflict();

//jQuery(document).ready(function($){
jQuery(function($){
	
	/* Lightbox konfigurieren */
	lightbox.option({
		'resizeDuration': 500,
      'albumLabel': "Bild %1 von %2",
      'wrapAround': true
    })
	
	/* Bildergroessenangaben entfernen */
	jQuery('img').each(function(){ 
		jQuery(this).removeAttr('width')
		jQuery(this).removeAttr('height');
	});
	
	
	/* Achtung beim Einbinden, wenn keine entsprechende Klasse auf der Seite vorhanden ist! */
	/* Newsslider */
	if(jQuery('.bxslider').length) {
		if (jQuery('#mainmenue ul li').css('display') == 'inline-block' ) {
			slider = jQuery('.bxslider').bxSlider({
				auto: true,
				pause: 12000,
				autoControls: true
			});
		}
	}
  
  
	/* Tabnavigation */
	if(jQuery('#tab-container').length) {
		jQuery('#tab-container').easytabs({
			animate:false
		});
	}


	/* Megamenue */
	function addMega(){
		jQuery(this).addClass("hovering");
	}
	
	function removeMega(){
		jQuery(this).removeClass("hovering");
	}
	
	var megaConfig = {
		interval: 250,
		sensitivity: 4,
		over: addMega,
		timeout: 500,
		out: removeMega
	};
	
	if(jQuery('li.mega').length) {
		jQuery('li.mega').hoverIntent(megaConfig);
	}


	/* Slidefunktion */
	jQuery('.slidecontent').hide(); // zuerst alle verstecken

	/*jQuery('.slidecontent').printElement(function() {
		jQuery(this).show();
	}); */
	
    jQuery('.slideclick').click(function() { 
		jQuery(this).next('.slidecontent').slideToggle('slow');
        jQuery(this).children('.slidecontent').slideToggle('slow'); // hier ergänzt
		jQuery(this).toggleClass('closed open');
		//var buttontext = jQuery(this).hasClass('closed') ? 'mehr Infos anzeigen' : 'weniger Infos anzeigen'; // hier ergänzt
		if (jQuery(this).hasClass('closed')) {
			myid = jQuery(this).parents('.resultrow').attr('id');
			//alert(myid);
			if (typeof myid !== typeof undefined && myid !== false) {
				//window.location= '#' + myid;
				jQuery('html, body').animate({ scrollTop: (jQuery('#'+myid).offset().top)}, 'slow');
			}
			buttontext = 'mehr Infos anzeigen';
			buttontext2 = 'mehr Optionen »';
		}
		else {
			buttontext = 'weniger Infos anzeigen';
			buttontext2 = '« weniger Optionen';
		} // bis hier
		jQuery(this).children('.detailinfo').text(buttontext);
		jQuery(this).children('.showmoreoptions').text(buttontext2);
	});

    jQuery('.slideclick2 .showmoreoptions').click(function() {         
		jQuery(this).next('.slidecontent').slideToggle('slow');
		jQuery(this).parent('.slideclick2').toggleClass('closed open');
		var buttontext = jQuery(this).parent('.slideclick2').hasClass('closed') ? 'mehr Optionen »' : '« weniger Optionen'; 
		jQuery(this).text(buttontext);
	});

	/* Mit checkboxen */
	jQuery('.slidecheck').each(function() {
		if (jQuery(this).prop('checked')) {
			jQuery(this).parent('.checkslide').children('.slidecontent').slideDown('slow');	
		}
	});
	
	jQuery('.checkslide').click(function() {
		// alle anderen schließen 
		jQuery('.slidecheck').each(function() {
			if (!(jQuery(this).prop('checked'))) {
				jQuery(this).parent('.checkslide').children('.slidecontent').slideUp('slow');	
			}
		});
		// ausgewählte öffnen
		if (jQuery(this).children('.slidecheck').prop('checked')) {
			jQuery(this).children('.slidecontent').slideDown('slow');
		}
	});


	/* Mobile Anzeige ein / aus */
	if (jQuery('.mobileslideclick').css('display') == 'block') {
		jQuery('.mobileslidecontent').hide();
		if (jQuery('.mobileslideclick').hasClass('open')) {
			jQuery('.mobileslideclick').toggleClass('closed open');
		}
	}
    jQuery('.mobileslideclick').click(function() {         
		jQuery(this).next('.mobileslidecontent').slideToggle('slow');
		jQuery(this).toggleClass('closed open');
	});



	/* Tooltip */
	jQuery('.tooltip[data-tooltip]').click(function() {
		if (jQuery(this).children('.tooltipinfotext').length > 0) {
			jQuery(this).children('.tooltipinfotext').remove();
		}
		else {
			var infotext = jQuery(this).attr('data-tooltip');
			jQuery(this).append('<span class="tooltipinfotext">' + infotext + '</span>');
		}
	});
	
	jQuery('.tooltip').click(function() {
		jQuery(this).children('.tooltipcontent').toggleClass('hidden visible');
	});
	
	
	/* Glossar in Tooltip umwandeln */
	jQuery('.tx-glossary *').hover(function() {
		var tooltip = jQuery(this).attr('title');
		jQuery(this).removeAttr('title');
		jQuery(this).attr('data-tooltip', tooltip);
		jQuery(this).addClass('tooltip');
	});

	jQuery('dfn').hover(function() {
		var tooltip = jQuery(this).attr('title');
		jQuery(this).removeAttr('title');
		jQuery(this).attr('data-tooltip', tooltip);
		jQuery(this).addClass('tooltip');
	});

	jQuery('acronym').hover(function() {
		var tooltip = jQuery(this).attr('title');
		jQuery(this).removeAttr('title');
		jQuery(this).attr('data-tooltip', tooltip);
		jQuery(this).addClass('tooltip');
	});

	jQuery('abbr').hover(function() {
		var tooltip = jQuery(this).attr('title');
		jQuery(this).removeAttr('title');
		jQuery(this).attr('data-tooltip', tooltip);
		jQuery(this).addClass('tooltip');
	});


	/* Auf Slidebox verlinken und öffnen */
	/*function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		} 
	}

	var id_detail = getQueryVariable('id_detail');
	if (id_detail != '') {
		jQuery('#c'+id_detail+' .slideclick').toggleClass('closed open');
		jQuery('#c'+id_detail+' .slideclick').next('.slidecontent').slideToggle('slow');
		jQuery('#f'+id_detail+' .slideclick').toggleClass('closed open');
		jQuery('#f'+id_detail+' .slideclick').next('.slidecontent').slideToggle('slow');
		jQuery('html, body').animate({ scrollTop: (jQuery('#c'+id_detail).offset().top)}, 'slow');
		jQuery('html, body').animate({ scrollTop: (jQuery('#f'+id_detail).offset().top)}, 'slow');
	}*/
	
    jQuery('.ankerlink').click(function(event) { 
		event.preventDefault(); 
		var linkto = jQuery(this).attr('href'); 
		var str = linkto.split('#'); // Teil vor Anker
		if (location.href.search(str[0]) < 0) {
			// andere Seite
			//alert('neue seite');
			document.location = linkto; 
		}
		else {
			// gleiche Seite
			//alert('gleiche seite' + str[1]);
			if (jQuery('#'+str[1]+' .slideclick').hasClass('closed')) {
				jQuery('#'+str[1]+' .slideclick').toggleClass('closed open');
				jQuery('#'+str[1]+' .slideclick').next('.slidecontent').slideToggle('slow');
			}
			jQuery('html, body').animate({ scrollTop: (jQuery('#'+str[1]).offset().top)}, 'slow');
		}
	});
	
	
	var id_detail = '#' + location.href.split('#')[1];
	if ((id_detail != '') && (id_detail != '#undefined')) {
		//alert('geladen' + id_detail);
		if (jQuery(id_detail).parent().hasClass('slidecontent')) {
			// id ist innerhalb von slidecontent
			jQuery(id_detail).parent('.slidecontent').slideToggle('slow');
			jQuery('html, body').animate({ scrollTop: (jQuery(id_detail).parent('.slidecontent').offset().top)}, 'slow');
		}
		else {
			// id von Gridelement
			jQuery(id_detail+' .slideclick').toggleClass('closed open');
			jQuery(id_detail+' .slideclick').next('.slidecontent').slideToggle('slow');
			jQuery('html, body').animate({ scrollTop: (jQuery(id_detail).offset().top)}, 'slow');
		}
	}
	
	
	// Elemente zum Druck einblenden, danach wieder aus ...
	(function() {
		var beforePrint = function() {
			//alert('Functionality to run before printing.');
			jQuery('.slidecontent').show(); // zum Druck anzeigen
		};
		var afterPrint = function() {
			//alert('Functionality to run after printing');
			jQuery('.slidecontent').hide(); // alle wieder verstecken
		};
	
		if (window.matchMedia) {
			var mediaQueryList = window.matchMedia('print');
			mediaQueryList.addListener(function(mql) {
				if (mql.matches) {
					beforePrint();
				} else {
					afterPrint();
				}
			});
		}
	
		window.onbeforeprint = beforePrint;
		window.onafterprint = afterPrint;
	}());
	
	
});

jQuery(window).bind('orientationchange resize', function(event){

	if (jQuery('#mainmenue ul li').css('display') == 'block' ) {
		slider.destroySlider();
		jQuery('.thema').removeAttr('style');
		jQuery('.bxslider').removeAttr('style');
	}

	if (jQuery('#mainmenue ul li').css('display') == 'inline-block' ) {
		if(typeof slider != "undefined") {
			slider.reloadSlider();
		}
		else {
			slider = jQuery('.bxslider').bxSlider();
		}
	}	
	
	if (jQuery('.mobileslideclick').css('display') == 'block') {
		jQuery('.mobileslidecontent').hide();
	}
	if (jQuery('.mobileslideclick').css('display') == 'none') {
		jQuery('.mobileslidecontent').show();
	}
});




