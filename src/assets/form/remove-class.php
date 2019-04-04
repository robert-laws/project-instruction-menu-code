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

  // send email to faculty
  $to = $email;
  $subject = "Cancellation confirmation of Library Instruction for ".$date;
  $message = "Your library instruction for ".$date." has been cancelled.";
  $from = "guqlibrary@georgetown.edu";
  $headers = "From:" . $from;
  mail($to, $subject, $message, $headers);

  // send email to library
  $to = "guqlibrary@georgetown.edu";
  $subject = "Library Instruction for ".$name." on ".$date." has been cancelled.";
  $message = "A cancellation request for library instruction for ".$name." on ".$date." has been submitted.";
  $from = "guqlibrary@georgetown.edu";
  $headers = "From:" . $from;
  mail($to, $subject, $message, $headers);
?>