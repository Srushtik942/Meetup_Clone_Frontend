import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const EventDetails = () =>{
    const {eventId} = useParams();
    console.log(eventId);
    const [eventData,setEventData] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch(`https://meetup-clone-backend.vercel.app/events/${eventId}`);
                const data = await response.json();
                setEventData(data.EventById);

            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[eventId]);

      if (!eventData) return <p>Loading...</p>

    return(
        <>
        <h2>{eventData.eventName}</h2>
         <p>
        {eventData.date} {eventData.time}
      </p>
      <p>Host: {eventData.host}</p>
        </>
    )
};

 export default EventDetails;