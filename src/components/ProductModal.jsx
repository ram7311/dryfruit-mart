import React from "react";
import { Modal, Button } from "react-bootstrap";

function ProductModal({ product, show, onClose }) {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="img-fluid mb-3"
          style={{ borderRadius: "8px" }}
        />
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Ratings:</strong> {product.ratings}</p>
        <p><strong>Description:</strong> {product.description || "No description available."}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
