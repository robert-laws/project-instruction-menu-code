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
    $subject = "Library Instruction for ".$course." on ".$date;
    $message = "<h3>Library Instruction Details</h3><p>Your library instruction request has been saved. Please refer to the details below for your records.</p><table cellpadding='0' cellspacing='0' style='min-width: 700px;'><tbody><tr><th style='width: 33%; border: 1px solid #dfe2e5; padding: 6px 13px;'>Course Name</th><th style='width: 33%; border: 1px solid #dfe2e5; padding: 6px 13px;'>Date</th><th style='width: 33%; border: 1px solid #dfe2e5; padding: 6px 13px;'>Time</th></tr><tr><td style='border: 1px solid #dfe2e5; padding: 6px 13px;'><a href='http://writejson.libtech.georgetown.domains/prebuilt.html?cid=".$next_id."'>".$course."</a></td><td style='border: 1px solid #dfe2e5; padding: 6px 13px;'>".$date."</td><td style='border: 1px solid #dfe2e5; padding: 6px 13px;'>".$time."</td></tr></tbody></table><p>Please <a href='https://qatar.library.georgetown.edu/ask' target='_blank'>contact the library</a> if you have any questions.</p><div><a href='https://www.library.georgetown.edu/qatar/' target='_blank'><img alt='Georgetown University in Qatar Library' src='https://qatar.library.georgetown.edu/sites/default/files/libLogoSpiral4x2_3.png' width='278.5' style='max-width:557px; padding-bottom: 0; display: inline !important; vertical-align: bottom;'></a></div>";
    $from = "guqlibrary@georgetown.edu";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From:" . $from . "\r\n";
    mail($to, $subject, $message, $headers);

    // send email to library
    $to = "guqlibrary@georgetown.edu";
    $subject = "Library Instruction for ".$name." on ".$date;
    $message = "A request for library instruction for ".$name." and course ".$course." on ".$date." has been submitted. Please forward this email to the personal library of ".$name.".";
    $from = "guqlibrary@georgetown.edu";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From:" . $from . "\r\n";
    mail($to, $subject, $message, $headers);

    echo $next_id;
?>