// $(document).ready(function() {
//   var sortedIds = [];

//   $("#instruction-cards, #instruction-cards-drop-zone").sortable({
//     connectWith: ".card-connect",
//     cursor: "pointer",
//     handle: ".instruction-card__handle",
//     placeholder: "ui-state-highlight",
//     dropOnEmpty: true,
//     update: function(e, ui) {
//       if (this === ui.item.parent()[0]) {
//         console.log(UpdateTimeCounter());
//         $("#time-counter").val(UpdateTimeCounter() + " / " + $("#time-input").val())
//         colorCodingTimeCounter(UpdateTimeCounter(), $("#time-input").val())
//       }
//     }
//   }).disableSelection();

//   $("#course-date").datepicker({
//     showButtonPanel: true,
//     currentText: "Today",
//     beforeShow: function(input, inst){
//       $("#ui-datepicker-div").wrap("<div class='datepicker ll-skin-latoja hasDatepicker'></div>");
//     }
//   });

//   $("#course-time").timepicker({ // built using jquery.timepicker - http://jonthornton.github.io/jquery-timepicker/
//     "scrollDefault": "now",
//     "step": 5
//   });

//   $("#students").spinner();

//   $("#class-submit").click(function() {
//     if(formValidate($(this))) {
//       var newId = saveClass();
//       if(newId > 0) {
//         $(location).attr("href", "confirmation.html?cid=" + newId);
//       } else {
//         console.log("class id was not saved.");
//       }
//     } else {
//       $("#form-errors").html("<strong>Please fix the errors highlighted above</strong>").addClass("alert-text");
//     }
//   });

//   $.getJSON("assets/data/instruction.json")
//     .done(function(items) {
//       var classRawUrl = window.location.href.slice(window.location.href.indexOf("=") + 1);
//       var classUrl = classRawUrl.split("+");
//       var classCount = classUrl.length;

//       $("#selections").val(classRawUrl);

//       var order = 1;
//       var totalTime = 0;
//       var instructionItems = items["instruction"];
//       for(var j = 0; j < classCount; j++) {
//         classTime = parseInt(classUrl[j].split("-")[1]);
//         totalTime += parseInt(classTime);
//         for(var i = 0; i < instructionItems.length; i++) {
//           classFromUrl = parseInt(classUrl[j].split("-")[0]);
//           currentInstructionListing = instructionItems[i]["id"];
//           if(classFromUrl == currentInstructionListing) {
//             var addInstructionItem = "";
//             var outcomes = "";
//             var assessment = "";

//             instructionItems[i].learning_outcomes.forEach(function(outcome) {
//               outcomes += "<li>" + outcome + "</li>"
//             })

//             instructionItems[i].activities.forEach(function(activity) {
//               assessment += "<li>" + activity + "</li>"
//             });

//             addInstructionItem = $("<ul></ul><li class='review-card'><div class='instruction-card__content'><div class='instruction-card__title'><h4>" + order + ". " + instructionItems[i]["title"] + "</h4><p>Time for Instruction: " + classTime + " minutes</p></div><div class='instruction-card__description'><p><strong>Description</strong>: " + instructionItems[i]["description"] + "</p><p><strong>Learning Outcomes:</strong></p><ul class='outcomes-review'>" + outcomes + "</ul><p><strong>Suggested Activities:</strong></p><ul class='outcomes-review'>" + assessment + "</ul></div></div></li></ul>");

//             $("#your-class").append(addInstructionItem);

//             order++;
//           }
//         }
//       }
//       $("#total-time").text("- Total Class time: " + totalTime + " minutes");
//     });

//   // $("#menu-step-one").click(function() {
//   //   var sortedIDs = $("#instruction-cards-drop-zone").sortable("toArray", {attribute: "data-custom"});
//   //   console.log(sortedIDs);
//   //   if(sortedIDs.length != 0) {
//   //     // alert(sortedIDs);
//   //   } else {
//   //     alert('Please add items to your course');
//   //   }
//   // });

//   $("#menu-step-one").click(function() {
//     var selections = $("#instruction-cards-drop-zone").sortable("toArray", {attribute: "data-custom"});
//     if(selections.length != 0) {
//       var url = "class-form.html?c=" + selections.join('+');
//       // console.log(url);
//       $(location).attr('href', url);
//     } else {
//       alert('Please add items to your course')
//     }
//   })
// });

// $.getJSON("assets/data/instruction.json")
//   .done(function(items) {
//     items.instruction.forEach(function(item) {
//       var id = item.id;
//       var title = item.title;
//       var description = item.description;
//       var time = item.default_time;
//       var outcomes = "";
//       var assessment = "";

