import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        // Register
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
          throw new Error("Password should be at least 6 characters");
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email address");
            break;
          case "auth/user-not-found":
            setError("User not found");
            break;
          case "auth/wrong-password":
            setError("Incorrect password");
            break;
          case "auth/email-already-in-use":
            setError("Email already registered");
            break;
          default:
            setError("An error occurred");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white flex rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="w-full">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            {isLogin ? "Sign In" : "Register"}
          </h2>
          <p className="text-base text-gray-700 mb-8">
            Welcome to the{" "}
            <span className="font-semibold text-green-600">
              Farm Management Dashboard
            </span>
            ! Manage your farm efficiently with tools for monitoring crops,
            analyzing soil health, and planning your farming activities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white border border-transparent rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50"
            >
              {loading ? (isLogin ? "Signing in..." : "Creating Account...") : 
                        (isLogin ? "Sign In" : "Register")}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-green-600 hover:text-green-700"
            >
              {isLogin ? "Register here" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;