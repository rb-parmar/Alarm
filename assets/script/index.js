`use strict`;

// Conecting HTML Elements to JavaScript
const time = document.querySelector('.time');
const output = document.querySelector('.output');
const text = document.querySelector('.text');
const button = document.querySelector('.button');
const msg = document.querySelector('.msg');


// Checking if input is empty
function checkNull(text) {
  if (text.value == '') {
    msg.innerHTML = 'Input cannot be empty';
    setTimeout(function() { msg.innerHTML = ''; }, 5000);
  }
}

// Padding the start of user input
function padStart(text) {
  var hours = text.value.slice(0, 2);
  var minutes = text.value.slice(3);

  if (minutes.length < 2) {
    minutes = minutes.padStart(2, '0');
  }

  text.value = '';
  text.value = hours + ':' + minutes;
}

// Checking if input contains only numbers and ':'
function checkValues(text) {
  const validInput = /[^0-9() :]/g;
  if (validInput.test(text.value)) {
    text.value = text.value.replace(validInput, "");
    msg.innerHTML = 'Your input should be in this format => 00:00';
    setTimeout(function() { msg.innerHTML = ''; }, 5000);
  }
}

// Checking if minutes input is not the same as the minutes of the current time
function checkMinutes(text) {
  var date = new Date();
  var h = date.getHours().toString().padStart(2, '0');
  var hours = text.value.slice(0, 2);
  var m = date.getMinutes().toString().padStart(2, '0');
  var minutes = text.value.slice(3);

  if (minutes == m && hours == h) {
    msg.innerHTML = 'The minutes input cannot be the same as the current minutes';
    setTimeout(function() { msg.innerHTML = ''; }, 7000);
    text.value = '';
  } 
}

// Checking if hours and minutes input are not greater than 24 and 60 respectively
function checkGreatness(text) {
  var hours = text.value.slice(0, 2);
  var minutes = text.value.slice(3);

  if (hours > 24 || hours < 0) {
    msg.innerHTML = 'Your hours input cannot be greater or less than 24';
    setTimeout(function() { msg.innerHTML = ''; }, 7000);
    text.value = '';
  } else if (minutes > 60 || minutes < 0) {
    msg.innerHTML = 'Your minutes input cannot be greater or less than 60';
    setTimeout(function() { msg.innerHTML = ''; }, 7000);
    text.value = '';
  }
}

// Setting the alarm in the output
button.addEventListener('click', () => {
  checkNull(text);
  padStart(text);
  checkValues(text);
  checkMinutes(text);
  checkGreatness(text);

  output.innerHTML = text.value;
})



// Displaying the current time
function getTime() {
  var date = new Date();
  
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  
  var currentTime = `${h}:${m}:${s} hrs`;
  time.innerHTML = currentTime;

  const currentTimeRing = `${h}:${m}:${s}`;
  const setAlarmTime = output.innerHTML + ':00';

  const alarmTone = new Audio('./assets/audio/alarm.mp3');
  alarmTone.type = 'audio/mp3';

  if (setAlarmTime == currentTimeRing) {
    alarmTone.play();
  }
}   
setInterval(getTime, 1000);