//       item.learning_outcomes.forEach(function(outcome) {
//         outcomes += "<li>" + outcome + "</li>"
//       })

//       item.activities.forEach(function(activity) {
//         assessment += "<li>" + activity + "</li>"
//       });

//       var modal = "<p><strong>Brief Description:</strong> " + description + "</p><p><strong>Learning Outcomes</strong> (students will be able to:)<br><ul>" + outcomes + "</ul></p><p><strong>Suggested Activities/Assessment</strong><br><ul>" + assessment + "</ul></p>";

//       var instructionItem =  $("<li data-custom='" + id + "-" + time + "' id='" + id + "' class='instruction-card'><div class='instruction-card__handle ui-sortable-handle'><div class='dot-row'><div class='dot'></div><div class='dot'></div></div><div class='dot-row'><div class='dot'></div><div class='dot'></div></div><div class='dot-row'><div class='dot'></div><div class='dot'></div></div></div><div class='instruction-card__content'><div class='instruction-card__title'><h4>" + title + "</h4></div><div class='instruction-card__description'><p>" + description + "</p></div><div class='instruction-card__tools'><div class='instruction-card__modal-link'><a id='item" + id + "' href='#'>More Info</a></div><div class='instruction-card__time-default'><input class='time-input" + id + "' type='text' data-id='" + id + "' data-value='" + time + "' value='" + time + "' ></div></div></div></li><div id='dialog" + id + "' title='" + title + "'><p>" + modal + "</p></div>");

//       $("ul#instruction-cards").append(instructionItem);

//       $("#dialog" + id).dialog({
//         autoOpen: false,
//         modal: true,
//         minHeight: 400,
//         minWidth: 800
//       });
    
//       $("#item" + id).click(function(event) {
//         event.preventDefault();
//         $("#dialog" + id).dialog("open");
//       });

//       $(".time-input" + id).blur(function() {
//         var newDataId = $(this).attr("data-id") + "-" + $(this).val();
//         // console.log(newDataId);
//         $(this).parent().parent().parent().parent().attr("data-custom", newDataId);
//         $("#time-counter").val(UpdateTimeCounter() + " / " + $("#time-input").val());
//         colorCodingTimeCounter(UpdateTimeCounter(), $("#time-input").val())
//         console.log(UpdateTimeCounter());
//       });
//     })
//   })

// $("#time-input").blur(function() {
//   $("#time-counter").val(UpdateTimeCounter() + " / " + $(this).val())
//   colorCodingTimeCounter(UpdateTimeCounter(), $(this).val())
// });

// function UpdateTimeCounter() {
//   var timeInput = $("#time-input").val();
//   var timeCounter = $("#time-counter");
//   var list = $("#instruction-cards-drop-zone li");
//   var total = 0;
//   list.each(function(index, value) {
//     total += parseInt(value.attributes["data-custom"].value.split("-")[1])
//   });
//   hideShowBackgroundText(total);
//   return total;
// }

// function hideShowBackgroundText(totalTime) {
//   if(totalTime <= 0) {
//     $("#instruction-cards-drop-zone").addClass("bgImage");
//   } else {
//     $("#instruction-cards-drop-zone").removeClass("bgImage");
//   }
// }

// function colorCodingTimeCounter(requestTime, availableTime) {
//   var timeCounter = $("#time-counter");
//   timeCounter.removeClass("problem").removeClass("okay").removeClass("warning")
//   if(parseInt(requestTime) > parseInt(availableTime)) {
//     timeCounter.addClass("problem")
//   } else if(parseInt(requestTime) < parseInt(availableTime)) {
//     timeCounter.addClass("warning")
//   } else if(parseInt(requestTime) == parseInt(availableTime)) {
//     timeCounter.addClass("okay")
//   }
// }

// function formValidate(element) {
//   var isValid = true;
//   var c = $(".validate-this");

//   $.each($(c), function(key, value) {
//     var item = "#" + value.id;
//     if($(value).val() == "") {
//       isValid = false;      
//       $(item).addClass("alert");
//     } else {
//       $(item).removeClass("alert");
//     }
//   })

//   return isValid;
// }

// function saveClass() {
//   var res;
//   var request;
//   var $form = $("#new-class");
//   var $inputs = $form.find("input");
//   var serializedData = $form.serialize();
//   request = $.ajax({
//     url: "../assets/form/build-class.php",
//     type: "post",
//     data: serializedData,
//     async: false
//   });

//   request.done(function (response, textStatus, jqXHR){
//     // Log a message to the console
//     console.log("Success, it worked!");
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