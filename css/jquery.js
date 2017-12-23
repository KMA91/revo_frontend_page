$(document).ready(function(){
  var courses;
  var title;
  var startsAt;
  var schedule = "";

  // GET COURSES FROM API

    $.ajax({
        url: 'http://www.mocky.io/v2/5a2f252f2e00000c3e279070',
        dataType: 'jsonp',
        success: function(jpCourses){

          courses = jpCourses.courses;

          // loop through courses array
          for(var i = 0; i < courses.length; i++){

            // Grab title, startTime, Date
            title = courses[i].title;
            startsAt = courses[i].startsAt;
            startsAt = startsAt.slice(0, 10);

            // Change date format
            var date = new Date(startsAt),
                locale = "en-us",
                month = date.toLocaleString(locale, { month: "short" });
            startsAt = month + " " + date.getDay();

            // Loop through days array
            for(var j = 0; j < courses[i].schedule[0].days.length; j++){

              var asdf = courses[i].schedule[0].days[j].split(" ");
              asdf.splice(1,1);
              asdf = asdf.join(" ");

              if(j+1 == courses[i].schedule[0].days.length && schedule == ''){
                schedule = asdf;

              }else if(j+1 == courses[i].schedule[0].days.length && schedule != ''){
                schedule += asdf;

              }else{
                schedule += asdf + ", "
              }
            }

            // Append API info to HTML
            $('.courses-table').append("<tr><td>" + title + "</td>" + "<td>" + startsAt + "</td>" + "<td>" + schedule + "</td>" + "<td>" + "<button>Enroll</button> </td></tr>");
            schedule = '';
          }

          // Fade in courses table
          $('.courses-box').animate({'opacity': '1'}, 2000);
        }
    });
})
