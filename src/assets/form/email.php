<?php
   $to = "rdl27@georgetown.edu"; // <– replace with your address here
   $subject = "Test mail from menu site";
   $message = "Hello! This is a simple test email message.";
   $from = "guqlibrary@georgetown.edu";
   $headers = "From:" . $from;
   mail($to, $subject, $message, $headers);
   echo "Mail Sent.";
?>