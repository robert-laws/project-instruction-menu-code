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

  $name = $result[0]["instructor"];
  $course = $result[0]["course_title"];
  $email = $result[0]["email"];
  $date = $result[0]["date"];

  $new_array = array('classes' => $classes);
  $final_data = json_encode($new_array);
  file_put_contents($myFile, $final_data);

  // send email to faculty
  $to = $email;
  $subject = "Cancellation confirmation of Library Instruction for ".$date;
  $message = "<h4>Your library instruction for course ".$course." on ".$date." has been cancelled.</h4>";
  $from = "guqlibrary@georgetown.edu";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "From:" . $from . "\r\n";
  mail($to, $subject, $message, $headers);

  // send email to library
  $to = "guqlibrary@georgetown.edu";
  $subject = "Library Instruction for ".$name." on ".$date." has been cancelled.";
  $message = "A cancellation request for library instruction for ".$name." on ".$date." has been submitted.";
  $from = "guqlibrary@georgetown.edu";
  $headers = "From:" . $from;
  mail($to, $subject, $message, $headers);
?>