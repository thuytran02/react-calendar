import { Calendar, momentLocalizer } from "react-big-calendar";
import "../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/ja"; // without this line it didn't work
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomToolbar from "./components/Toolbar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./App.css";
import { useRef } from "react";

moment.locale("ja");
const localizer = momentLocalizer(moment);

const now = new Date();
const myEvents = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 7),
  },
  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient Conference Call",
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Halloween Meeting",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
];

const DragAndDropCalendar = withDragAndDrop(Calendar);

function App() {
  const [events, setEvents] = useState(myEvents);
  const defaultDate = useMemo(() => new Date(2015, 3, 1), []);

  // const { defaultDate, formats, views } = useMemo(
  //   () => ({
  //     defaultDate: new Date(2015, 3, 13),
  //     formats: {
  //       dayHeaderFormat: (date, culture, localizer) =>
  //         localizer.format(date, 'dddd MMMM Do', culture),
  //     },
  //     views: [Views.MONTH],
  //   }),
  //   []
  // )

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      // console.log(event);

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end: start, allDay: false }];
      });
    },
    [setEvents]
  );

  const onDragOver = useCallback((e) => {
    // console.log(e);
  }, []);

  const handleSelect = (e) => {
    // console.log(e);
  };

  const dragStart = (e) => {
    // console.log(e);
  };

  const dragOver = (e) => {
    // console.log(e);
  };

  const dropOutside = (e) => {
    // console.log("out side");
  };

const handleOnDrop = (e, data) => {
  console.log('drop', e, data);
}

const handleDrag = (e) => {
  console.log('drag');
};




const CustomEvent = (props) => {
  const ref = useRef();

  // useEffect(() => {
  //   console.log(ref)
    

  // }, [])
  const handleDrop = useCallback(()=> {
    console.log('drop', props.event);
  }, [])
  useEffect(() => {
    window.addEventListener("drop", handleDrop);
    return () => {
        window.removeEventListener("drop",handleDrop );
    };
}, [handleDrop]);


    return <div ref={ref} className="post-item" onDrop={(e)=> handleOnDrop(e,props.event )} onDrag={handleDrag} >
      <img alt="" width={20} height="20" 
      src="https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"/>
      <span class="title">{props.title}</span>
    </div>
  }

  return (
    <div className="App">
        
        <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: 800 , margin: "20px auto"}}
        popup
        onEventDrop={moveEvent}
        onDragStart={dragStart}
        onDragOver={dragOver}
        views={["month"]}
        defaultView="month"
        defaultDate={defaultDate}
        components={{
          event:CustomEvent,
          toolbar: CustomToolbar          
        }}
        resizable
        onDropFromOutside={dropOutside}
        onSelectEvent={handleSelect}
        // onShowMore=
        // onDragOver={onDragOver}
      />
    </div>
  );
}

export default App;
