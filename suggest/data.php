<?php
//sleep(2);

include_once "libs/maLibUtils.php";
include_once "libs/maLibSQL.pdo.php";

if ($cherche = valider("debutNom", "GET"))
{
  $cherche = html_entity_decode($cherche,
    ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401,
    "UTF-8"); 
  // FIXME : Problème de décocdage des caractères accentués
  
  $tabResultats = parcoursRs(SQLSelect("
    SELECT
      nom AS nom,
      prenom AS prenom,
      id AS id
    FROM etudiants
    WHERE prenom LIKE '$cherche%'
       OR nom LIKE '$cherche%'
    ORDER BY nom;
  "));
  
  echo json_encode($tabResultats);
  
  die("");
}

?>
