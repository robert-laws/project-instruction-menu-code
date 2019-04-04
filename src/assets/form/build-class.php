<?php
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $course = isset($_POST['course']) ? $_POST['course'] : null;
    $date = isset($_POST['date']) ? $_POST['date'] : null;
    $time = isset($_POST['time']) ? $_POST['time'] : null;
    $students = isset($_POST['students']) ? $_POST['students'] : null;
    $selections = isset($_POST['selections']) ? $_POST['selections'] : null;

    $selectionArr = [];

    $selectionsArr = (explode("+", $selections));
    $instructionArr = array();
    
    foreach ($selectionsArr as $value) {
        $instruct = (explode("-", $value));
        $unit = array('unit' => $instruct[0], 'minutes' => $instruct[1]);
        array_push($instructionArr, $unit);
    }
    
    $myFile = "../data/classes.json";
    
    $current_data = file_get_contents($myFile);  
    $array_data = json_decode($current_data, true);

    $next_id = count($array_data["classes"]) + 1;

    // create json data and write to existing file
    $extra = array('id' => $next_id, 'instructor' => $name, 'email' => $email, 'course_title' => $course, 'date' => $date, 'time' => $time, 'students' => $students, 'instruction' => $instructionArr);  
    array_push($array_data["classes"], $extra);
    $final_data = json_encode($array_data);
    file_put_contents($myFile, $final_data);

    // send email to faculty
    $to = $email;
    $subject = "Library Instruction for ".$date;
    $message = "Your library instruction for ".$date." has been saved.";
    $from = "guqlibrary@georgetown.edu";
    $headers = "From:" . $from;
    mail($to, $subject, $message, $headers);

    // send email to library
    $to = "guqlibrary@georgetown.edu";
    $subject = "Library Instruction for ".$name." on ".$date;
    $message = "A request for library instruction for ".$name." on ".$date." has been submitted.";
    $from = "guqlibrary@georgetown.edu";
    $headers = "From:" . $from;
    mail($to, $subject, $message, $headers);

    echo $next_id;
?>