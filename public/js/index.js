(function($){

	function ajouter_ul(id, titre, id_prepend){
		if(id === 'liste_todo'){
			$('<ul id="'+ id +'"></ul>').insertBefore('#ajouter_tache');
		} else {
			$('<section id="done"></ul>').insertAfter('#todo');
			$('#done').prepend('<ul id="'+ id +'"></ul>');
			$('#done').prepend('<section id="basculer_tache"></section>');
		}
		ajouter_cpt(id, id_prepend);
		$('<h2>Liste des tâches '+ titre +'</h2>').insertBefore('#cpt_'+ id);
	}

	function ajouter_li(id){
		var ul = $('#'+id);
		ul.prepend('<li></li>');
	}

	function ajouter_label(texte, id){
		var li = $('#'+ id +' li:first-child');
		li.prepend('<label>'+ texte +'</label>');
	}

	function ajouter_details(id){
		var li = $('#'+ id +' li:first-child');
		li.prepend('<button>Détails</button>');
	}

	function ajouter_checkbox(id, valeur){
		var li = $('#'+ id +' li:first-child');
		li.prepend('<input type="checkbox" name="taches" value="'+ valeur +'" />');
	}

	function ajouter_tache(numero, tache, id, id_cpt, id_prepend){
		ajouter_li(id);
		ajouter_details(id);
		ajouter_label('Tâche '+ numero +' : '+ tache +' ', id);
		ajouter_checkbox(id, tache);
		afficher_cpt(compter_li(id_cpt), id_cpt, id_prepend);
	}

	function compter_li(id){
		return $("#"+ id +" li:visible").length;
	}

	function ajouter_cpt(id_cpt, id_prepend){
		$('<p id="cpt_'+ id_cpt +'" class="cpt"></p>').prependTo('#'+ id_prepend);
	}

	function afficher_cpt(cpt, id_cpt, id_prepend){
		if(cpt != 0){
			if( !$('#cpt_'+ id_cpt)[0] ){
				ajouter_cpt(id_cpt, id_prepend);
				$('#archiver_tache').css('height', '30px');
			}
			$('#cpt_'+ id_cpt).text( cpt +' tâche(s) restante(s)');
			$('#cpt_'+ id_cpt).css('display', 'block');
			$('#span_archiver').css('display', 'block');
			$('#liste_todo').insertBefore('#ajouter_tache');
		} else{
			$('#cpt_'+ id_cpt).css('display', 'none');
			$('#span_archiver').css('display', 'none');
		}
	}

	function afficher_erreur(message, retour){
		if(!$('#message_erreur')[0]) {
			$('<span id="message_erreur">'+ message +'</span>').insertAfter('#ajouter');
		} else {
			$('#message_erreur').text(message);
			$('#message_erreur').css('display', 'block');
		}
		return retour;
	}

	$("#ajouter").click(function(){
		var nouvelleTache = $("input[name='nouvelleTache']").val();
		var existence = false;
		var cpt = 0;

		if($('#message_erreur')[0]) {
			$('#message_erreur').css('display', 'none');
		}

		if(nouvelleTache != ""){
			if($('#liste_todo')[0]) {
				cpt = compter_li('liste_todo')+1;

				$("#liste_todo li").each(function(i){
					if( $(this).find("label").text().trim().split(" : ")[1] === nouvelleTache ){
						existence = true;

						if($(this).css('display') === 'none'){
							afficher_erreur("Cette tâche est déjà archivée !", "false");
						} else{
							afficher_erreur("Cette tâche est déjà dans la liste !", "false");
						}
					}
				});
			} else {
				cpt++;
				ajouter_ul('liste_todo', 'en cours', 'archiver_tache');
			}
			if($('#liste_todo')[0] && existence === false){
				ajouter_tache(cpt, nouvelleTache, 'liste_todo', 'liste_todo', 'archiver_tache');
			}
		} else {
			alert("Veuillez saisir une tâche");
		}
	});

	$("#archiver").click(function(){
		var cpt = 0;
		var existence = false;

		if(!$('#liste_done')[0]){
			ajouter_ul('liste_done', 'terminées', 'basculer_tache');
		} else {
			cpt = compter_li("liste_done");
		}

		$('input:checked[name=taches]').each(function() {
			var checkbox_val = $(this).val();

			if($(this).parent('li').css('display') === 'none'){
				return;
			} else{
				$("#liste_done li").each(function() {
					if( $(this).find("label").text().trim().split(" : ")[1] === checkbox_val){
						existence = true;
						afficher_erreur("Cette tâche est déjà archivée !", "");
						// alert('Cette tâche est déjà archivée 1 !');
						// return;
					}
				});

				if(existence === false){
					cpt++;
					$(this).parent('li').css('display', 'none');
				  	ajouter_tache(cpt, $(this).val(), 'liste_done', 'liste_todo', 'basculer_tache');
				}
			}
		});
	});
})(jQuery);
