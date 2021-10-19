// document.getElementById("para1").innerHTML = dateToSmartString(new
// Date('2016-01-01T13:39:45.794Z'));

function dayOfUniverse(date) {
  return Math.round(date / 8.64e7);
}

function dateToSmartString(date) {
  var now = new Date();

  var day_name;
  if (dayOfUniverse(date) == dayOfUniverse(now)) {
    day_name = "Dnes";
  } else if (dayOfUniverse(date) == dayOfUniverse(now) - 1) {
    day_name = "Včera";
  } else if (dayOfUniverse(date) == dayOfUniverse(now) - 2) {
    day_name = "Předevčírem";
  } else {
    return (
      date.getDay() + 1 + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  }

  return day_name + " v " + date.getHours() + ":" + date.getMinutes();
}

function isValidDate(d) {
  if (Object.prototype.toString.call(d) !== "[object Date]") return false;
  return !isNaN(d.getTime());
}

function dateFromDotString(str) {
  var pattern = /(\d{1,2})\.(\d{1,2})\.(\d{4})/;

  if (!pattern.test(str)) return false; // todo maybe invalid date of error

  var d = parseInt(str.replace(pattern, "$1"));
  var m = parseInt(str.replace(pattern, "$2"));
  var y = parseInt(str.replace(pattern, "$3"));

  var date = new Date();

  date.setFullYear(y);
  date.setMonth(m - 1);
  date.setDate(d - 1);

  // todo minutes seconds hours

  return date;
}
