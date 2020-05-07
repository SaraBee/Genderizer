<?php

$json = file_get_contents("./lexicon/pairs.json");
$handle = fopen("./lexicon/dictionary.json", "w");

$dict = json_decode($json);

$new_dictionary =[];

$valid_genders = ["Neut", "Fem", "Masc"];
foreach ($dict as $noun => $gender) {
        foreach ($valid_genders as $valid_gender) {
                if (strpos($gender, $valid_gender)) {
                        $new_dictionary[$noun] = $valid_gender;
                        break;
                }
        }
}

$new_dictionary = json_encode($new_dictionary);

fwrite($handle, $new_dictionary);
fclose($handle);

