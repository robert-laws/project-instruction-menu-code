// index.html -> initialize sortable dropzone and load instruction into cards
if($("#instruction-cards").length) {
  $("#instruction-cards, #instruction-cards-drop-zone").sortable({
    connectWith: ".card-connect",
    cursor: "pointer",
    handle: ".instruction-card__handle",
    placeholder: "ui-state-highlight",
    dropOnEmpty: true,
    update: function(e, ui) {
      if (this === ui.item.parent()[0]) {
        console.log(UpdateTimeCounter());
        $("#time-counter").val(UpdateTimeCounter() + " / " + $("#time-input").val())
        colorCodingTimeCounter(UpdateTimeCounter(), $("#time-input").val())
      }
    }
  }).disableSelection();


  // index.html - load instruction.json data into the draggable cards
  $.getJSON("assets/data/instruction.json")
  .done(function(items) {
    items.instruction.forEach(function(item) {
      var id = item.id;
      var title = item.title;
      var description = item.description;
      var time = item.default_time;
      var outcomes = "";
      var assessment = "";

      item.learning_outcomes.forEach(function(outcome) {
        outcomes += "<li>" + outcome + "</li>"
      })

      item.activities.forEach(function(activity) {
        assessment += "<li>" + activity + "</li>"
      });

      var modal = "<p><strong>Brief Description:</strong> " + description + "</p><p><strong>Learning Outcomes</strong> (students will be able to:)<br><ul>" + outcomes + "</ul></p><p><strong>Suggested Activities/Assessment</strong><br><ul>" + assessment + "</ul></p>";

      var instructionItem =  $("<li data-custom='" + id + "-" + time + "' id='" + id + "' class='instruction-card'><div class='instruction-card__handle ui-sortable-handle'><div class='dot-row'><div class='dot'></div><div class='dot'></div></div><div class='dot-row'><div class='dot'></div><div class='dot'></div></div><div class='dot-row'><div class='dot'></div><div class='dot'></div></div></div><div class='instruction-card__content'><div class='instruction-card__title'><h4>" + title + "</h4></div><div class='instruction-card__description'><p>" + description + "</p></div><div class='instruction-card__tools'><div class='instruction-card__modal-link'><a id='item" + id + "' href='#'>More Info</a></div><div class='instruction-card__time-default'><input class='time-input" + id + "' type='text' data-id='" + id + "' data-value='" + time + "' value='" + time + "' ></div></div></div></li><div id='dialog" + id + "' title='" + title + "'><p>" + modal + "</p></div>");

      $("ul#instruction-cards").append(instructionItem);

      $("#dialog" + id).dialog({
        autoOpen: false,
        modal: true,
        minHeight: 400,
        minWidth: 800
      });
    
      $("#item" + id).click(function(event) {
        event.preventDefault();
        $("#dialog" + id).dialog("open");
      });

      $(".time-input" + id).blur(function() {
        var newDataId = $(this).attr("data-id") + "-" + $(this).val();
        // console.log(newDataId);
        $(this).parent().parent().parent().parent().attr("data-custom", newDataId);
        $("#time-counter").val(UpdateTimeCounter() + " / " + $("#time-input").val());
        colorCodingTimeCounter(UpdateTimeCounter(), $("#time-input").val())
        console.log(UpdateTimeCounter());
      });
    })
  })
}

// class-form.html -> load selections from dropzone into selection review
if($("#selections").length) {
  $.getJSON("assets/data/instruction.json")
    .done(function(items) {
      var classRawUrl = window.location.href.slice(window.location.href.indexOf("=") + 1);
      var classUrl = classRawUrl.split("+");
      var classCount = classUrl.length;

      $("#selections").val(classRawUrl);

      var order = 1;
      var totalTime = 0;
      var instructionItems = items["instruction"];
      for(var j = 0; j < classCount; j++) {
        classTime = parseInt(classUrl[j].split("-")[1]);
        totalTime += parseInt(classTime);
        for(var i = 0; i < instructionItems.length; i++) {
          classFromUrl = parseInt(classUrl[j].split("-")[0]);
          currentInstructionListing = instructionItems[i]["id"];
          if(classFromUrl == currentInstructionListing) {
            var addInstructionItem = "";
            var outcomes = "";
            var assessment = "";

            instructionItems[i].learning_outcomes.forEach(function(outcome) {
              outcomes += "<li>" + outcome + "</li>"
            })

            instructionItems[i].activities.forEach(function(activity) {
              assessment += "<li>" + activity + "</li>"
            });

            addInstructionItem = $("<ul></ul><li class='review-card'><div class='instruction-card__content'><div class='instruction-card__title'><h4>" + order + ". " + instructionItems[i]["title"] + "</h4><p>Time for Instruction: " + classTime + " minutes</p></div><div class='instruction-card__description'><p><strong>Description</strong>: " + instructionItems[i]["description"] + "</p><p><strong>Learning Outcomes:</strong></p><ul class='outcomes-review'>" + outcomes + "</ul><p><strong>Suggested Activities:</strong></p><ul class='outcomes-review'>" + assessment + "</ul></div></div></li></ul>");

            $("#your-class").append(addInstructionItem);

            order++;
          }
        }
      }
      $("#total-time").text("- Total Class time: " + totalTime + " minutes");
    });
}

// find.html, prebuilt.html, confirmation.html -> load course content into display-view
if($("#display-view").length) {
  $.ajaxSetup({ 
    cache: false 
  });

  var classId = window.location.href.slice(window.location.href.indexOf("=") + 1);

  if(classId.slice(0, 1) == "h") {
    console.log("no cid provided");
    $("#display-view").css("display", "none");
  } else {
    $("#display-options").css("display", "none");
    $("#class-id").text(classId);
    $("#class-remove-id").val(classId);
    var title = $("#get-course-title");
    var faculty = $("#get-faculty-name");
    var date = $("#get-date");
    var time = $("#get-time");
    var students = $("#get-students");

  $.getJSON("assets/data/classes.json")
    .done(function(items) {
      var classItems = items["classes"];
      var totalTime = 0;

      if(classId == 0) {
        var len = classItems.length - 1;
        classId = classItems[len].id;
      }

      for(var i = 0; i < classItems.length; i++) {
        if(classItems[i].id === parseInt(classId)) {
          // alert("matched on id: " + classId);
          faculty.text(classItems[i].instructor);
          title.text(classItems[i].course_title);
          date.text(classItems[i].date);
          time.text(classItems[i].time);
          students.text(classItems[i].students);
          
          var classDetails = classItems[i].instruction;
          var count = 1;
          
          classDetails.forEach(function(item) {
            var details = $("#get-class-details");
            getUnitDetails(item.unit, item.minutes, count);
            totalTime += parseInt(item.minutes);
            count++;
          });

          break;
        } else {
          title.text("No class information.")
        }
      }
      if(totalTime > 0) {
        $("#total-time-review").text(" - Total Instruction Time: " + totalTime + " minutes");
      }
    })
  }
}

// services.html -> retrieve all instruction services to display in a table
if($("#instruction-units").length) {
  $.ajaxSetup({ 
    cache: false 
  });

  var instructionTable = $("#instruction-units").find("tbody");

  $.getJSON("assets/data/instruction.json")
    .done(function(units) {
      var row = "even";
      var unitItems = units["instruction"];
      for(var i = 0; i < unitItems.length; i++) {
        row == "even" ? row = "odd" : row = "even";
        instructionTable.append("<tr class='row-top " + row + "'><td class='twenty instruction-title'><strong>" + unitItems[i].title + "</strong></td><td class='fifteen text-right'><strong>Description:</strong></td><td>" + unitItems[i].description + "</td></tr><tr class='row-middle " + row + "'><td><!--Default Time: " + unitItems[i].default_time + " minutes--></td><td class='fifteen text-right'><strong>Learning Outcomes:</strong></td><td><ul>" + getList(unitItems[i].learning_outcomes) + "</ul></td></tr><tr class='row-bottom " + row + "'><td></td><td class='fifteen text-right'><strong>Suggested Activities:</strong></td><td><ul>" + getList(unitItems[i].activities) + "</ul></td></tr>");
      }
    });
}

// index.html -> click action for next step after course selections
if($("#menu-step-one").length) {
  $("#menu-step-one").click(function() {
    var selections = $("#instruction-cards-drop-zone").sortable("toArray", {attribute: "data-custom"});
    if(selections.length != 0) {
      var url = "class-form.html?c=" + selections.join('+');
      // console.log(url);
      $(location).attr('href', url);
    } else {
      alert('Please add items to your course')
    }
  })
}

// class-form.html
if($("#course-date").length) {
  $("#course-date").datepicker({
    showButtonPanel: true,
    currentText: "Today",
    beforeShow: function(input, inst){
      $("#ui-datepicker-div").wrap("<div class='datepicker ll-skin-latoja hasDatepicker'></div>");
    }
  });
}

// class-form.html
if($("#course-time").length) {
  $("#course-time").timepicker({ // built using jquery.timepicker - http://jonthornton.github.io/jquery-timepicker/
    "scrollDefault": "now",
    "step": 5
  });
}

// class-form.html
if($("#students").length) {
  $("#students").spinner();
}

// class-form.html
if($("#class-submit").length) {
  $("#class-submit").click(function() {
    if(formValidate($(this))) {
      var newId = saveClass();
      if(newId > 0) {
        $(location).attr("href", "confirmation.html?cid=" + newId);
      } else {
        console.log("class id was not saved.");
      }
    } else {
      $("#form-errors").html("<strong>Please fix the errors highlighted above</strong>").addClass("alert-text");
    }
  });
}

