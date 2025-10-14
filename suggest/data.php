<?php
if (isset($_GET["debutNom"])) 
{
  $cherche = html_entity_decode($_GET["debutNom"],
    ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401,
    "UTF-8"); 
  // FIXME : Problème de décocdage des caractères accentués
  
  // On va ouvrir un fichier et afficher les lignes 
  // où le prénom ou le nom contient ce texte

  $tabLignes = file("LE2_2025_2026.csv");
  $res = array();
  foreach ($tabLignes as $ligne)
  {
    // EXO1 : effectuer une recherche sur nom ou prénom 
    if (preg_match("/(^(.*):(" . $cherche . ".*):.*$)|" .
                    "(^(" . $cherche . ".*):.*:.*$)/i",
          $ligne,$tabResultats))
    {
      // EXO2 afficher nom ET prénom 
      $tabResultats = explode(":", rtrim($ligne));
      /*
      echo "<div>" . $tabResultats[0] . " " .
        $tabResultats[1] . "</div>";
      */
      $res[] = array("nom" => $tabResultats[0],
                     "prenom" => $tabResultats[1],
                     "id" => $tabResultats[2]);
    }
  }
  
  echo json_encode($res);
  
  die("");
}

?>
