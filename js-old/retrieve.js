$(function() {

  $.ajaxSetup({ 
    cache: false 
  });
  
  var classId = window.location.href.slice(window.location.href.indexOf("=") + 1);

  $("#class-id").text(classId);
  var title = $("#course-title");
  var faculty = $("#faculty-name");
  var date = $("#date");
  var time = $("#time");
  var students = $("#students");

  $.getJSON("assets/data/test-class.json")
    .done(function(items) {
      var classItems = items["classes"];

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
          classDetails.forEach(function(item) {
            getUnitDetails(item.unit);
          });        

          break;
        } else {
          title.text("No class information.")
        }
      }
    })
});

function getUnitDetails(unitId) {
  var details = $("#class-details");
  $.getJSON("assets/data/instruction.json")
    .done(function(units) {
      var unitItems = units["instruction"];      
      for(var i = 0; i < unitItems.length; i++) {
        if(unitItems[i].id === parseInt(unitId)) {
          details.append("title: " + unitItems[i].title + "<br>description: " + unitItems[i].description + "<hr>");
          break;
        }
      }
    });
}