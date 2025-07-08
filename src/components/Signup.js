import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleOnChange = (e) => {
    e.preventDefault();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const apiHost = process.env.REACT_APP_AUTH_API_URL;
  const handleSubmit = async () => {
    const { name, email, password } = signupData;
    const response = await fetch(`${apiHost}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response?.json();
    if (json.success) {
      localStorage.setItem('token', json.data.token);
      navigate("/");
      props.showAlert('Account created successfully!', 'success');
    } else {
      props.showAlert('Something went wrong, please try again.', 'danger');
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={signupData.name}
            onChange={handleOnChange} required minLength={5} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={signupData.email}
            onChange={handleOnChange} required minLength={5} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control"
            value={signupData.password} onChange={handleOnChange} required minLength={5} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" required minLength={5}
            value={signupData.cpassword} onChange={handleOnChange} id="cpassword" />
        </div>
        <button type="submit" disabled={signupData.password?.length < 5 || signupData.cpassword?.length < 5 ||
          signupData.password !== signupData.cpassword || signupData.name?.length < 5} className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup
