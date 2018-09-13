document.addEventListener('DOMContentLoaded', () => {
  const userUrl = 'http://localhost:3000/api/v1/users'
  const eventsUrl = 'http://localhost:3000/api/v1/events'
  const datesUrl = 'http://localhost:3000/api/v1/calendar_dates'
  const eventDatesUrl = 'http://localhost:3000/api/v1/event_dates' 
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
      const sundayOfday = (dayOfMonth - dayOfWeek)
      
      findWeekofSunday(sundayOfday, 1)
    })
   
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
      if (day < 32 ){
        tr.children[0].innerHTML = day
        day++
      }
    })

      if (week < 5){
        let nextWeek = (week+1)
        putNumbersOnCaldar(nextWeek, day)
      }
  }
    
  

})
