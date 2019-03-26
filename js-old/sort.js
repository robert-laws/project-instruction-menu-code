$(document).ready(function() {
  var sortedIDs = [];


  var instructionItem = $("<li id='item-6'><span class='sort-handle'>Sample Item</span><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe perferendis assumenda voluptates!</p><p>10</p><p><a id='item6' href='#'>More Information</a></p></li><div id='dialog6' title='Item # 6 Details'><p>Here are more details about Item # 6.</p></div>");

  

  $("ul#select-zone").append(instructionItem);

  $("#dialog6").dialog({
    autoOpen: false
  });

  $("#item6").click(function(event) {
    event.preventDefault();
    $("#dialog6").dialog("open");
  });

  $("#select-zone, #drop-zone").sortable({
    connectWith: ".connect-list",
    cursor: "pointer",
    handle: ".sort-handle",
    placeholder: "ui-state-highlight",
    dropOnEmpty: true
  }).disableSelection();

  $("#get-items").click(function() {
    var sortedIDs = $("#drop-zone").sortable("toArray", {attribute: "data-custom"});
    console.log(sortedIDs);
    if(sortedIDs.length != 0) {
      alert(sortedIDs);
    } else {
      alert('no selections')
    }
  });

  $("#submit-class").click(function() {
    var selections = $("#drop-zone").sortable("toArray", {attribute: "data-custom"});
    if(selections.length != 0) {
      var url = "class-form.html?c=" + selections.join('+');
      // console.log(url);
      $(location).attr('href', url);
    } else {
      alert('no selections')
    }
  })
});

$.getJSON("assets/data/instruction.json")
  .done(function(items) {
    var ajaxArea = $("section#ajax-space");
    var itemNumber = 7;
    console.log(items.instruction);
    items.instruction.forEach(function(unit) {
      var id = unit.id;
      var title = unit.title;
      var description = unit.description;
      var time = unit.default_time;
      var outcomes = "";
      var assessment = "";

      unit.learning_outcomes.forEach(function(outcome) {
        outcomes += "<li>" + outcome + "</li>"
      });

      unit.activities.forEach(function(activity) {
        assessment += "<li>" + activity + "</li>"
      });

      var modal = "<p><strong>Brief Description:</strong> " + description + "</p><p><strong>Learning Outcomes</strong> (students will be able to:)<br><ul>" + outcomes + "</ul></p><p><strong>Activities/Assessment</strong><br><ul>" + assessment + "</ul></p>";
      
      var dragItem = $("<li data-custom='" + id + "-" + time + "' id='" + id + "'><span class='sort-handle'>" + title + "</span><p>" + description + "</p><input class='time-input" + id + "' type='text' data-id='" + id + "' data-value='" + time + "' value='" + time + "' /><p>" + time + "</p><p><a id='item" + id + "' href='#'>More Information</a></p></li><div id='dialog" + id + "' title='" + title + "'><p>" + modal + "</p></div>");

      // ajaxArea.append(dragItem);
      $("ul#select-zone").append(dragItem);

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
        console.log(newDataId);
        $(this).parent().attr("data-custom", newDataId);
      });

      itemNumber++;
    });
  });
