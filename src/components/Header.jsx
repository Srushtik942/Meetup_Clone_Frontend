

const Header =  () =>{
    return(
        <div className="container">
        <nav className="navbar bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <a  className="navbar-brand text-danger fw-bold"
  style={{ fontFamily: "cursive" }}>MeetUp</a>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search by title" aria-label="Search"/>
      <button className="btn btn-outline-danger" type="submit">Search</button>
    </form>
  </div>
</nav>
</div>
    )
}

export default Header