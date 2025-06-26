
export default function Footer(){
return(
<footer className="custom-gradient text-white pt-4 pb-2 shadow-lg mt-5">
  <div className="container text-center text-md-start">
    <div className="row">
      {/* Brand and About */}
      <div className="col-md-4 mb-3">
        <h5 className="fw-bold">DryFruitMart</h5>
        <p>
          Your trusted online store for premium quality dry fruits. Freshness guaranteed!
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-md-4 mb-3">
        <h6 className="fw-bold">Quick Links</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">Home</a></li>
          <li><a href="#" className="text-white text-decoration-none">Products</a></li>
          <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
          <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="col-md-4 mb-3">
        <h6 className="fw-bold">Contact Us</h6>
        <p className="mb-1">📧 support@dryfruitmart.com</p>
        <p className="mb-1">📞 +91 9848123388</p>
        <p>📍 Hyderabad, India</p>
      </div>
    </div>

    <hr className="text-white" />

    <div className="text-center">
      <p className="mb-0">© {new Date().getFullYear()} DryFruitMart. All rights reserved.</p>
    </div>
  </div>
</footer>
);
}