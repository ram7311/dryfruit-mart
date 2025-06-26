import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "./ProductModal"; // import popup component
import { getToken } from "./auth";
import { BACKEND_API_URL } from "./constants";

function ProductList({ onAddToCart, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = getToken();
    axios.get(`${BACKEND_API_URL}/api/products`,{
      headers :{ Authorization: `Bearer ${token}` }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredProducts = products.filter( product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) );

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card shadow-lg h-100 rounded-4 overflow-hidden">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title text-truncate">{product.name}</h6>
                <p className="card-text mb-1 text-muted">⭐ {product.ratings}</p>
                <p className="card-text fw-bold">₹{product.price}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning btn-sm" onClick={() => onAddToCart(product.id)}>
                    Add to Cart
                  </button>
                  <button className="btn btn-outline-info btn-sm" onClick={() => handleViewDetails(product)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default ProductList;
