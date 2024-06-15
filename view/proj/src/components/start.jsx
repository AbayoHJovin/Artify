import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./footer";
import { FaSave } from "react-icons/fa";
import { apiUrl } from "../lib/constants";
const MediaForm = () => {
  document.title = "Artify-Home";
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState("");
  document.addEventListener("visibilitychange", () => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    if (!token || !user) {
      navigate("/details");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${apiUrl}/all/?id=${JSON.parse(sessionStorage.getItem("user"))._id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const responseData = res.response;
        if (responseData.length < 12) {
          fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: title,
              type: type,
              description: description,
              owner: JSON.parse(sessionStorage.getItem("user"))._id,
            }),
          })
            .then((data) => data.json())
            .then((resp) => {
              toast.success(resp.message);
            });
        } else {
          toast.error("You have reached 12 documents");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetch(`${apiUrl}/home`, {
      method: "GET",
      headers: {
        authorization: `${sessionStorage.getItem("token")}`, // Get the token from sessionStorage
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message !== "Allowed") {
          navigate("/details");
          console.log(data.message);
        } else {
          console.log("Allowed");
          setUsernames(JSON.parse(sessionStorage.getItem("user")).name);
        }
      })
      .catch((e) => console.error(e));
  }, []);
  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    console.log("Logged out");
    navigate("/details");
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="flex justify-between items-center p-5 bg-white shadow-md sticky top-0">
        <div className="text-gray-600">
          <p className="text-4xl font-extrabold text-purple-600">Artify</p>
        </div>
        <div className="flex items-center space-x-7 cursor-pointer text-blue-500">
          <FaSave
            size={20}
            className="font-bold hover:text-blue-700 transition duration-300"
            onClick={() => navigate("/saved")}
          />
          <AiOutlineLogout
            size={20}
            className="font-bold hover:text-blue-700 transition duration-300"
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="text-center py-16 bg-blue-100">
        <h1 className="text-4xl text-blue-600 font-bold mb-5">
          Hello {usernames}
        </h1>
        <p className="text-lg mb-8">
          Here you can put some of your songs, movies, or any other form of
          entertainment, and we will help you save them in the database for
          future use.
        </p>
        <p className="text-lg mb-8">
          The maximum number of documents you can save is 12
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Add Your Media contents
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the name of your art"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              placeholder="Type of entertainment. e.g.: song"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Contents
            </label>
            <textarea
              id="description"
              placeholder="Enter all you think"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default MediaForm;
