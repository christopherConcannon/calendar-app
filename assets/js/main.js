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
  var hour = moment(time, 'h');
  var hourDisplay = hour.format('hA');
  var inputGroupEl = $('<div>').addClass('input-group')
  var inputGroupPreEl = $('<div>').addClass('input-group-prepend');
  var timeSpanEl = $('<span>').addClass('input-group-text hour').text(hourDisplay);
  var eventEl = $('<textarea>').addClass('form-control').attr('data-id', time);
  var inputGroupAppEl = $('<div>').addClass('input-group-append');
  var saveBtnEl = $('<span>').addClass('input-group-text saveBtn').attr('data-id', time);
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
$('.saveBtn').on('click', saveEvent);

var events = [];

function saveEvent() {
  var eventText = $(this).parent().prev().val();
  var eventObj = {
    id: $(this).attr('data-id'),
    eventText: eventText
  }
  events.push(eventObj);
  localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {
  events = localStorage.getItem('events');
  events = JSON.parse(events);
  for (var i = 0; i < events.length; i++) {
    $('.form-control[data-id="' + events[i].id + '"]').val(events[i].eventText);
  }
}

loadEvents();


