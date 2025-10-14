import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_KEY = "AIzaSyCrzTnvqHnOv5ArjIogdHONtDh45pVv1Bk";

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "Auth failed!");

      console.log("Firebase Response:", data);
      setSuccess(isLogin ? "Login successful!" : "Account created successfully!");

      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "26rem" }}>
        <h3 className="text-center mb-4 text-primary">
          {isLogin ? "Login" : "Sign Up"}
        </h3>

        <form onSubmit={submitHandler}>
         
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${
                isLogin ? "bg-black text-white border-0 rounded-5" : ""
              }`}
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={changeHandler}
              required
            />
          </div>

     
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                isLogin ? "bg-black text-white border-0 rounded-5" : ""
              }`}
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={changeHandler}
              required
            />
          </div>

          {/* Confirm Password (only for SignUp) */}
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={changeHandler}
                required
              />
            </div>
          )}

         
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <button type="submit" className="btn btn-primary w-100 rounded-5">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

      
        <p
          className="text-center border p-2 mt-3 mb-0 rounded-4"
          style={{ cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-primary fw-semibold">
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

