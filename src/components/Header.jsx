import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const title = e.target.elements.search.value.trim();
    if (title) {
      navigate(`/search?title=${title}`);
    }
  };

  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <span
            className="navbar-brand text-danger fw-bold"
            style={{ fontFamily: "cursive", cursor: "pointer" }}
            onClick={handleBrandClick}
          >
            MeetUp
          </span>

          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              name="search"
              className="form-control me-2"
              type="search"
              placeholder="Search by title"
              aria-label="Search"
            />
            <button className="btn btn-outline-danger" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
