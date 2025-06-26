import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          height: "90vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "40px", borderRadius: "10px" }}>
          <h1 className="display-4 fw-bold mb-3">Welcome to FreshMart 🛒</h1>
          <p className="lead mb-4">
            Discover fresh deals, top-rated products, and unbeatable prices. Shop smart with us today!
          </p>
          <Link to="/products" className="btn btn-warning btn-lg rounded-pill px-4">
            Browse Products
          </Link>
        </div>
      </div>

{/* Why Shop With Us - Simple Bootstrap Version */}
<div
  className="py-5 text-center text-white"
  style={{
    backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <h2 className="mb-4 fw-bold">Why Shop With Us?</h2>
  <div className="row justify-content-center px-3">
    <div className="col-md-4 mb-4">
      <div className="bg-white text-dark p-4 rounded-4 shadow-sm h-100 hover-raise">
        <i className="fa fa-truck text-primary"></i>
        <h5 className="mt-3">Fast Delivery</h5>
        <p>Get your products delivered to your doorstep quickly and safely.</p>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="bg-white text-dark p-4 rounded-4 shadow-sm h-100 hover-raise">
        <i className="fa fa-star text-warning"></i>
        <h5 className="mt-3">Top Rated</h5>
        <p>We feature only the highest-rated products by our customers.</p>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="bg-white text-dark p-4 rounded-4 shadow-sm h-100 hover-raise">
        <i className="fa fa-wallet text-success"></i>
        <h5 className="mt-3">Best Prices</h5>
        <p>Enjoy affordable prices without compromising on quality.</p>
      </div>
    </div>
  </div>
</div>


      {/* Call to Action */}
      <div className="bg-light py-5 text-center">
        <h4 className="mb-3">Ready to start shopping?</h4>
        <Link to="/products" className="btn btn-success btn-lg rounded-pill">
          View Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
