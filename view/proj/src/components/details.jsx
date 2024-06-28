import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./loader";
import { apiUrl } from "../lib/constants";

document.title = "Artify-login/signup";

export default function Start() {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function Login() {
    setSignedUp(false);
  }

  function SignUps() {
    setSignedUp(true);
  }

  function SignUserUp() {
    setLoading(true);
    fetch(`${apiUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.message === "Account created successfully") {
          setSignedUp(false)
          toast.success(data.message || "Account created");
        } else {
          toast.error(data.message || "Something went wrong");
        }
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e);
      });
  }

  function loginUser() {
    setLoading(true);
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          console.log("Login successful");
          navigate("/home");
        } else {
          toast.error(data.message || "Login failed");
        }
      })
      .catch((e) => {
        setLoading(false);
        console.error("Error:", e);
      });
  }

  window.addEventListener("load", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading? (<Loader />) :(
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg transition-all duration-500">
        <AiOutlineClose
          className="self-end cursor-pointer hover:bg-red-600 hover:text-white p-1 rounded-full"
          size={30}
          onClick={() => navigate("/")}
        />

        <h1 className="text-2xl font-bold mb-6 text-center">
          {signedUp ? "Signup Form" : "Login Form"}
        </h1>
        <div className="flex mb-6">
          <button
            onClick={SignUps}
            type="button"
            className={`w-1/2 py-2 text-center rounded-l-lg transition-all duration-300 ${
              signedUp ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Signup
          </button>
          <button
            onClick={Login}
            type="button"
            className={`w-1/2 py-2 text-center rounded-r-lg transition-all duration-300 ${
              signedUp ? "bg-gray-200" : "bg-blue-600 text-white"
            }`}
          >
            Login
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signedUp ? SignUserUp() : loginUser();
          }}
          className="space-y-6"
        >
          {signedUp && (
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder={signedUp ? "Your email here" : "Email address"}
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Input Password"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         <button
  type="submit"
  className="w-full bg-blue-900 text-white py-3 rounded-lg"
>
  {loading ? <Loader /> : (signedUp ? "Signup" : "Login")}
</button>

        </form>
      </div>
      )  
      }
      <ToastContainer position="top-center" />
    </div>
  );
}
