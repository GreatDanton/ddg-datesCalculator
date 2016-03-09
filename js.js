$(document).ready(function(){

  var dyear = 60 * 60 * 24 * 365;
  var ddays = 60 * 60 * 24;
  var dhours = 60 * 60;

// get seconds, minutes, hours, days between desired days
// startingDay, finalDay is always in seconds;

function getSeconds(startingDay, finalDay) {
  var seconds = Math.round(finalDay - startingDay);
  return seconds;
}


function getMinutes(startingDay, finalDay) {
  var seconds = Math.round(finalDay - startingDay);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % minutes;
  return {
    minutes: minutes,
    seconds: seconds
  };
}

function getHours(startingDay, finalDay) {
  var seconds = Math.round(finalDay - startingDay);
  var hours = Math.round(seconds / dhours);
  return hours;
}


function getDays(startingDay, finalDay) {
  var seconds = Math.round(finalDay - startingDay);
  var days = Math.round(seconds / ddays);
  return days;
}


function getYears(startingDay, finalDay) {
  var seconds = Math.round(finalDay - startingDay);
  var years = Math.round(seconds / dyear);
  return years;
}


function exactTime(startingDay, finalDay) {
  var seconds = Math.round(finalDay - startingDay);
  // years
  var years = seconds / dyear;
  seconds = seconds % dyear;
  years = Math.floor(years);

  // days
  var days = seconds / ddays;
  seconds = seconds % ddays;
  days = Math.floor(days);

  // hours
  var hours = seconds / dhours;
  seconds = seconds % dhours;
  hours = Math.floor(hours);

  // minutes
  var minutes = seconds / 60;
  seconds = seconds % 60;
  minutes = Math.floor(minutes);

  return  {
    years: years,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}



// Countdown function
function countdown(startingDay, finalDay) {

  // var startingDay = new Date();
  // var finalDay = new Date(2019, 10, 19);
  // startingDay = startingDay.getTime()/1000;
  // finalDay = finalDay.getTime()/1000;

function calculate() {
// increase for 1second for each interval
startingDay = startingDay + 1;

// calculate correct numbers of years, days, hours, minutes, seconds
var seconds = Math.round(finalDay - startingDay);
// years
var years = seconds / dyear;
seconds = seconds % dyear;
years = Math.floor(years);

// days
var days = seconds / ddays;
seconds = seconds % ddays;
days = Math.floor(days);

// hours
var hours = seconds / dhours;
seconds = seconds % dhours;
hours = Math.floor(hours);

// minutes
var minutes = seconds / 60;
seconds = seconds % 60;
minutes = Math.floor(minutes);


// show zeros in front of hours, minutes, seconds when they are less than 10
if (seconds < 10) {
  seconds = '0' + seconds;
}
if (minutes < 10) {
  minutes = '0' + minutes;
}
if (hours < 10) {
  hours = '0' + hours;
}

// update correct fields
$('#years').html(years);
$('#days').html(days);
$('#hours').html(hours);
$('#minutes').html(minutes);
$('#seconds').html(seconds);
}
var interval = window.setInterval(calculate, 1000);
} // end of countdown function



$('.btn-calculate').click(function() {

  // collects data
  var startDay = parseInt($('#day-start').val());
  var startMonth = parseInt($('#month-start').val());
  var startYear = parseInt($('#year-start').val());
  var endDay = parseInt($('#day-end').val());
  var endMonth = parseInt($('#month-end').val());
  var endYear = parseInt($('#year-end').val());

// if end year is lower than start year, switch values
  if (startYear > endYear) {
    var temp;
    console.log('switching values');

    temp = startDay;
    startDay = endDay;
    $('#day-start').val(startDay);
    endDay = temp;
    $('#day-end').val(endDay);

    temp = startMonth;
    startMonth = endMonth;
    $('#month-start').val(startMonth);
    endMonth = temp;
    $('#month-end').val(endMonth);

    temp = startYear;
    startYear = endYear;
    $('#year-start').val(startYear);
    endYear = temp;
    $('#year-end').val(endYear);
  }

// if month / day value is greater than 12 auto correct it to 12

  if(startMonth > 12) {
    $('#month-start').val(12);
  }

  if (endMonth > 12) {
    $('#month-end').val(12);
  }

  if (startDay > 31) {
    $('#day-start').val(31);
  }

  if (endDay > 31) {
    $('#day-end').val(31);
  }

  var startingDay = new Date(startYear, startMonth, startDay);
  var finalDay = new Date(endYear, endMonth, endDay);
  startingDay = startingDay.getTime()/1000;
  finalDay = finalDay.getTime()/1000;
  var now = new Date().getTime()/1000;

  var time = exactTime(startingDay, finalDay);
  console.log(time);
  var years = time.years;
  var days = time.days;
  var hours = time.hours;
  var minutes = time.minutes;
  var seconds = time.seconds;

  var onlySeconds = getSeconds(startingDay, finalDay);
  var onlyMinutes = getMinutes(startingDay, finalDay).minutes;
  var onlyHours = getHours(startingDay, finalDay);
  var onlyDays = getDays(startingDay, finalDay);
  var onlyYears = getYears(startingDay, finalDay);

  $('.list').html('<p>seconds: ' + onlySeconds + '</p>' +
                  '<p>minutes: ' + onlyMinutes + '</p>' +
                  '<p>hours: ' + onlyHours + '</p>' +
                  '<p>days: ' + onlyDays + '</p>' +
                  '<p>years: ' + onlyYears + '</p>');
  console.log(years, days, hours, minutes, seconds);

  if (finalDay > now) {
    countdown(now, finalDay);
  }
});

// countdown();
});
