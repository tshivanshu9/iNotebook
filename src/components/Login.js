import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const apiHost = process.env.REACT_APP_AUTH_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiHost}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });
    const json = await res.json();
    if (json.success) {
      localStorage.setItem('token', json.data.token);
      navigate("/");
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email"
            value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp"
            minLength={5} required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password"
            value={credentials.password} id="exampleInputPassword1" minLength={7} required onChange={handleChange} />
        </div>
        <button type="submit"
          disabled={credentials.email?.length < 5 || credentials.password?.length < 4}
          className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Login
