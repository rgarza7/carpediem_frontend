document.addEventListener('DOMContentLoaded', () => {
  // Global Urls
  const userUrl = 'http://localhost:3000/api/v1/users'
  const eventsUrl = 'http://localhost:3000/api/v1/events'
  const datesUrl = 'http://localhost:3000/api/v1/calendar_dates'
  const eventDatesUrl = 'http://localhost:3000/api/v1/event_dates' 

// Global set elements
  const calendarTable = document.querySelectorAll("[data-id='1']")
  const currentYear = document.getElementById("calendar_year")
  const currentMonth = document.getElementById("calendar_month")
  const navBar = document.getElementById("nav-bar")
  const monthForwardButton = document.getElementById("calendar_right")
  const monthBackButton = document.getElementById("calendar_left")

// Global set objects
  const months = {0:"January", 1:"Febuary", 2:"March", 3:"April", 4:"May", 5:"June", 6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"}  
  const monthDays = {"January":31, "Febuary":28, "March":31, "April":30, "May":31, "June":30, "July":31, "August":31, "September":30, "October":31, "November":30, "December":31}

// prototype for global objects
  Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
  }


//  OpOrd
  getDates();
  listenForMonthMovement();
  clickedOnDay();

// calendar set up
  function getDates(){
    fetch (datesUrl)
    .then (res => res.json())
    .then (populateCalendar)
    
  }

  function populateCalendar(e){
    e.forEach(function(dateData){
      let day = new Date(dateData.date)
      let dayOfMonth = day.getDate();
      let dayOfWeek = day.getDay();
      let month = day.getMonth();
      let year = day.getFullYear();
      const sundayOfday = (dayOfMonth - dayOfWeek)
      let firstCalendarSunday = (sundayOfday - (sundayOfday+5))
      setMonth(month)
      setYear(year)
      findWeekofSunday(firstCalendarSunday, 1)
    })
   
  }

  function setMonth(month){
    currentMonth.innerText = months[month]
  }
  
  function setYear(year){
    currentYear.innerText = year
  }

  function findWeekofSunday(sundayOfday, i){
    const weekOnCalendar = {1:1, 8:2, 15:3, 22:4, 29:5};
    
   if (sundayOfday <= 1){
      putNumbersOnCaldar(0, sundayOfday, 0)
    } else if (sundayOfday > i && sundayOfday < (i + 8)){
        putNumbersOnCaldar(weekOnCalendar[i], sundayOfday)
    }else if (sundayOfday > i && sundayOfday > (i + 7)){
        let a = (i+7)
        findWeekofSunday(sundayOfday, a,)
    }
  }

  function putNumbersOnCaldar(week, day){
    let tableWeekTr = calendarTable[0].children[0].children[week]

    Array.from(tableWeekTr.children).forEach(function(tr){
      if (day < 1){
        tr.children[0].innerHTML = ""
        day++
      }else if (day < (daysInMonth()+1) ){
        tr.children[0].innerHTML = day
        day++
      }else if (day >= (daysInMonth()+1)){
        tr.children[0].innerHTML = ""
      }
    })

      if (week < 5){
        let nextWeek = (week+1)
        putNumbersOnCaldar(nextWeek, day)
      }
  }

  function daysInMonth(){
    return monthDays[currentMonth.innerText]
  }
    
  // delegate

  function listenForMonthMovement(){
    monthForwardButton.addEventListener("mouseover", forwardHover)
    monthBackButton.addEventListener("mouseover", backHover)
    monthForwardButton.addEventListener("click", monthForward)
    monthBackButton.addEventListener("click", monthBack)
  }
  function forwardHover(e){
    e.preventDefault()
  }

  function backHover(e){
    e.preventDefault()
  }

  function monthForward(e){
    e.preventDefault()
    let thisYear = parseInt(currentYear.innerText)
    let thisMonth = months.getKeyByValue(currentMonth.innerText)
      thisMonth++
    if (thisMonth < 12){
      currentMonth.innerText = months[thisMonth]
      getFirstDay(thisYear, thisMonth)
    } else {
      let thisYear = parseInt(currentYear.innerText)
      let nextYear = (thisYear + 1)
       thisMonth = (thisMonth - 12)
       currentMonth.innerText = months[thisMonth]
       currentYear.innerText = nextYear
       getFirstDay(nextYear, thisMonth)
    }
  }

  function monthBack(e){
    e.preventDefault()
    let thisYear = parseInt(currentYear.innerText)
    let thisMonth = months.getKeyByValue(currentMonth.innerText)
      thisMonth--
    if (thisMonth >= 0){
      currentMonth.innerText = months[thisMonth]
      getFirstDay(thisYear, thisMonth)
    } else {
      let lastYear = (thisYear - 1)
       thisMonth = (thisMonth + 12)
       currentMonth.innerText = months[thisMonth]
       currentYear.innerText = lastYear
       getFirstDay(lastYear, thisMonth )
    }
  }

  function getFirstDay(y, m){
      var firstDay = new Date(y, m, 1);
      let day = new Date(firstDay)
      let dayOfMonth = day.getDate();
      let dayOfWeek = day.getDay();
      const sundayOfday = (dayOfMonth - dayOfWeek)
    
      findWeekofSunday(sundayOfday, 1)
  }

  // from calendar to day table

  function clickedOnDay(){
    let weekCollection = calendarTable[0].children[0].children
    Array.from(weekCollection).forEach(function(childTrs){
      childTrs.addEventListener("click", moveToDay)
    })
  }

  function moveToDay(e){
    let daySquare = e.target    
    console.log(daySquare.innerText)
  }
})
