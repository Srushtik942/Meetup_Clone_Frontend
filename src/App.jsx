import { useState, useEffect } from "react";
import Header from "./components/Header";
import EventCard  from "./components/EventCard";
import "./App.css";
import { data } from "react-router-dom";

function App() {
  const [eventType, setEventType] = useState("All Event");
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    fetch("https://meetup-clone-backend.vercel.app/events")
    .then((res)=> res.json())
    .then((data) => {
      console.log("API data:", data);
      setEvents(data.eventDetails || []);
    })
    .catch((err) => console.error(err));
  },[]);

  const filteredData = events.filter((event)=>{
    if(eventType === "All Event") return true;
    return event.eventType === eventType;
  });

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="py-5">
          <select
            className="form-select w-auto"
            aria-label="Select event type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="All Event">All Event</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Meetup">MeetUp</option>
          </select>
        </div>
      </div>
     <div className="d-flex flex-wrap gap-3">

      {filteredData.map((e)=>{
       const formattedDate = e.date.split("T")[0];
       return(
        <EventCard
        key={e._id}
        _id={e._id}
        type={e.eventType}
        meetImage={e.meetImage}
        date={formattedDate}
        time={e.time}
        eventName={e.eventName}
        host={e.host}
        />
       );
})}
     </div>
    </>
  );
}

export default App;
