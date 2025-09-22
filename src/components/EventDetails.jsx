import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://meetup-clone-backend.vercel.app/events/${eventId}`
        );
        const data = await response.json();
        setEventData(data.EventById);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [eventId]);

  if (!eventData) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;

  const formattedDate = new Date(eventData.date).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startTime = new Date(eventData.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const endTime = "12:00:00 PM";

  return (
    <>
      <Header />
      <div
        className="bg-light  my-5"
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Title and Host */}
        <div>
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {eventData.eventName}
          </h2>
          <h5 style={{ color: "#666", marginBottom: "0.25rem" }}>Hosted By:</h5>
          <h5 style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>{eventData.host}</h5>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Left: Image & Details */}
          <div style={{ flex: 2, minWidth: "300px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <img
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "350px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
              src={eventData?.meetImage || "https://via.placeholder.com/350"}
              alt="Event"
            />

            <div>
              <h5 style={{ fontWeight: "bold" }}>Details:</h5>
              <p>{eventData.details}</p>
            </div>

            {eventData.additionalInformation && (
              <div>
                <h5 style={{ fontWeight: "bold" }}>Additional Information:</h5>
                <p>
                  <span style={{ fontWeight: "bold" }}>Dress Code: </span>
                  {eventData.additionalInformation.dressCode}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Age Restrictions: </span>
                  {eventData.additionalInformation.age} & above.
                </p>
              </div>
            )}

            <div>
              <h5 style={{ fontWeight: "bold" }}>Event Tags:</h5>
<div
  style={{
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "center",   // <-- center tags
  }}
  className="mt-4"
>
                {eventData.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#ff5858ff",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      fontSize: "0.9rem",

                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Card & RSVP */}
          <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold" }}>Date: {formattedDate}</p>
                <p style={{ color: "#666" }}>
                  {startTime} to {endTime}
                </p>
              </div>
              <div>
                <h5>Location: {eventData.location || "Marketcity New-York"}</h5>
              </div>
              <div>
                <h5>₹ {eventData.price || 3000}</h5>
              </div>
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              RSVP
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetails;
