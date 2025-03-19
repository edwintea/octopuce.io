/////////////////////// CALENDARS ////////////////////////////
let events=[];
let Calendars={
    default:()=>{
        Ajax(Api.Calendars.Get.URL,Api.Calendars.Get.Method,"",function(e){
            
            if(res.data.length > 0){
                $.each(res.data,function(i,e){
                    events.push({
                        title: e.notes,
                        start: e.start_date
                      })
                })
            }

            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
            height: '100%',
            expandRows: true,
            slotMinTime: '00:00',
            slotMaxTime: '23:59',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            initialView: 'dayGridMonth',
            initialDate: new Date().toISOString().split('T')[0],
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            selectable: true,
            nowIndicator: true,
            dayMaxEvents: true, // allow "more" link when too many events
            events:events
            });
        
            calendar.render();

        })
        
    },
    init    :  ()=>{
        notify("Your calendar here...","info")
        Calendars.default()
    
    }
}