// EventSearch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import Header from "./Header"

const EventSearch = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://meetup-clone-backend.vercel.app/events/search/${searchTerm}`); // adjust endpoint
        const data = await res.json();
        console.log(data);
        setSearchResults(data.events);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchTerm]);

  if (loading) return <p>Loading…</p>;

  return (
    <div className="container ">
      {/* <h3>Search results for “{searchTerm}”</h3> */}
   <Header/>

      <div className="pt-20 d-flex flex-wrap gap-3 mt-24 bg-red">
        {searchResults.length > 0 ? (
          searchResults.map((event) => (
            <EventCard key={event._id} {...event} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
