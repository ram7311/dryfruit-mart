import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "./auth";
import { ToastContainer, toast } from 'react-toastify';

export default function Header({ cartCount, setCartCount, setSearchTerm  }) {


  const navigate = useNavigate();

  const notify = () => toast("Logout successful");
  const handleLogout = ()=>{
    removeToken();
    setCartCount(0);
    navigate("/");
    notify()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-gradient shadow-sm">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img
            src="./src/assets/logo.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-3"
          />
          DryFruitMart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left: Nav links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my_orders">My Orders</Link>
            </li>
          </ul>

          {/* Center: Search bar */}
          <form className="d-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }} 
          onSubmit={(e)=>e.preventDefault()} >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              onChange={(e)=> setSearchTerm(e.target.value)}
            />
            {/* <button className="btn btn-light" type="submit">Search</button> */}
          </form>

<div className="d-flex align-items-center ms-auto">
  <div style={{ marginRight: '20px' }}>
    <Link to="/cart" className="text-white text-decoration-none">
      <i className="fas fa-shopping-cart fa-lg"></i>
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger" >
          {cartCount}
        </span>
      )}
    </Link>
  </div>

  <button className="btn btn-outline-light align-items-center" onClick={handleLogout}>
    <i className="fas fa-sign-out-alt me-1"></i>
    Logout
  </button>
  <ToastContainer />
</div>


        </div>
      </div>
    </nav>
  );
}
