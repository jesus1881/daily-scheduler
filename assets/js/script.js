let saveBttn = $(".save-icon");
let containerEl = $(".container");
let task9am = $("#9AM");
let task10am = $("#10AM");
let task11am = $("#11AM");
let task12pm = $("#12PM");
let task1pm = $("#1PM");
let task2pm = $("#2PM");
let task3pm = $("#3PM");
let task4pm = $("#4PM");
let task5pm = $("#5PM");

let scheduleElArray = [
  task9am,
  task10am,
  task11am,
  task12pm,
  task1pm,
  task2pm,
  task3pm,
  task4pm,
  task5pm,
];


function updateTime() {
  let today = moment();

  $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));

  let now = moment().format("kk");
  for (let i = 0; i < scheduleElArray.length; i++) {
    scheduleElArray[i].removeClass("future past present");

    if (now > scheduleElArray[i].data("hour")) {
      scheduleElArray[i].addClass("past");
    } else if (now === scheduleElArray[i].attr("data-hour")) {
      scheduleElArray[i].addClass("present");
    } else {
      scheduleElArray[i].addClass("future");
    }
  }
}

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000);

function renderLastRegistered() {
  for (let el of scheduleElArray) {
    el.val(localStorage.getItem("time block " + el.data("hour")));
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  let btnClicked = $(event.currentTarget);

  let targetText = btnClicked.siblings("textarea");

  let targetTimeBlock = targetText.data("hour");

  localStorage.setItem("time block " + targetTimeBlock, targetText.val());
}

saveBttn.on("click", handleFormSubmit);
