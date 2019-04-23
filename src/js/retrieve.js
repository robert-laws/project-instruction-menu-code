// $(function() {

//   $.ajaxSetup({ 
//     cache: false 
//   });
  
//   var classId = window.location.href.slice(window.location.href.indexOf("=") + 1);

//   if(classId.slice(0, 1) == "h") {
//     console.log("no cid provided");
//     $("#display-view").css("display", "none");
//   } else {
//     $("#display-options").css("display", "none");
//     $("#class-id").text(classId);
//     $("#class-remove-id").val(classId);
//     var title = $("#get-course-title");
//     var faculty = $("#get-faculty-name");
//     var date = $("#get-date");
//     var time = $("#get-time");
//     var students = $("#get-students");

//   $.getJSON("assets/data/classes.json")
//     .done(function(items) {
//       var classItems = items["classes"];
//       var totalTime = 0;

//       if(classId == 0) {
//         var len = classItems.length - 1;
//         classId = classItems[len].id;
//       }

//       for(var i = 0; i < classItems.length; i++) {
//         if(classItems[i].id === parseInt(classId)) {
//           // alert("matched on id: " + classId);
//           faculty.text(classItems[i].instructor);
//           title.text(classItems[i].course_title);
//           date.text(classItems[i].date);
//           time.text(classItems[i].time);
//           students.text(classItems[i].students);
          
//           var classDetails = classItems[i].instruction;
//           var count = 1;
          
//           classDetails.forEach(function(item) {
//             var details = $("#get-class-details");
//             getUnitDetails(item.unit, item.minutes, count);
//             totalTime += parseInt(item.minutes);
//             count++;
//           });

//           break;
//         } else {
//           title.text("No class information.")
//         }
//       }
//       if(totalTime > 0) {
//         $("#total-time-review").text(" - Total Instruction Time: " + totalTime + " minutes");
//       }
//     })
//   }
// });

// function getList(array) {
//   var result = "";
//   array.forEach(function(item) {
//     result += "<li>" + item + "</li>";
//   });
//   return result;
// }

// function getUnitDetails(unitId, minutes, countVal) {
//   var details = $("#get-class-details");
//   $.getJSON("assets/data/instruction.json")
//     .done(function(units) {
//       var unitItems = units["instruction"];        
//       for(var i = 0; i < unitItems.length; i++) {
//         if(unitItems[i].id === parseInt(unitId)) {
//           details.append("<div class='instruction-details'><h5>" + unitItems[i].title + "</h5><div class='detail-shift'><p><strong>Instruction Time:</strong> " + minutes + " minutes</p><p><strong>Instruction Description</strong>: " + unitItems[i].description + "</p><ul><p><strong>Learning Outcomes:</strong></p>" + getList(unitItems[i].learning_outcomes) + "</ul><ul><p><strong>Suggested Activities:</strong></p>" + getList(unitItems[i].activities) + "</ul></div><hr></div>");
//           break;
//         }
//       }
//     });
// }



// $(function() {

//   $.ajaxSetup({ 
//     cache: false 
//   });

//   var instructionTable = $("#instruction-units").find("tbody");

//   $.getJSON("assets/data/instruction.json")
//     .done(function(units) {
//       var row = "even";
//       var unitItems = units["instruction"];
//       for(var i = 0; i < unitItems.length; i++) {
//         row == "even" ? row = "odd" : row = "even";
//         instructionTable.append("<tr class='row-top " + row + "'><td class='twenty instruction-title'><strong>" + unitItems[i].title + "</strong></td><td class='fifteen text-right'><strong>Description:</strong></td><td>" + unitItems[i].description + "</td></tr><tr class='row-middle " + row + "'><td><!--Default Time: " + unitItems[i].default_time + " minutes--></td><td class='fifteen text-right'><strong>Learning Outcomes:</strong></td><td><ul>" + getList(unitItems[i].learning_outcomes) + "</ul></td></tr><tr class='row-bottom " + row + "'><td></td><td class='fifteen text-right'><strong>Suggested Activities:</strong></td><td><ul>" + getList(unitItems[i].activities) + "</ul></td></tr>");
//       }
//     });

//   function getList(array) {
//     var result = "";
//     array.forEach(function(item) {
//       result += "<li>" + item + "</li>";
//     });
//     return result;
//   }

//   $("#class-find").click(function(event) {
//     var search = [];
//     $("#find-form .error").text("");
//     $("#find-form input[type='text']").each(function(index, item) {
//       search.push(item.value);
//     });
//     if(search[0] == '' || search[1] == '') {
//       $("#find-form .error").text("Please enter a value in both search boxes.");
//     } else {
//       $.getJSON("assets/data/classes.json")
//         .done(function(items) {
//           var classItems = items["classes"];
//           var classId;
//           for(var i = 0; i < classItems.length; i++) {
//             if(classItems[i].instructor == search[0] && classItems[i].course_title == search[1]) {
//               classId = classItems[i].id;
//               $(location).attr("href", "find.html?cid=" + classId);
//               break;
//             } else {
//               if(i == classItems.length - 1) {
//                 $("#find-form .error").text("No classes were found with the search terms name: " + search[0] + " and class: " + search[1] + ".");
//               }
//             }
//           }
//         });
//     }
//   })
// });

// $("#cancel-class").click(function() {
//   var id = $("#class-remove-id");
//   var match = '-';
//   if(id.val() > 0) {
//     match = removeClass();
//     $(location).attr('href', 'https://writejson.libtech.georgetown.domains/completed.html');
//   }
//   console.log(match);
// })

// function removeClass() {
//   var res;
//   var request;
//   var $form = $("#cancel-class");
//   var $inputs = $form.find("input");
//   var serializedData = $form.serialize();
//   request = $.ajax({
//     url: "../assets/form/remove-class.php",
//     type: "post",
//     data: serializedData,
//     async: false
//   });

//   request.done(function (response, textStatus, jqXHR){
//     // Log a message to the console
//     console.log("Success, remove a class worked!");
//     res = response;
//   });

//   request.fail(function (jqXHR, textStatus, errorThrown){
//     // Log the error to the console
//     console.error(
//       "The following error occurred: " + textStatus, errorThrown
//     );
//     res = 0;
//   });

//   return res;
// }