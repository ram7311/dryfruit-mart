import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getToken();
    axios.get(`${BACKEND_API_URL}/api/orders`,{
      headers :{ Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div className="container-fluid mt-5">
      <h3 className="mb-4">📦 My Orders</h3>

      {orders.length === 0 ? (
        <p className="text-muted">You have not placed any orders yet.</p>
      ) : (
        <div
          className="d-flex flex-row overflow-auto"
          style={{ gap: "20px", paddingBottom: "10px" }}
        >
          {orders.map((order, index) => (
            <div
              key={index}
              className="card shadow-lg p-3"
              style={{ minWidth: "350px", maxWidth: "350px" }}
            >
              <h5 className="card-title">🧾 Order #{order.id}</h5>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>

              <hr />
              <div className="mb-2 fw-bold">Items:</div>
              {order.items.map((item, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                        ₹{item.price} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div><strong>₹{item.price * item.quantity}</strong></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
