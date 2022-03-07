'use strict';

const root = document.getElementById('root');

Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

  dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; // dowOffset이 숫자면 넣고 아니면 0
  var newYear = new Date(this.getFullYear(),0,1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((this.getTime() - newYear.getTime() -
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if(day < 4) {
    weeknum = Math.floor((daynum+day-1)/7) + 1;
    if(weeknum > 52) {
      let nYear = new Date(this.getFullYear() + 1,0,1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
        the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  }
  else {
    weeknum = Math.floor((daynum+day-1)/7);
  }
  return weeknum;
};

const housework = ['청소', '설거지', '빨래'];
const order = ['Mi', 'Joo', 'Jong']

(() => {
  const date = new Date();
  const createSpinner = () => {
    let tick = date.getWeek() % 3;

    const houseworkOrder = order.map((o, index) => {
      return {
        name: o,
        housework: housework[index + tick >= 3 ? index + tick - 3 : index + tick]
      }
    })
    

    return `
    <div>${houseworkOrder[0].name}: ${houseworkOrder[0].housework}</div>
    <div>${houseworkOrder[1].name}: ${houseworkOrder[1].housework}</div>
    <div>${houseworkOrder[2].name}: ${houseworkOrder[2].housework}</div>
    `
  }

    root.innerHTML = createSpinner();
})()