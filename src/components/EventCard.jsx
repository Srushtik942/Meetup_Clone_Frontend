// EventCard.jsx
import { Link } from "react-router-dom";


const EventCard = ({ _id, type, meetImage, date, time, eventName, host }) => {
  return (
    <div className="card position-relative " style={{ width: "18rem" }}>
      <span
        className="badge bg-danger position-absolute top-0 end-0 m-2"
        style={{ zIndex: 1 }}
      >
        {type}
      </span>
      <img src={meetImage} className="card-img-top" alt={type} />
      <div className="card-body">
        <p className="card-text">{eventName}</p>
        <p className="card-text">
          {date} {time}
        </p>
        <p className="card-text bg-danger text-white rounded-1 px-2">
          Host: {host}
        </p>

        {/* only go to details when user clicks this button */}
        <Link to={`/eventDetails/${_id}`} className="btn btn-danger">
          Go to details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
