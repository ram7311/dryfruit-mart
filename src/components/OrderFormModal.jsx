import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { getToken } from "./auth";

export default function OrderFormModal({ show, onClose, cartItems }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    const orderData = {
      customerName: name,
      address,
      phone,
      items: cartItems.map((item)=>({
        ...item,
        id:null
      })),
      totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    const token = getToken();
    axios.post(`${BACKEND_API_URL}/api/orders`, orderData ,{
      headers :{ Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("Order placed successfully!");
        onClose();
      })
      .catch(() => alert("Failed to place order."));
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Place Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Enter your address" 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter phone number" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Pay Cash
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
