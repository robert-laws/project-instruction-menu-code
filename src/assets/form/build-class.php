<?php
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $course = isset($_POST['course']) ? $_POST['course'] : null;
    $date = isset($_POST['date']) ? $_POST['date'] : null;
    $time = isset($_POST['time']) ? $_POST['time'] : null;
    $students = isset($_POST['students']) ? $_POST['students'] : null;

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

    $extra = array('id' => $next_id, 'instructor' => $name, 'course_title' => $course, 'date' => $date, 'time' => $time, 'students' => $students, 'instruction' => $instructionArr);  
    array_push($array_data["classes"], $extra);
    $final_data = json_encode($array_data);
    file_put_contents($myFile, $final_data);

    echo $next_id;
?>