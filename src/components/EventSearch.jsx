import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

const EventSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const navigate = useNavigate();

  const { searchTerm } = useParams(); // Get from URL parameters instead of query

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setSearchResults([]);
      setSearchCount(0);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Use the search endpoint with query parameter
const response = await fetch(
  `http://localhost:3000/events/search/${encodeURIComponent(searchTerm.trim())}`
);

        const data = await response.json();

        if (data.events && data.events.length > 0) {
          setSearchResults(data.events);
          setSearchCount(data.count || data.events.length);
        } else {
          setSearchResults([]);
          setSearchCount(0);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setSearchCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchTerm]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container my-5 py-4 px-4" style={{ marginTop: "80px" }}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Searching for events...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-5 py-4 px-4" style={{ marginTop: "80px" }}>
        {/* Search Results Header */}
        {searchTerm && (
          <div style={{ marginBottom: "2rem" }}>
            <h3>Search Results for: "{searchTerm}"</h3>
            <p style={{ color: "#666" }}>
              {searchCount > 0 ? `Found ${searchCount} event${searchCount > 1 ? 's' : ''}` : 'No events found'}
            </p>
          </div>
        )}

        {/* No Results Message */}
        {searchResults.length === 0 && searchTerm && (
          <div style={{
            textAlign: "center",
            padding: "3rem 2rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            margin: "2rem 0"
          }}>
            <h4 style={{ marginBottom: "1rem", color: "#666" }}>No events found</h4>
            <p style={{ color: "#888", marginBottom: "1.5rem" }}>
              We couldn't find any events matching "{searchTerm}". Try:
            </p>
            <ul style={{
              listStyle: "none",
              padding: 0,
              color: "#666",
              textAlign: "left",
              maxWidth: "400px",
              margin: "0 auto"
            }}>
              <li style={{ marginBottom: "0.5rem" }}>• Using different keywords</li>
              <li style={{ marginBottom: "0.5rem" }}>• Checking your spelling</li>
              <li style={{ marginBottom: "0.5rem" }}>• Using more general terms</li>
              <li>• Browsing all events</li>
            </ul>
          </div>
        )}

        {/* Search Results */}
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
              style={{
                maxWidth: "1200px",
                margin: "0 auto 2rem auto",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <h2 style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                textAlign: "left",
                color: "#333"
              }}>
                {event.eventName}
              </h2>
              <h5 style={{ color: "#666", marginBottom: "0.25rem", textAlign: "left" }}>
                Hosted By:
              </h5>
              <h5 style={{
                fontWeight: "bold",
                marginBottom: "2rem",
                textAlign: "left",
                color: "#ff4d4f"
              }}>
                {event.host}
              </h5>

              <div style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                alignItems: "flex-start"
              }}>
                {/* Left: Image and Details */}
                <div style={{ flex: 2, minWidth: "300px" }}>
                  {event.meetImage && (
                    <img
                      src={event.meetImage}
                      alt="Event-Photo"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "350px",
                        objectFit: "cover",
                        borderRadius: "16px",
                        marginBottom: "1rem"
                      }}
                    />
                  )}

                  <h5 style={{ fontWeight: "bold", marginTop: "1rem" }}>Details:</h5>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>{event.details}</p>

                  {(event.dressCode || event.age) && (
                    <>
                      <h5 style={{ fontWeight: "bold", marginTop: "1.5rem" }}>Additional Information:</h5>
                      {event.dressCode && (
                        <p><strong>Dress Code:</strong> {event.dressCode}</p>
                      )}
                      {event.age && (
                        <p><strong>Age Restrictions:</strong> {event.age}</p>
                      )}
                    </>
                  )}

                  {event.tags && event.tags.length > 0 && (
                    <>
                      <h5 style={{ fontWeight: "bold", marginTop: "1.5rem" }}>Event Tags:</h5>
                      <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginTop: "0.5rem"
                      }}>
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: "#ff5858ff",
                              color: "#ffffff",
                              padding: "4px 12px",
                              borderRadius: "16px",
                              fontWeight: "600",
                              fontSize: "0.85rem",
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
                  minWidth: "280px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignSelf: "flex-start",
                }}>
                  <div style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}>
                    <div>
                      <p style={{
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                        color: "#333"
                      }}>
                        📅 {formattedDate}
                      </p>
                      <p style={{ color: "#666", fontSize: "0.9rem" }}>
                        🕒 {startTime} to {endTime}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "0"
                      }}>
                        📍 {event.location || "Marketcity New-York"}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#ff4d4f",
                        marginBottom: "0"
                      }}>
                        💰 ₹ {event.price || 3000}
                      </p>
                    </div>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#d63031"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#ff4d4f"}
                    onClick={() => navigate(`/eventDetails/${event._id}`)}
                  >
                    RSVP Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default EventSearch;