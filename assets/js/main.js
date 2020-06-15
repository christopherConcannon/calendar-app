var currentDayEl = document.getElementById('currentDay');







var date = moment().format('dddd, MMMM Do');
currentDayEl.innerText = date;
