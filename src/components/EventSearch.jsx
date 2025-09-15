import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

const EventSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("title");

  useEffect(() => {
    if (!searchTerm) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://meetup-clone-backend.vercel.app/events/eventName/${searchTerm}`
        );
        const data = await response.json();
        if (data.Event) {
          setSearchResults([data.Event]);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      }
    };

    fetchEvents();
  }, [searchTerm]);

  return (
    <>
      <Header />
      <div className="container my-5" style={{ marginTop: "80px" }}>
        {searchResults.length === 0 && <p>No results found.</p>}

        {searchResults.map((event) => {
          const formattedDate = new Date(event.date).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const startTime = new Date(event.date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const endTime = "12:00:00 PM";

          return (
            <div
              key={event._id}
              className="bg-light my-5 p-4"
              style={{ maxWidth: "1200px", margin: "0 auto", borderRadius: "12px" }}
            >

              <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem", textAlign: "left" }}>
                {event.eventName}
              </h2>
              <h5 style={{ color: "#666", marginBottom: "0.25rem", textAlign: "left" }}>
                Hosted By:
              </h5>
              <h5 style={{ fontWeight: "bold", marginBottom: "2rem", textAlign: "left" }}>
                {event.host}
              </h5>

              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>

                <div style={{ flex: 2, minWidth: "300px" }}>
                  <img
                    src={event.meetImage}
                    alt="Event-Photo"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "350px",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                  <h5 style={{ fontWeight: "bold", marginTop: "1rem" }}>Details:</h5>
                  <p>{event.details}</p>

                  {event.dressCode || event.age ? (
                    <>
                      <h5 style={{ fontWeight: "bold" }}>Additional Information:</h5>
                      {event.dressCode && <p><strong>Dress Code:</strong> {event.dressCode}</p>}
                      {event.age && <p><strong>Age Restrictions:</strong> {event.age}</p>}
                    </>
                  ) : null}

                  {event.tags?.length > 0 && (
                    <>
                      <h5 style={{ fontWeight: "bold" }}>Event Tags:</h5>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: "#ff5858ff",
                              color: "#ffffff",
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
                    </>
                  )}
                </div>

                {/* Right: Details card + RSVP */}
                <div style={{
                  flex: 1,
                  minWidth: "250px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignSelf: "flex-start",
                }}>
                  <div style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "1rem",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}>
                    <div>
                      <p style={{ fontWeight: "bold" }}>Date: {formattedDate}</p>
                      <p style={{ color: "#666" }}>{startTime} to {endTime}</p>
                    </div>
                    <div>
                      <h5>Location: {event.location || "Marketcity New-York"}</h5>
                    </div>
                    <div>
                      <h5>₹ {event.price || 3000}</h5>
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
                    onClick={() => navigate(`/eventDetails/${event._id}`)}
                  >
RSVP                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer/>
    </>
  );
};

export default EventSearch;
