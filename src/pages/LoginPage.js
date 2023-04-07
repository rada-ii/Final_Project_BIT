import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameInputRef = useRef();
  let navigate = useNavigate();
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    if (e.key === "Enter") {
      if (
        username.trim().toLowerCase() === "user@mail.com" &&
        password.trim().toLowerCase() === "user"
      ) {
        navigate("/reportpage");
      } else if (
        username.trim().toLowerCase() === "admin@mail.com" &&
        password.trim().toLowerCase() === "admin"
      ) {
        navigate("/admin/reports");
      } else {
        alert("wrong user credentials");
        setUsername("");
        setPassword("");
        usernameInputRef.current.focus();
      }
    }
  };

  return (
    <>
      <div className="login-wrap">
        <div className="login-title">
          <h1>Welcome to Intereports Inc.</h1>
        </div>
        <div className="login-welcome">
          <form onKeyDown={submitHandler}>
            <input
              required
              ref={usernameInputRef}
              value={username}
              onChange={usernameHandler}
              type="text"
              placeholder="Username"
            />
            <input
              required
              value={password}
              onChange={passwordHandler}
              type="password"
              placeholder="Password"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
