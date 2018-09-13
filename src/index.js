document.addEventListener('DOMContentLoaded', () => {
  const userUrl = 'http://localhost:3000/api/v1/users'
  const eventsUrl = 'http://localhost:3000/api/v1/events'
  const datesUrl = 'http://localhost:3000/api/v1/calendar_dates'
  const eventDatesUrl = 'http://localhost:3000/api/v1/event_dates' 
  const currentYear = document.getElementById("calendar_year")
  const currentMonth = document.getElementById("calendar_month")
  const navBar = document.getElementById("nav-bar")

  getDates();

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
      
      setMonth(month)
      setYear(year)
      findWeekofSunday(sundayOfday, 1)
    })
   
  }

  function setMonth(month){
   const months = {0:"January", 1:"Febuary", 2:"March", 3:"April", 4:"May", 5:"June", 6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"}
    currentMonth.innerText = months[month]
  }
  
  function setYear(year){
    currentYear.innerText = year
  }

  function findWeekofSunday(sundayOfday, i){
    const weekOnCalendar = {1:1, 8:2, 15:3, 22:4, 29:5};
    if (sundayOfday == 1){
      putNumbersOnCaldar(0, sundayOfday, 0)
    } else if (sundayOfday > i && sundayOfday < (i + 8)){
        putNumbersOnCaldar(weekOnCalendar[i], sundayOfday)
    }else if (sundayOfday > i && sundayOfday > (i + 7)){
        let a = (i+7)
        findWeekofSunday(sundayOfday, a,)
    }
  }

  function putNumbersOnCaldar(week, day){
    const calendarTable = document.querySelectorAll("[data-id='1']")
    let tableWeekTr = calendarTable[0].children[0].children[week]

    Array.from(tableWeekTr.children).forEach(function(tr){
      if (day < daysInMonth()+1 ){
        tr.children[0].innerHTML = day
        day++
      }
    })

      if (week < 5){
        let nextWeek = (week+1)
        putNumbersOnCaldar(nextWeek, day)
      }
  }

  function daysInMonth(){
    const monthDays = {"January":31, "Febuary":28, "March":31, "April":30, "May":31, "June":30, "July":31, "August":31, "September":30, "October":31, "November":30, "December":31}
    return monthDays[currentMonth.innerText]
  }
    
  

})
