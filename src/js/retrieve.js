$(function() {

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
  var title = $("#get-course-title");
  var faculty = $("#get-faculty-name");
  var date = $("#get-date");
  var time = $("#get-time");
  var students = $("#get-students");

  $.getJSON("assets/data/classes.json")
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
          var count = 1;
          
          classDetails.forEach(function(item) {
            var details = $("#get-class-details");
            getUnitDetails(item.unit, count);
            count++;
          });        

          break;
        } else {
          title.text("No class information.")
        }
      }
    })
  }

  
});

function getUnitDetails(unitId, countVal) {
  var details = $("#get-class-details");
  $.getJSON("assets/data/instruction.json")
    .done(function(units) {
      var unitItems = units["instruction"];        
      for(var i = 0; i < unitItems.length; i++) {
        if(unitItems[i].id === parseInt(unitId)) {
          details.append("<div class='instruction-details'><h5>" + countVal + ". " + unitItems[i].title + "</h5><p><strong>Description</strong>: " + unitItems[i].description + "</p></div>");
          break;
        }
      }
    });
}