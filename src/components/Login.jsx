import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from './auth';
import { getToken } from './auth';
import { BACKEND_API_URL } from './constants';

const Login = ({setCartCount}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.get(`${BACKEND_API_URL}/auth`, {
        params: { username, password },
      });
      console.log("token login -->"+res.data)
      if(res.data != null){
        console.log("token ooo-->"+res.data)
      setToken(res.data);
      const token = getToken();
      const cartRes = await axios.get(`${BACKEND_API_URL}/api/cart/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartCount(cartRes.data.quantity_count);

      navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials. Try again."+err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input type="text" placeholder='name or mobile number or email' className="form-control" required value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input type="password" className="form-control" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
