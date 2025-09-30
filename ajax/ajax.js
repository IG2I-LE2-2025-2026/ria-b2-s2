// TODO : ajax(url,[ {[type],[data],[callback]} ]) 
// ajax({url,[type],[data],[callback]})

function enrichir(oDef,oModif) {
	var oRes = {}; 
	for (prop in oDef) {
		//console.log("traitement de " + prop);
		if ((oModif != undefined) && (oModif[prop] != undefined)) {
			//console.log("present dans oModif");
			oRes[prop] = oModif[prop]; 
		}
		else {
			oRes[prop] = oDef[prop];
			//console.log("non present dans oModif");
		} 
	}

	return oRes; 
}

function ajax(urlOrOConfig, oParams) { 
	var oDef = {
		url : false, // doit apparaître pour pouvoir être enrichi !!
		type : "GET",
		data : {}, // en JSON ! 
		callback : function(s){console.log("recu: " + s); }
	};
	
	var oConfig;

	// le premier argument est-il une chaine ?
	if (typeof urlOrOConfig == "string") {
		// l'url est dans le premier argument, on doit enrichir le second en lui ajoutant l'url 
		// SI l'url est aussi dans le second argument... que faire ? => On écrase 
		// SI seule l'url est fournie et que le second argument est undefined... que faire ? 
		// => traité plus haut
		oConfig = enrichir(oDef, oParams); // clonage de oParams qui peut être vide 
		oConfig.url = urlOrOConfig; 
	} else {
		// le premier argument est un objet 
		oConfig = enrichir(oDef, urlOrOConfig); 
	}
	
	if (!oConfig.url) {
		// TODO : erreur !
		console.log("Erreur : url inconnue"); 
		return false;
	}
	
	// fabrication de l'objet de connexion sous forme de var. locale 
	var request = new XMLHttpRequest(); 
	var donnees = ""; // future chaine QS 
	// produite à partir du parcours de oConfig.data
	
	for (nextCle in oConfig.data) {
		donnees += nextCle + "=" + oConfig.data[nextCle] + "&"; 
	}
	// à la fin de la chaine, il peut y avoir un & de trop 
	// supprimer des caractères à droite : substr/.length ou rtrim 
	console.log("donnees : " + donnees);
	
	if (oConfig.type=='GET') 
	{
		request.open("GET", oConfig.url+"?"+donnees, true);
		donnees=null;
	}
	else 
	{
		request.open("POST", oConfig.url, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}

	request.onreadystatechange = function(){
		// l'objet oConfig est dans le scope de cette fonction ! 
		// fonction de traitement de la réponse 
		if (request.readyState == 4) 
		{
			  if (request.status == 200) 
			  {
					reponse = request.responseText; // on récupère la réponse 
					// on invoque la fonction de rappel demandée en lui passant la réponse
					oConfig.callback(reponse); 
			  }
		}
	};
	
	request.send(donnees);
	
}

console.log("Chargement de ajax.js : ajax(url,{url,type,data,callback})"); 

