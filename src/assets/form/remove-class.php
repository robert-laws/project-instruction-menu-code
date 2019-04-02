<?php
  $id = isset($_POST['class-id']) ? $_POST['class-id'] : null;

  $myFile = "../data/classes.json";

  $current_data = file_get_contents($myFile);  
  $array_data = json_decode($current_data, true);
  
  $classes = $array_data["classes"];
  $count = count($classes);

  for($i = 0; $i < $count; $i++) {
    if($classes[$i]["id"] == $id) {
        $result[] = $classes[$i];
        $match_index = $i;
        break;
    }
    next($array_data);
  }
  
  $result = array_splice($classes, intval($match_index), 1);
  $new_array = array('classes' => $classes);
  $final_data = json_encode($new_array);
  file_put_contents($myFile, $final_data);
?>