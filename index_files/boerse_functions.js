// Functions fuer Boersen
jQuery.noConflict();

jQuery(document).ready(function(jQuery){
	
	// BEGIN Button click handler
	
	// PDF-Download-Button
	jQuery('.kv-button-pdf_download').on('click', function(e){
        e.preventDefault();
        pdfdownload();
    });
    
    // Google-Maps-Button
	jQuery('.kv-button-google_maps').on('click', function(e){
        e.preventDefault();
        showGoogleMaps();
    });
    
    jQuery("#map_all_landkreise_praxenboerse").on( "click", function(e) {
		e.preventDefault();
		if(jQuery('#all_landkreis_checked').val() == 1)
		{
			// es sind bereits alle landkreise aktiv -> deaktivieren
			resetPraxenboerseFlashMap();
			jQuery('#all_landkreis_checked').val('0');
		}
		else
		{
			// es ist sind nicht alle landkreise aktiv -> aktivieren
			setAllPraxenboerseFlashMap();
			jQuery('#all_landkreis_checked').val('1');
		}
		/*
    	//alert(jQuery(this).is(":checked"));
    	if(jQuery(this).is(":checked"))
    	{
    		setAllPraxenboerseFlashMap();
    	}
    	else
    	{
    		//deleteAllPraxenboerseInputLandkreise();
    		//resetPraxenboerseFlashMap();
    	}
    	*/
    });
    
    jQuery("#map_all_landkreise_jobboerse").on( "click", function(e) {
		e.preventDefault();
		if(jQuery('#all_landkreis_checked').val() == 1)
		{
			// es sind bereits alle landkreise aktiv -> deaktivieren
			resetJobboerseFlashMap();
			jQuery('#all_landkreis_checked').val('0');
		}
		else
		{
			// es ist sind nicht alle landkreise aktiv -> aktivieren
			setAllJobboerseFlashMap();
			jQuery('#all_landkreis_checked').val('1');
		}
    });
    
    jQuery("#map_all_landkreise_famulatur").on( "click", function(e) {
		e.preventDefault();
		if(jQuery('#all_landkreis_checked').val() == 1)
		{
			// es sind bereits alle landkreise aktiv -> deaktivieren
			resetFamulaturFlashMap();
			jQuery('#all_landkreis_checked').val('0');
		}
		else
		{
			// es ist sind nicht alle landkreise aktiv -> aktivieren
			setAllFamulaturFlashMap();
			jQuery('#all_landkreis_checked').val('1');
		}
    });
    
    // Chiffre-Daten anfordern Button
	jQuery('.kv-button_datenanfordern').on('click', function(e){
        e.preventDefault();
        datenanfordern();
    });
    
    // END Button click handler
    
    // find out if a checkbox is checked
	var n = jQuery("input[name=print]:checked").length;
	//alert(n);
	if(n > 0) {
		jQuery(".kv-button-pdf_download").attr("title", "Ergebnisse als PDF drucken");
		jQuery(".kv-button-google_maps").attr("title", "Ergebnisse in Karte anzeigen");
		jQuery(".kv-button_datenanfordern").attr("title", "Ergebnisse in Karte anzeigen");
	}
	else{ 
		jQuery(".kv-button-pdf_download").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
		jQuery(".kv-button-google_maps").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
		jQuery(".kv-button_datenanfordern").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	}
    
    // BEGIN check listener fuer checkbox checkAllPDF
    jQuery('.checkAllPDF').click(function(event) {  //on click
        if(this.checked) { // check select status
            jQuery('.c_print').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1" 
                jQuery(this).attr('checked', true);
                jQuery(this).parent().parent().parent().addClass('selected');
            });
            
            // BEGIN aktivieren der Buttons
            jQuery('.kv-button-pdf_download').attr('disabled', false);
            jQuery('.kv-button-pdf_download').removeClass('inaktiv');

            jQuery('.kv-button-google_maps').attr('disabled', false);
            jQuery('.kv-button-google_maps').removeClass('inaktiv');
            // END aktivieren der Buttons
            
            // BEGIN title setzen
            jQuery(".kv-button-pdf_download").attr("title", "Ergebnisse als PDF drucken");
            jQuery(".kv-button-google_maps").attr("title", "Ergebnisse in Karte anzeigen");
            // END title setzen
            
        }else{
            jQuery('.c_print').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"
                jQuery(this).attr('checked', false);  
                jQuery(this).parent().parent().parent().removeClass('selected');   
            });
            
            var count = jQuery(".c_print:checked").length;
             if(count < 1)
             {
             	// BEGIN deaktivieren der Buttons
             	jQuery('.kv-button-pdf_download').attr('disabled', true);
             	jQuery('.kv-button-pdf_download').addClass('inaktiv');

             	jQuery('.kv-button-google_maps').attr('disabled', true);
             	jQuery('.kv-button-google_maps').addClass('inaktiv');
             	// END deaktivieren der Buttons
             	
             	// BEGIN title setzen
	            jQuery(".kv-button-pdf_download").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	            jQuery(".kv-button-google_maps").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	            // END title setzen
             }        
        }
    });
	// END check listener fuer checkbox checkAll
	
	// BEGIN check listener fuer checkbox checkAll (Chiffre)
    jQuery('.checkAll').click(function(event) {  //on click
        if(this.checked) { // check select status
            jQuery('.c_chiffre').each(function() { //loop through each checkbox
                 this.checked = true;  //select all checkboxes with class "checkbox1" 
                jQuery(this).attr('checked', true);
                jQuery(this).parent().parent().parent().addClass('selected');
            });
            
             // BEGIN aktivieren der Buttons
            jQuery('.kv-button_datenanfordern').attr('disabled', false);
            jQuery('.kv-button_datenanfordern').removeClass('inaktiv');
            // END aktivieren der Buttons
            
            // BEGIN title setzen
            jQuery(".kv-button_datenanfordern").attr("title", "Zu ausgewählten Chiffreanzeigen Kontakt aufnehmen");
            // END title setzen
            
        }else{
            jQuery('.c_chiffre').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"
                jQuery(this).attr('checked', false);  
                jQuery(this).parent().parent().parent().removeClass('selected');             
            }); 
            
            var count = jQuery(".c_chiffre:checked").length;
             if(count < 1)
             {
             	// BEGIN deaktivieren der Buttons
             	jQuery('.kv-button_datenanfordern').attr('disabled', true);
             	jQuery('.kv-button_datenanfordern').addClass('inaktiv');
             	// END deaktivieren der Buttons
             	
             	// BEGIN title setzen
	            jQuery(".kv-button_datenanfordern").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	            // END title setzen
	            
             }        
        }
    });
	// END check listener fuer checkbox checkAll (Chiffre)
	
	// BEGIN listener fuer checkboxen .c_chiffre und .c_print
	jQuery('.c_print').click(function(event) {  //on click
        if(this.checked) { // check select status
            this.checked = true;  //select all checkboxes with class "checkbox1" 
            jQuery(this).attr('checked', true);
            jQuery(this).parent().parent().parent().addClass('selected');
            
            // BEGIN aktivieren der Buttons
            jQuery('.kv-button-pdf_download').attr('disabled', false);
            jQuery('.kv-button-pdf_download').removeClass('inaktiv');

            jQuery('.kv-button-google_maps').attr('disabled', false);
            jQuery('.kv-button-google_maps').removeClass('inaktiv');
            // END aktivieren der Buttons
            
            // BEGIN title setzen
            jQuery(".kv-button-pdf_download").attr("title", "Ergebnisse als PDF drucken");
            jQuery(".kv-button-google_maps").attr("title", "Ergebnisse in Karte anzeigen");
            // END title setzen
            
        }else{
            this.checked = false; //deselect all checkboxes with class "checkbox1"
            jQuery(this).attr('checked', false);  
            jQuery(this).parent().parent().parent().removeClass('selected');
            
            // Falls es keine Checkbox mehr gibt, die aktiv ist -> Buttons deaktivieren
            var count = jQuery(".c_print:checked").length;
            if(count < 1)
            {
            	 // BEGIN deaktivieren der Buttons
            	jQuery('.kv-button-pdf_download').attr('disabled', true);
            	jQuery('.kv-button-pdf_download').addClass('inaktiv');
	
	            jQuery('.kv-button-google_maps').attr('disabled', true);
	            jQuery('.kv-button-google_maps').addClass('inaktiv');
	            // END deaktivieren der Buttons	
	            
	            // BEGIN title setzen
	            jQuery(".kv-button-pdf_download").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	            jQuery(".kv-button-google_maps").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	            // END title setzen
            }
        }
    });
    
    jQuery('.c_chiffre').click(function(event) {  //on click
        if(this.checked) { // check select status
            this.checked = true;  //select all checkboxes with class "checkbox1" 
            jQuery(this).attr('checked', true);
            jQuery(this).parent().parent().parent().addClass('selected');
            
             // BEGIN aktivieren der Buttons
            jQuery('.kv-button_datenanfordern').attr('disabled', false);
            jQuery('.kv-button_datenanfordern').removeClass('inaktiv');
            // END aktivieren der Buttons
            
            // BEGIN title setzen
            jQuery(".kv-button_datenanfordern").attr("title", "Zu ausgewählten Chiffreanzeigen Kontakt aufnehmen");
            // END title setzen
            
        }else{
            this.checked = false; //deselect all checkboxes with class "checkbox1"
            jQuery(this).attr('checked', false);  
            jQuery(this).parent().parent().parent().removeClass('selected');
            
            var count = jQuery(".c_chiffre:checked").length;
             if(count < 1)
             {
             	// BEGIN deaktivieren der Buttons
             	jQuery('.kv-button_datenanfordern').attr('disabled', true);
             	jQuery('.kv-button_datenanfordern').addClass('inaktiv');
             	// END deaktivieren der Buttons
             	
             	// BEGIN title setzen
	            jQuery(".kv-button_datenanfordern").attr("title", "Bitte treffen Sie zunächst eine Auswahl");
	            // END title setzen
             }  
             
        }
    });
	// END listener fuer checkboxen .c_chiffre und .c_print
	
	// BEGIN listener und fuer dateiupload (inserieren)
	
	// beide uploads ausblenden und auf disabled setzen
	var selected1 = jQuery('#direktupload_click').is(':checked');
	if(selected1 == false)
	{
		jQuery('#direktupload input').attr('disabled', true);
		jQuery('#direktupload').css('display', 'none');
	}
	
	var selected2 = jQuery('#direktupload_click2').is(':checked');
	if(selected2 == false)
	{
		jQuery('#direktupload2 input').attr('disabled', true);
		jQuery('#direktupload2').css('display', 'none');
	}
	
	jQuery('.radiolist input[type=radio]').click(function(event) {
		var id = jQuery(this).attr('id');
		if(id != 'opt1' && id != 'opt2')
		{
			jQuery('#direktupload input').attr('disabled', true);
			jQuery('#direktupload').css('display', 'none');
			
			jQuery('#direktupload2 input').attr('disabled', true);
			jQuery('#direktupload2').css('display', 'none');
		}
	});
	
	jQuery('#direktupload_click').click(function(event) {
		// den anderen dateiupload ausblenden und disablen
		jQuery('#direktupload2 input').attr('disabled', true);
		jQuery('#direktupload2').css('display', 'none');
		
		// den gewuenschten dateiupload aktivieren und anzeigen
		jQuery('#direktupload input').attr('disabled', false);
		jQuery('#direktupload').css('display', 'block');
	});
	
	jQuery('#direktupload_click2').click(function(event) {
		// den anderen dateiupload ausblenden und disablen
		jQuery('#direktupload input').attr('disabled', true);
		jQuery('#direktupload').css('display', 'none');
		
		// den gewuenschten dateiupload aktivieren und anzeigen
		jQuery('#direktupload2 input').attr('disabled', false);
		jQuery('#direktupload2').css('display', 'block');
	});
	// END listener und fuer dateiupload (inserieren)
	
	// BEGIN disablend und inaktiv setzten von PDF-Download-Button, Maps-Button und PDF-Liste Button
	 var count = jQuery(".c_print:checked").length;
    if(count < 1)
    {
		jQuery('.kv-button-pdf_download').attr('disabled', true);
		jQuery('.kv-button-pdf_download').addClass('inaktiv');
		
		jQuery('.kv-button-google_maps').attr('disabled', true);
		jQuery('.kv-button-google_maps').addClass('inaktiv');
		// END disablend und inaktiv setzten von PDF-Download-Button, Maps-Button und PDF-Liste Button
    }
    
    var count = jQuery(".c_chiffre:checked").length;
    if(count < 1)
    {
    	// BEGIN deaktivieren der Buttons
    	jQuery('.kv-button_datenanfordern').attr('disabled', true);
    	jQuery('.kv-button_datenanfordern').addClass('inaktiv');
    	// END deaktivieren der Buttons
    }
	
    // BEGIN functions
	function pdfdownload()
	{
		var pdfstring = '';
		
		//find all the checked checkboxes
		var z = 0;
		jQuery('.c_print:checked').each(function() {
		    //names.push($(this).attr("name") + this.id);
		    //console.log(jQuery(this).val());
		    if(z == 0)
		    {
		    	pdfstring += jQuery(this).val();
		    }
		    else
		    {
		    	pdfstring += ","+jQuery(this).val();
		    }
		    
		    z++;
		});
		
		if(z > 0) {
			//alert(pdfstring);
			jQuery(".pdfdownload_content").val(pdfstring);
			//alert(jQuery(".pdfdownload_content").val());
			jQuery(".pdf_form").submit();
		}
		
		return true;
	}
	
	
	function showGoogleMaps()
	{
		var result_string = '';		
		
		var z = 0;
		jQuery('.c_print:checked').each(function() {
		    //names.push($(this).attr("name") + this.id);
		    //console.log(jQuery(this).val());
		    if(z == 0)
		    {
		    	result_string += jQuery(this).val();
		    }
		    else
		    {
		    	result_string += ","+jQuery(this).val();
		    }
		    
		    z++;
		});
		
		if(z > 0) {
			//alert(pdfstring);
			jQuery(".googlemaps_content").val(result_string);
			//alert(jQuery(".pdfdownload_content").val());
			jQuery(".googlemaps_form").submit();
		}
		/*
		var n = jQuery("input[name=print]:checked").length;
		var z = 1;
		jQuery("input[name=print]:checked").each(
			function() {
				idList[loopCounter] = jQuery(this).val();
				if (n == z) {
					result_string = result_string + jQuery(this).val();
				}
				else {
					result_string = result_string + jQuery(this).val()+",";
				}
				z++;
				loopCounter += 1;
			}
		);
		
		if (n > 0) {
			jQuery(".googlemaps_content").val(result_string);
			jQuery(".googlemaps_form").submit();
		}
		*/
		return true;
	}
	
	
	function datenanfordern()
	{
		
		
		var result_string = '';		
		
		var z = 0;
		jQuery('.c_chiffre:checked').each(function() {
		    //names.push($(this).attr("name") + this.id);
		    console.log(jQuery(this).val());
		    if(z == 0)
		    {
		    	result_string += jQuery(this).val();
		    }
		    else
		    {
		    	result_string += ","+jQuery(this).val();
		    }
		    
		    z++;
		});
		
		if(z > 0) {
			//alert(pdfstring);
			jQuery(".datenanfordern_content").val(result_string);
			//alert(jQuery(".pdfdownload_content").val());
			jQuery(".chiffre_form").submit();
		}

		return true;
	}
	
	
	function dauerauftrag()
	{
		jQuery("#dauerauftrag_form").submit();
	}
	
	/** BEGIN ASU Schnellsuche **/
	
	// BEGIN name_schnellsuche
	jQuery( "#name_schnellsuche" ).autocomplete({
		 source: function( request, response ) {
		 	jQuery.ajax({
		 		url: "https://api.kvbw-admin.de/schnellsuche/getAutocompleteItems1.json/"+request.term+"/25?api_key=wCPL88Mf0n7cxYAmXdi3shgCgi7TYFotgddpl_ElnLyUJ8fGlxJNP_p5hxYfbmJszXRUXvfjfOcZWsEh_n4PmtUE_SUbdCDNyuHuZXOeK0cGtRXsd0hAtaet27EfKg2h",
		 		success: function( data ) {
		 			console.log(data);
		 			response( data );
		 		}
		 	});
		 },
		 minLength: 3,
		 delay: 400
	});
	// END name_schnellsuche
	
	// BEGIN fachgebiet_schnellsuche
	jQuery( "#fachgebiet_schnellsuche" ).autocomplete({
		 source: function( request, response ) {
		 	jQuery.ajax({
		 		url: "https://api.kvbw-admin.de/schnellsuche/getAutocompleteItems2.json/"+request.term+"/25?api_key=wCPL88Mf0n7cxYAmXdi3shgCgi7TYFotgddpl_ElnLyUJ8fGlxJNP_p5hxYfbmJszXRUXvfjfOcZWsEh_n4PmtUE_SUbdCDNyuHuZXOeK0cGtRXsd0hAtaet27EfKg2h",
		 		success: function( data ) {
		 			console.log(data);
		 			response( data );
		 		}
		 	});
		 },
		 minLength: 3,
		 delay: 400
	});
	// END fachgebiet_schnellsuche
	
	/** END ASU Schnellsuche **/
});