// find.html -> validates search form, retrieves class instruction data
if($("#class-find").length) {
  $("#class-find").click(function(event) {
  var search = [];
  $("#find-form .error").text("");
  $("#find-form input[type='text']").each(function(index, item) {
    search.push(item.value);
  });
  if(search[0] == '' || search[1] == '') {
    $("#find-form .error").text("Please enter a value in both search boxes.");
  } else {
    $.getJSON("assets/data/classes.json")
      .done(function(items) {
        var classItems = items["classes"];
        var classId;
        for(var i = 0; i < classItems.length; i++) {
          if(classItems[i].instructor == search[0] && classItems[i].course_title == search[1]) {
            classId = classItems[i].id;
            $(location).attr("href", "find.html?cid=" + classId);
            break;
          } else {
            if(i == classItems.length - 1) {
              $("#find-form .error").text("No classes were found with the search terms name: " + search[0] + " and class: " + search[1] + ".");
            }
          }
        }
      });
    }
  })
}

// index.html - update time counter -> update minute values and coloring of input element
if($("#time-input").length) {
  $("#time-input").blur(function() {
    $("#time-counter").val(UpdateTimeCounter() + " / " + $(this).val())
    colorCodingTimeCounter(UpdateTimeCounter(), $(this).val())
  });
}

// find.html - cancel class -> remove a class from the classes.json file and redirect to a confirmation page
if($("#cancel-class").length) {
  $("#cancel-class").click(function() {
    var id = $("#class-remove-id");
    var match = '-';
    if(id.val() > 0) {
      match = removeClass();
      $(location).attr('href', '/completed.html');
    }
    // console.log(match);
  });
}

function UpdateTimeCounter() {
  var timeInput = $("#time-input").val();
  var timeCounter = $("#time-counter");
  var list = $("#instruction-cards-drop-zone li");
  var total = 0;
  list.each(function(index, value) {
    total += parseInt(value.attributes["data-custom"].value.split("-")[1])
  });
  hideShowBackgroundText(total);
  return total;
}

function hideShowBackgroundText(totalTime) {
  if(totalTime <= 0) {
    $("#instruction-cards-drop-zone").addClass("bgImage");
  } else {
    $("#instruction-cards-drop-zone").removeClass("bgImage");
  }
}

function colorCodingTimeCounter(requestTime, availableTime) {
  var timeCounter = $("#time-counter");
  timeCounter.removeClass("problem").removeClass("okay").removeClass("warning")
  if(parseInt(requestTime) > parseInt(availableTime)) {
    timeCounter.addClass("problem")
  } else if(parseInt(requestTime) < parseInt(availableTime)) {
    timeCounter.addClass("warning")
  } else if(parseInt(requestTime) == parseInt(availableTime)) {
    timeCounter.addClass("okay")
  }
}

function formValidate(element) {
  var isValid = true;
  var c = $(".validate-this");

  $.each($(c), function(key, value) {
    var item = "#" + value.id;
    if($(value).val() == "") {
      isValid = false;      
      $(item).addClass("alert");
    } else {
      $(item).removeClass("alert");
    }
  })

  return isValid;
}

function saveClass() {
  var res;
  var request;
  var $form = $("#new-class");
  var $inputs = $form.find("input");
  var serializedData = $form.serialize();
  request = $.ajax({
    url: "../assets/form/build-class.php",
    type: "post",
    data: serializedData,
    async: false
  });

  request.done(function (response, textStatus, jqXHR){
    // Log a message to the console
    console.log("Success, it worked!");
    res = response;
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    // Log the error to the console
    console.error(
      "The following error occurred: " + textStatus, errorThrown
    );
    res = 0;
  });

  return res;
}

function getList(array) {
  var result = "";
  array.forEach(function(item) {
    result += "<li>" + item + "</li>";
  });
  return result;
}

function getUnitDetails(unitId, minutes, countVal) {
  var details = $("#get-class-details");
  $.getJSON("assets/data/instruction.json")
    .done(function(units) {
      var unitItems = units["instruction"];        
      for(var i = 0; i < unitItems.length; i++) {
        if(unitItems[i].id === parseInt(unitId)) {
          details.append("<div class='instruction-details'><h5>" + unitItems[i].title + "</h5><div class='detail-shift'><p><strong>Instruction Time:</strong> " + minutes + " minutes</p><p><strong>Instruction Description</strong>: " + unitItems[i].description + "</p><ul><p><strong>Learning Outcomes:</strong></p>" + getList(unitItems[i].learning_outcomes) + "</ul><ul><p><strong>Suggested Activities:</strong></p>" + getList(unitItems[i].activities) + "</ul></div><hr></div>");
          break;
        }
      }
    });
}

function removeClass() {
  var res;
  var request;
  var $form = $("#cancel-class");
  var $inputs = $form.find("input");
  var serializedData = $form.serialize();
  request = $.ajax({
    url: "../assets/form/remove-class.php",
    type: "post",
    data: serializedData,
    async: false
  });

  request.done(function (response, textStatus, jqXHR){
    // Log a message to the console
    console.log("Success, remove a class worked!");
    res = response;
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    // Log the error to the console
    console.error(
      "The following error occurred: " + textStatus, errorThrown
    );
    res = 0;
  });

  return res;
}

function getList(array) {
  var result = "";
  array.forEach(function(item) {
    result += "<li>" + item + "</li>";
  });
  return result;
}