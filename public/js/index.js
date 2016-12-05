(function($){

	function ajouter_ul(id, titre){
		if(id === 'liste_todo'){
			$('<ul id="'+ id +'"></ul>').insertBefore('#ajouter_tache');
		} else {
			$('<section id="taches_archivees"></ul>').insertAfter('#ajouter_tache');
			$('#taches_archivees').prepend('<ul id="'+ id +'"></ul>');
		}
		$('<h2>Liste des tâches '+ titre +'</h2>').insertBefore('#'+ id);
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

	function ajouter_tache(numero, tache, id){
		ajouter_li(id);
		ajouter_details(id);
		ajouter_label('Tâche '+ numero +' : '+ tache +' ', id);
		ajouter_checkbox(id, tache);
		afficher_cpt(compter_li(id));
	}

	function compter_li(id){
		return $("#liste_todo li:visible").length;
	}

	function ajouter_cpt(){
		$('<p id="cpt"></p>').prependTo('#archiver_tache');
	}

	function afficher_cpt(cpt){
		if( !$('#cpt')[0] ){
			ajouter_cpt();
			$('#archiver_tache').css('height', '30px');
		}
		$('#cpt').text('Sur '+ cpt +' restante(s)');
		console.log('afficher_cpt : '+ cpt);
		$('#span_archiver').css('display', 'block');
		$('#liste_todo').insertBefore('#ajouter_tache');
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
				var cpt = compter_li('liste_todo')+1;

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
				ajouter_ul('liste_todo', 'en cours');
			}
			if($('#liste_todo')[0] && existence === false){
				ajouter_tache(cpt, nouvelleTache, 'liste_todo');
			}
		} else {
			alert("Veuillez saisir une tâche");
		}
	});

	$("#archiver").click(function(){
		var cpt = 0;
		var existence = false;

		if(!$('#liste_done')[0]){
			ajouter_ul('liste_done', 'terminées');
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
				  	ajouter_tache(cpt, $(this).val(), 'liste_done');
				}
			}
		});
	});
})(jQuery);
