// Display date at top of page
var date = moment().format('dddd, MMMM Do');
$('#currentDay').text(date);




var containerEl = $('.container');
var dayStart = 9;
var dayEnd = 17;
for (var i = dayStart; i <= dayEnd; i++) {
  createEvent(i);
}

// CREATE EVENT
function createEvent(time) {
  var hour = moment(time, 'H');
  var hourDisplay = hour.format('hA');
  var inputGroupEl = $('<div>').addClass('input-group')
  var inputGroupPreEl = $('<div>').addClass('input-group-prepend');
  var timeSpanEl = $('<span>').addClass('input-group-text hour').text(hourDisplay);
  var eventEl = $('<textarea>').addClass('form-control');
  var inputGroupAppEl = $('<div>').addClass('input-group-append');
  var saveBtnEl = $('<span>').addClass('input-group-text saveBtn');
  var calendarIconEl = $('<i>').addClass('fas fa-calendar-plus');
  
  inputGroupAppEl.append(saveBtnEl);
  saveBtnEl.append(calendarIconEl);
  inputGroupPreEl.append(timeSpanEl);
  inputGroupEl.append(inputGroupPreEl, eventEl, inputGroupAppEl);
  containerEl.append(inputGroupEl);

  styleEventColor(hour, eventEl);
}

function styleEventColor(eventHour, eventEl){
  var now = moment();

  if (eventHour.isBefore(now, 'hour')) {
    eventEl.addClass('past');
  } else if (eventHour.isSame(now, 'hour')) {
    eventEl.addClass('present');
  } else {
    eventEl.addClass('future');
  }
}






// SAVE EVENTS TO LOCAL STORAGE
// need to associate .saveBtn with form-control text > parent's previous sibling selector  $(this).parent().prev().find('.goal')

// events need to have data-attribute (corresponding to hour?) so they can associated with their text data in localStorage

$('.saveBtn').on('click', saveEvent);

// var events = [{id: hour, event: .form-control.val()}];

function saveEvent() {
  // console.log($(this).parent().prev().val());
  var eventText = $(this).parent().prev().val();
  events.push(eventText);
  localStorage.setItem('events', JSON.stringify(events));
}




// function loadEvents() {

// }




// how to populate events on load?
// either we can set data-id attribute during creation and use that to target event index to populate with data.  we could also use that attribute to capture form-control data instead of DOM traversal from saveBtn

// or in creation function, we could add .form-control val to events array

