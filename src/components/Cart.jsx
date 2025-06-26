import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderFormModal from "./OrderFormModal";
import { getToken } from "./auth";
import { BACKEND_API_URL } from "./constants";

export default function Cart ( {setCartCount} ) {
  const [cartItems, setCartItems] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false); // modal visibility state
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const token = getToken();
    axios.get(`${BACKEND_API_URL}/api/cart/cartProducts`,{
      headers :{ Authorization: `Bearer ${token}` }
    })
      .then(res => setCartItems(res.data))
      .catch(err => console.error("Failed to fetch cart items", err));
  }, [refreshFlag]); // triggers whenever refreshFlag changes


  const callCartCount = (token)=>{
      axios.get(`${BACKEND_API_URL}/api/cart/count`,{
      headers :{ Authorization: `Bearer ${token}` }
    }).then((res)=>{
      console.log("quantity_count --cart---> "+res.data.quantity_count);
      setCartCount(res.data.quantity_count);
    })
  }


  const updateQuantity = (productId, newQuantity) => {
    const token = getToken();
    if (newQuantity === 0){
      axios.delete(`${BACKEND_API_URL}/api/cart/delete/${productId}`,{
      headers :{ Authorization: `Bearer ${token}` }
    }).then(() =>{
      setRefreshFlag(prev => !prev);
      callCartCount(token);
    });
    return;
    }
    console.log("log-1 ",productId,newQuantity);
    axios.put(`${BACKEND_API_URL}/api/cart/updateQuantity`, {
      productId: productId,
      quantity: newQuantity
    },{
      headers :{ Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

callCartCount(token);
    })
    .catch(err => console.error("Failed to update quantity", err));



  };

  return (
    <div className="container-fluid mt-5">
      <h3 className="mb-4">🛒 Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* Left: Cart Items */}
          <div className="col-md-8">
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <div className="text-muted">Qty: {item.quantity}</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Summary Card */}
          <div className="col-md-4">
            <div className="card shadow-lg p-3">
              <h5 className="card-title">🧾 Summary</h5>
              <hr />

              <div className="mb-2">
                <div className="d-flex fw-bold">
                  <div className="flex-grow-1"><strong>Product Name</strong></div>
                  <div className="text-end" style={{ width: "110px" }}><strong>Price</strong></div>
                  <div className="text-end" style={{ width: "100px" }}><strong>Total</strong></div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.productId} className="d-flex mb-2">
                  <div className="flex-grow-1">{item.name}</div>
                  <div style={{ width: "110px" }}>
                    <span style={{ whiteSpace: "nowrap" }}>₹{item.price} × {item.quantity}</span>
                  </div>
                  <div className="text-end" style={{ width: "100px" }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}

              <hr />
              <p>Total Items: <strong>{cartItems.length}</strong></p>
              <p>Total Quantity: <strong>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</strong></p>
              <p>Total Amount: <strong className="text-success">
                ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </strong></p>

              <button 
                className="btn btn-success w-100 mt-3" 
                onClick={() => setShowOrderForm(true)} // open modal on click
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      <OrderFormModal
        show={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        cartItems={cartItems}
      />
    </div>
  );
}
