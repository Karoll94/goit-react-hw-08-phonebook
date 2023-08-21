import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, setToken, setUser } from 'store/reducer';

export default function Navigation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        {
          name: name,
          email: email,
          password: password,
        }
      );
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user.email));
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        {
          email: email,
          password: password,
        }
      );
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user.email));
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="navigation--body">
      <div className="navigation--main">
        <input type="checkbox" id="chk" className="navigation--input"></input>
        <div className="signup">
          <form>
            <label htmlFor="chk" className="navigation--label">
              Sign up
            </label>
            <input
              className="navigation--input"
              type="text"
              name="txt"
              placeholder="User name"
              required=""
              onChange={e => setName(e.target.value)}
            ></input>
            <input
              className="navigation--input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input
              className="navigation--input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button className="navigation--button" onClick={handleSignUp}>
              Sign up
            </button>
          </form>
        </div>
        <div className="login">
          <form>
            <label
              className="navigation--label"
              htmlFor="chk"
              aria-hidden="true"
            >
              Login
            </label>
            <input
              className="navigation--input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="navigation--input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={e => setPassword(e.target.value)}
            />
            <button className="navigation--button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
