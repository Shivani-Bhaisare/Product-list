//   const handleLogin = async () => {
//               if (email && password) {
//   localStorage.setItem("user", JSON.stringify({ email }));
//       navigate("/home");
//           } else {
// setError("Please enter email and password");
//            }
//         };

// const response = await fetch("https://reqres.in/api/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
// },
//   body: JSON.stringify({
//     email: email,
//     password: password,
//   }),
// });

// const data = await response.json();

// if (data.token) {
//   localStorage.setItem("user", JSON.stringify(data));

//   navigate("/home");
// } else {
//   setError("Invalid email or password");
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import roomimg from "../assets/roomimg.png";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, email }));

    navigate("/home");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300">
      <div className="w-[900px] h-[500px] flex rounded-3xl shadow-xl overflow-hidden bg-white">
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-gray-300 p-10 rounded-2xl shadow-2xl w-[320px]">
            <h2 className="text-center text-2xl font-bold text-[#234E4C] mb-4">
              LOGIN
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <input
              type="text"
              placeholder="Username"
              className="w-full border-b mb-5 p-2 outline-none bg-transparent"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border-b mb-5 p-2 outline-none bg-transparent"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border-b mb-6 p-2 outline-none bg-transparent"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-[#234E4C] cursor-pointer text-white py-2 rounded-full hover:bg-green-600"
            >
              Login
            </button>
          </div>
        </div>

        <div className="w-1/2">
          <img
            src={roomimg}
            alt="room"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Loginform;
