<?php
   $next_id = 4;
   $course = "LIB 200";
   $date = "10/13/2019";
   $time = "14:30";
   $to = "rdl27@georgetown.edu"; // <– replace with your address here
   $subject = "Test mail from menu site";
   $message = "<h3>Library Instruction Details</h3><p>Your library instruction request has been saved. Please refer to the details below for your records. A librarian will be in touch with you within 48 hours to confirm your library instruction.</p><table cellpadding='0' cellspacing='0' style='min-width: 700px;'><tbody><tr><th style='width: 33%; border: 1px solid #dfe2e5; padding: 6px 13px;'>Course Name</th><th style='width: 33%; border: 1px solid #dfe2e5; padding: 6px 13px;'>Date</th><th style='width: 33%; border: 1px solid #dfe2e5; padding: 6px 13px;'>Time</th></tr><tr><td style='border: 1px solid #dfe2e5; padding: 6px 13px;'><a href='http://menu.guqlibrary.georgetown.domains/prebuilt.html?cid=".$next_id."'>".$course."</a></td><td style='border: 1px solid #dfe2e5; padding: 6px 13px;'>".$date."</td><td style='border: 1px solid #dfe2e5; padding: 6px 13px;'>".$time."</td></tr></tbody></table><p>Please <a href='https://qatar.library.georgetown.edu/ask-us' target='_blank'>contact the library</a> if you have any questions.</p><div><a href='https://qatar.library.georgetown.edu/' target='_blank'><img alt='Georgetown University in Qatar Library' src='https://qatar.library.georgetown.edu/sites/default/files/guq-library-logo-2x.png' width='278.5' style='max-width:557px; padding-bottom: 0; display: inline !important; vertical-align: bottom;'></a></div>";
   $from = "guqlibrary@georgetown.edu";
   $headers = "MIME-Version: 1.0" . "\r\n";
   $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
   $headers .= "From:" . $from . "\r\n";
   mail($to, $subject, $message, $headers);
   echo "Mail Sent.";
?>