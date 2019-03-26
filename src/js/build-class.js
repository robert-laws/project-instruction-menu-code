$(document).ready(function() {
  var sortedIds = [];

  $("#instruction-cards, #instruction-cards-drop-zone").sortable({
    connectWith: ".card-connect",
    cursor: "pointer",
    handle: ".instruction-card__handle",
    placeholder: "ui-state-highlight",
    dropOnEmpty: true
  }).disableSelection();

  $("#menu-step-one").click(function() {
    var sortedIDs = $("#instruction-cards-drop-zone").sortable("toArray", {attribute: "data-custom"});
    console.log(sortedIDs);
    if(sortedIDs.length != 0) {
      alert(sortedIDs);
    } else {
      alert('no selections')
    }
  });
});

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

      var modal = "<p><strong>Brief Description:</strong> " + description + "</p><p><strong>Learning Outcomes</strong> (students will be able to:)<br><ul>" + outcomes + "</ul></p><p><strong>Activities/Assessment</strong><br><ul>" + assessment + "</ul></p>";

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
        console.log(newDataId);
        $(this).parent().parent().parent().parent().attr("data-custom", newDataId);
      });
    })
  })